<?php 
//setup import engine
$phpBase = '../../php/';
include_once ($phpBase.'einspunktnull/import.php');
import_base_path($phpBase);

import('einspunktnull.file.util.FileUtil');


$provider = new FileProvider('file',FileProvider::METHOD_REQUEST);

class FileProvider
{

	const METHOD_REQUEST  = 'METHOD_REQUEST';
	const METHOD_POST  = 'METHOD_POST';
	const METHOD_GET  = 'METHOD_GET';

	public function __construct($name, $method)
	{
		$file='';
		$vars = $_POST;
		
		switch ($method) {
			case self::METHOD_REQUEST:
				$vars = $_REQUEST;
				break;
			case self::METHOD_GET:
				$vars = $_GET;
				break;
			case self::METHOD_POST:
			default:
				$vars = $_POST;
				break;
		}
		
		if(isset($vars[$name]))
		{
			$file = $vars[$name];
		}else{
			die('error');
		}

		FileUtil::provideFile($file);
	}
}


?>