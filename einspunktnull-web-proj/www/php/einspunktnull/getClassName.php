<?php

function getClassName($basePath,$path){
	$lastDot = strrpos($path, '.');
	$class = $lastDot ? substr($path, $lastDot + 1) : $path;
	$package = substr($path, 0, $lastDot);


	$expectedClassFileName = $class.'.php';

	$folder = $basePath . ($package ? str_replace('.', '/', $package) : '');

	$files = scandir($folder);

	foreach ($files as $file){
		if(strtolower($file)==$expectedClassFileName){
			return str_replace('.php', '', $file);
		}
	}
	return null;

}


?>