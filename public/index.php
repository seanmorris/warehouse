<?php
use \SeanMorris\Ids\Log;
use \SeanMorris\Ids\Router;
use \SeanMorris\Ids\Request;
use \SeanMorris\Ids\Settings;

$composer = require '../vendor/seanmorris/ids/source/init.php';
// $composer = require '../source/init.php';

if(isset($argv))
{
	$args = $argv;
	$script = array_shift($args);
}
else
{
	$request = new Request();
}

if(!$entrypoint = Settings::read('entrypoint'))
{
	print('No entrypoint specified. Please check local settings.');
	Log::error('No entrypoint specified. Please check local settings.');
	die;
}

$request->contextSet('composer', $composer);

$routes = new $entrypoint();
$router = new Router($request, $routes);
$router->contextSet('composer', $composer);

ob_start();

$response = $router->route();

$debug = ob_get_contents();

ob_end_clean();

if($response instanceof \SeanMorris\Ids\Api\Response)
{
	$response->send();
}
else if($response instanceof Traversable || is_array($response))
{
	foreach($response as $chunk)
	{
		echo dechex(strlen($chunk));
		echo "\r\n";
		echo $chunk;
		echo "\r\n";
		// flush();
		// ob_get_level() && ob_flush();
		// ob_get_level() && ob_end_flush();
	}
	echo "0\r\n\r\n";
}
else
{
	print $response;
}

if(Settings::read('devmode') && $debug)
{
	printf('<pre>%s</pre>', $debug);
}
