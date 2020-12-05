<?php
namespace SeanMorris\Warehouse;
class HomeRoute implements \SeanMorris\Ids\Routable
{
	function index($router)
	{
		$request = $router->request();
		$method  = $request->method();

		\SeanMorris\Ids\Log::error($request->headers());

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

		$inputFormat  = $request->headers('Content-Type');
		$outputFormat = 'text/plain';

		switch($request->headers('Accept'))
		{
			case 'text/plain':
				$outputFormat = 'text/plain';
				break;

			case 'text/csv':
				$outputFormat = 'text/csv';
				break;

			case 'text/tsv':
				$outputFormat = 'text/tsv';
				break;

			case 'text/json':
				$outputFormat = 'text/json';
				break;

			// case 'text/yaml':
			// 	$outputFormat = 'text/yaml';
			// 	break;
		}

		header('ContentType: ' . $outputFormat);

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
