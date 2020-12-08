<?php
namespace SeanMorris\Warehouse;

use \SeanMorris\Ids\Log;
use \SessionHandlerInterface, \SessionIdInterface;

class SessionHandler implements SessionHandlerInterface, SessionIdInterface
{
	public function __construct()
	{
		if(!$settings = \SeanMorris\Ids\Settings::read('redis'))
		{
			return FALSE;
		}

		$this->redis = new \Redis;

		$this->redis->pconnect($settings->host, $settings->port ?: 6379);
	}

	public function create_sid()
	{
		return uniqid();
	}

	public function open($savePath, $sessionName)
	{
		Log::error($savePath, $sessionName);

		$this->savePath = $savePath;

		return true;
	}

	public function close()
	{
		Log::error($this);

		return true;
	}

	public function read($sessionId)
	{
		Log::error($sessionId);

		return $this->redis->get($this->savePath . '/' . $sessionName);
	}

	public function write($sessionId, $userData)
	{
		Log::error($sessionId, $userData);

		return $this->redis->set($this->savePath . '/' . $sessionName, $userData);
	}

	public function destroy($sessionId)
	{
		Log::error($sessionId);

		return $this->redis->del($this->savePath . '/' . $sessionName);
	}

	public function gc($lifetime)
	{
		Log::error($lifetime);

		// return 365 * 24 * 60 * 60;
		return TRUE;
	}
}
