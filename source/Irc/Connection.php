<?php
namespace SeanMorris\Warehouse\Irc;
class Connection
{
	protected
		$connectionString
		, $stream
		, $listeners = []
		, $status = -1
	;

	public static function get($hostname, $port)
	{
		$instance = new static;

		$instance->connectionString = sprintf(
			'tcp://%s:%d'
			, $hostname
			, $port
		);

		return $instance;
	}

	public function connect()
	{
		$this->stream = stream_socket_client(
			$this->connectionString
			, $errNo
			, $error
			, 30
		);

		stream_set_blocking($this->stream, false);

		if($errNo)
		{
			$this->status = $errNo;

			throw new \Exception($error, $errNo);
		}

		$this->dispatchEvent('connect', $this->connectionString);
	}

	public function disconnect()
	{
		fclose($this->stream);
	}

	public function send($string)
	{
		$this->dispatchEvent('send', $string);

		return fwrite($this->stream, $string . "\n");
	}

	public function addEventListener($eventName, $eventListener, $params = [])
	{
		if(!isset($this->listeners[$eventName]))
		{
			$this->listeners[$eventName] = new \SplObjectStorage;
		}

		$this->listeners[$eventName]->attach($eventListener, (object) $params);
	}

	public function removeEventListener($eventName, $eventListener)
	{
		if(!isset($this->listeners[$eventName]))
		{
			return;
		}

		$this->listeners[$eventName]->detach($eventListener);
	}

	protected function dispatchEvent($eventName, ...$args)
	{
		if(!isset($this->listeners[$eventName]))
		{
			return;
		}

		foreach($this->listeners[$eventName] as $listener)
		{
			$params = $this->listeners[$eventName][$listener];

			$listener($eventName, ...$args);

			if($params && isset($params->once) && $params->once)
			{
				$this->listeners[$eventName]->detach($listener);
			}
		}
	}

	public function check()
	{
		$start = microtime(true);

		$line = fgets($this->stream);

		if(!trim($line))
		{
			return;
		}

		$frame = \SeanMorris\Warehouse\Irc\Frame::parse($line);

		$this->dispatchEvent('receive', $frame);

		$this->dispatchEvent($frame->command, $frame);
	}

	public function listen($timeout = -1)
	{
		while(!feof($this->stream))
		{
			$this->check();

			if($timeout >= 0 && microtime(true) - $start > $timeout)
			{
				break;
			}
		}
	}
}
