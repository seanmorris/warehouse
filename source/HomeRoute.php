<?php
namespace SeanMorris\Warehouse;
class HomeRoute implements \SeanMorris\Ids\Routable
{
	function index($router)
	{
		$corsMethods = ['GET','POST','HEAD','OPTIONS'];

		$corsHeaders = [
			'Content-Type'
			, 'Authorization'
			, 'X-Requested-With'
			, 'Cache-Control'
			, 'Last-Event-Id'
			, 'Pragma'
			, 'ids-output-headers'
			, 'ids-input-headers'
		];

		header(sprintf('Access-Control-Allow-Origin: %s', 'http://localhost:3333'));
		header('Access-Control-Allow-Credentials: true');
		header('Access-Control-Allow-Methods: ' . implode(', ', $corsMethods));
		header('Access-Control-Allow-Headers: ' . implode(', ', $corsHeaders));

		$request = $router->request();
		$method  = $request->method();

		$inputFormat  = $request->headers('Content-Type');
		$outputFormat = $request->headers('Accept');

		switch($method)
		{
			// case 'PATCH':  break;
			// case 'PUT':    break;
			// case 'DELETE': break;
			case 'POST':

				$response = new \SeanMorris\Ids\Api\Response($request);

				$response->setContent($request->read());
				$response->setEncoding($outputFormat);

				return $response;


			case 'GET':
		}

	}
}
