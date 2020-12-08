<?php
namespace SeanMorris\Warehouse;

use \SeanMorris\Ids\Log;
use \SessionHandlerInterface, \SessionIdInterface;

class SessionHandler extends \SessionHandler implements SessionHandlerInterface, SessionIdInterface
{
	public function __construct()
	{
		if(!$settings = \SeanMorris\Ids\Settings::read('redis'))
		{
			return FALSE;
		}

		$this->redis = new \Redis;

		$this->redis->pconnect($settings->host, $settings->port ?: 6379);

		if($settings->pass)
		{
			$this->redis->auth($settings->pass);
		}
	}

	public function open($savePath, $sessionName)
	{
		Log::error($savePath, $sessionName);

		$this->sessionName = $sessionName;
		$this->savePath    = $savePath;

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

		return $this->redis->get($this->savePath . '/sess_' . $sessionId) ?: '';
	}

	public function write($sessionId, $userData)
	{
		Log::error($sessionId, $userData);

		$this->redis->set($this->savePath . '/sess_' . $sessionId, $userData);

		return true;
	}

	public function destroy($sessionId)
	{
		Log::error($sessionId);

		$this->redis->del($this->savePath . '/sess_' . $sessionId);

		return true;
	}

	public function gc($lifetime)
	{
		Log::error($lifetime);

		return 365 * 24 * 60 * 60;
	}
}
