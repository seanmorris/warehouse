<?php
namespace SeanMorris\Warehouse\Irc;
class Frame implements \JsonSerializable
{
	protected $line, $origin, $command, $params, $message;

	public static function parse($line)
	{
		$instance = new static;

		$instance->line = $line;

		if($line[0] === ':')
		{
			$line = substr($line, 1);
			$cut  = strpos($line, ':', 1);

			$header  = substr($line, 0, -1 + $cut);

			$instance->message = trim(substr($line, 1 + $cut));

			$params = explode(' ', $header);

			$instance->origin  = array_shift($params);
			$instance->command = array_shift($params);

			$instance->params = $params;

			return $instance;
		}

		$cut = strpos($line, ' ', 1);

		$instance->command = substr($line, 0, $cut);
		$instance->params  = explode(' ', substr($line, 1 + $cut));

		return $instance;
	}

	public function jsonSerialize()
	{
		return [
			'line'      => $this->line
			, 'message' => $this->message
			, 'command' => $this->command
			, 'params'  => $this->params
			, 'origin'  => $this->origin
		];
	}

	public function __get($name)
	{
		return $this->{ $name };
	}
}
