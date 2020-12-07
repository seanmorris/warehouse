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

		$refererHost = substr($request->headers('Referer'), 0, strlen('http://localhost:3333'));

		if($refererHost === 'http://localhost:3333')
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

		$this->redis->pconnect($settings->host, $settings->port ?? 6379);
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

		foreach($request->read() as $record)
		{
			$this->redis->xAdd($streamName, '*', [
				'payload' => json_encode($record)
				, 'user'  => $session->userId
				, 'sess'  => $_SESSION['sess_id']
			]);

			usleep(100);
		}

		$this->redis->xAdd('systemStream_recently-published', '*', [
			'stream' => $channel
		]);
	}

	public function subscribe($router)
	{
		header('Cache-Control: no-cache');
		header('Content-Type: text/event-stream');

		$channel = $router->path()->consumeNode();

		$streamHash = sha1($channel);
		$streamName = 'userStream_' . $streamHash;

		$request = $router->request();

		$lastEventId = $request->headers('Last-Event-ID') ?: '$';

		$start = time();

		while(!\SeanMorris\Ids\Http\Http::disconnected())
		{
			$messages = $this->redis->xRead([$streamName => $lastEventId], 1, 10);

			if($messages[$streamName] ?? false)
			{
				foreach($messages[$streamName] as $id => $message)
				{
					yield(new \SeanMorris\Ids\Http\Event([
						'payload' => json_decode($message['payload'])
						, 'user'  => $message['user']
						, 'sess'  => $message['sess']
					], $id));
				}
			}
		}
	}

	public function activeStreams($router)
	{
		if(!$settings = \SeanMorris\Ids\Settings::read('redis'))
		{
			return 'Cannot connect!';
		}

		$redis = new \Redis;
		$redis->pconnect($settings->host, $settings->port ?? 6379);

		$streamName = 'systemStream_recently-published';

		$events = $redis->xRevRange($streamName, '+', '-');

		$totals = array_reduce($events, function($totals, $item){

			$totals->{ $item['stream'] } = 1 + ( $totals->{ $item['stream'] } ?? 0 );

			return $totals;

		}, (object)[]);

		$response = new \SeanMorris\Ids\Api\Response($router->request());

		$response->setContent(array_keys((array)$totals));

		return $response;
	}
}
