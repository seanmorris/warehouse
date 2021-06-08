<?php
namespace SeanMorris\Warehouse;
class HomeRoute implements \SeanMorris\Ids\Routable
{
	public function _init($router)
	{
		$request = $router->request();
		$method  = $request->method();

		$corsMethods = ['GET','POST','HEAD','OPTIONS'];

		$corsHeaders = [
			'Content-Type'
			, 'Cookie'
			, 'Authorization'
			, 'X-Requested-With'
			, 'Cache-Control'
			, 'Last-Event-Id'
			, 'Pragma'
			, 'Referer'
			, 'Accept'
			, 'Ids-Input-Headers'
			, 'Ids-Output-Headers'
		];

		$origin = $request->headers('Origin');

		if($origin === 'http://localhost:3333')
		{
			header(sprintf('Access-Control-Allow-Origin: %s', 'http://localhost:3333'));
		}
		else
		{
			header(sprintf('Access-Control-Allow-Origin: %s', 'https://warehouse.seanmorr.is'));
		}

		header('Access-Control-Allow-Credentials: true');
		header('Access-Control-Allow-Methods: ' . implode(', ', $corsMethods));
		header('Access-Control-Allow-Headers: ' . implode(', ', $corsHeaders));

		if(!$settings = \SeanMorris\Ids\Settings::read('redis'))
		{
			return FALSE;
		}

		$this->redis = new \Redis;

		// $this->redis->connect($settings->host, $settings->port ?: 6379);

		$this->redis->connect(
			$settings->host
			, $settings->port ?: 6379
		);

		if($settings->pass)
		{
			$this->redis->auth($settings->pass);
		}
	}

	public function changeTypes($router)
	{
		$request = $router->request();

		$response = new \SeanMorris\Ids\Api\Response($request);

		$response->setContent($request->read());

		return $response;
	}

	public function publish($router)
	{
		$request = $router->request();
		$channel = $router->path()->consumeNode();
		$session = \SeanMorris\Ids\Session::local();

		$session->userId = $session->userId ?? uniqid();

		$streamHash = sha1($channel);
		$streamName = 'userStream_' . $streamHash;

		$records = 0;

		\SeanMorris\Ids\Log::debug('Publishing...');

		foreach($request->read() as $record)
		{
			\SeanMorris\Ids\Log::debug($record);

			$this->redis->xAdd($streamName, '*', [
				'payload' => json_encode($record)
				, 'user'  => $session->userId
				, 'sess'  => $_SESSION['sess_id']
			]);

			$records++;
		}

		$settings = \SeanMorris\Ids\Settings::read('redis');

		if($channel[0] !== '-' && $records)
		{
			$this->redis->expire($streamName, 60*60);
			$this->redis->xTrim($streamName, 1000);

			$this->redis->xAdd('systemStream_recently-published', '*', [
				'stream' => $channel
			]);

			$this->redis->xTrim('systemStream_recently-published', 10000);
		}

	}

	public function subscribe($router)
	{
		$request = $router->request();

		header('HTTP/1.1 200 OK');
		header('Transfer-Encoding: chunked');
		header('Content-Type: text/event-stream');
		header('Cache-Control: no-cache');
		header('Connection: keep-alive');

		$channel = $router->path()->consumeNode();

		$streamHash = sha1($channel);
		$streamName = 'userStream_' . $streamHash;

		$start = microtime(true);

		$lastEventId = $request->headers('Last-Event-Id')
			?? $_GET['last-event-id']
			?? FALSE;

		if(!$lastEventId)
		{
			$lastEventId = '$';

			if($messages = $this->redis->xRevRange($streamName, '+', '-', 10))
			{
				$messages = array_reverse($messages);

				foreach($messages as $id => $message)
				{
					yield(new \SeanMorris\Ids\Http\Event([
						'payload' => json_decode($message['payload'])
						, 'user'  => $message['user']
						, 'sess'  => $message['sess']
					], $id));
				}
			}
		}

		$heartbeat = \SeanMorris\Ids\Settings::read('subscribeHeartbeat');

		$lastBeat = $start;

		while(!\SeanMorris\Ids\Http\Http::disconnected())
		{
			$moreMessages = $this->redis->xRead([$streamName => $lastEventId], 1, 1);

			if($moreMessages[$streamName] ?? false)
			{
				foreach($moreMessages[$streamName] as $id => $message)
				{
					yield new \SeanMorris\Ids\Http\Event([
						'payload' => json_decode($message['payload'])
						, 'user'  => $message['user']
						, 'sess'  => $message['sess']
					], $id);

					$lastEventId = $id;
				}
			}

			if($heartbeat && microtime(true) - $lastBeat >= $heartbeat)
			{
				$lastBeat = microtime(true);

				yield new \SeanMorris\Ids\Http\Event(['payload' => "KEEPALIVE"]);
			}

			$timeout = \SeanMorris\Ids\Settings::read('subscribeTimeout');

			if($timeout && microtime(true) - $start >= $timeout)
			{
				break;
			}
		}
	}

	public function activeStreams($router)
	{
		if(!$settings = \SeanMorris\Ids\Settings::read('redis'))
		{
			return 'Cannot connect!';
		}

		$streamName = 'systemStream_recently-published';

		$events = $this->redis->xRevRange($streamName, '+', '-') ?: [];

		$totals = (array) array_reduce($events, function($totals, $item){

			$totals->{ $item['stream'] } = 1 + ( $totals->{ $item['stream'] } ?? 0 );

			return $totals;

		}, (object)[]);

		arsort($totals);

		$response = new \SeanMorris\Ids\Api\Response($router->request());

		$response->setContent(array_keys($totals));

		return $response;
	}

	public function createScaffold($router)
	{
		return;
		$request = $router->request();

		$response = new \SeanMorris\Ids\Api\Response($request);

		$contentTypeSplit = explode(';', $request->headers('Content-Type'));

		$contentType = $contentTypeSplit[0];

		$post = $request->read()->current();

		$record = \SeanMorris\PressKit\Scaffold::produceScaffold([
			'name' => $post['tableName']
		]);

		$record->title = 'lol';
		$record->body  = 'wow.';

		$record->save();
	}
}
