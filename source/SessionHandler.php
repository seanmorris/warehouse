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

		\SeanMorris\Ids\Log::debug($settings->host, $settings->port ?: 6379);

		$this->redis->connect(
			$settings->host
			, $settings->port ?: 6379
			, 0, null, 0, 0
			, ['stream' => ['verify_peer_name' => false, 'verify_peer' => false, 'allow_self_signed' => true]]
		);

		\SeanMorris\Ids\Log::debug('connected!');

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

		$userData = $this->redis->get('sess_' . $sessionId);

		Log::error($userData);

		if($userData)
		{
			return $userData;
		}

		return serialize([]);
	}

	public function write($sessionId, $userData)
	{
		Log::error($sessionId, $userData);

		$this->redis->set('sess_' . $sessionId, $userData);

		return true;
	}

	public function destroy($sessionId)
	{
		Log::error($sessionId);

		$this->redis->del('sess_' . $sessionId);

		return true;
	}

	public function gc($lifetime)
	{
		Log::error($lifetime);

		return 365 * 24 * 60 * 60;
	}
}
