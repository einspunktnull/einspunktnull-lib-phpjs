<?php 



class FileUtil{

	const APACHE_MIME_TYPES_URL = 'http://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types';
	const APACHE_MIME_TYPES_URL_LOCAL = 'einspunktnull/_res/mime.types';
	const MIME_LOCAL = 'mimeLocal';
	const MIME_APACHE = 'mimeApache';
	private static $matches;


	public static function provideFile($file)
	{
		if(!is_file($file))
		{
			die("<b>404 File not found!</b>");
		}
		$mime = self::getMimeType($file, self::MIME_LOCAL);
		$filename = self::getFilename($file);
		$len = self::size($file);

		header("Content-type: $mime");
		header("Content-Disposition: attachment; filename=$filename");
		readfile($file);
	}

	public static function getMimeType($file, $method = FALSE){

		$mimeDescPath = translate_path(self::APACHE_MIME_TYPES_URL_LOCAL);
		switch ($method) {
			case self::MIME_APACHE:
				$mimeDescPath = self::APACHE_MIME_TYPES_URL;
				break;
			case self::MIME_LOCAL:
			default:
				$mimeDescPath = translate_path(self::APACHE_MIME_TYPES_URL_LOCAL);
				break;
				break;
		}
		$mimeArr = self::mimeArray($mimeDescPath);
		$fileExtension = self::getFileExtension($file);
		return $mimeArr[$fileExtension];
	}

	private static function mimeArray($url)
	{
		$s=array();
		foreach(@explode("\n",@file_get_contents($url))as $x){
			if(isset($x[0]) && $x[0]!=='#' && preg_match_all('#([^\s]+)#',$x,$out) && isset($out[1]) && ($c=count($out[1]))>1)
			{
				for($i=1;$i<$c;$i++){
					$s[$out[1][$i]]=$out[1][0];
				}
			}
		}
		return $s;
	}

	public static function getFilename($file)
	{
		$pi = pathinfo($file);
		return $pi['basename'];
	}

	public static function getFileExtension($file)
	{
		$pi = pathinfo($file);
		return $pi['extension'];
	}

	public static function size($fileOrfiles)
	{
		if(is_array($fileOrfiles))
		{
			$totalsize = 0;
			foreach ($fileOrfiles as $file) {
				if (file_exists($file)) {
					$totalsize += filesize($file);
				}
			}
			return $totalsize;
		}else{
			return filesize($fileOrfiles);
		}
	}

	public static function getAllFiles($file, $includeDirs = TRUE) {
		self::$matches= array();
		self::getFilesRecursive($file, $includeDirs);
		return self::$matches;
	}

	public static function search($file, $regex, $includeDirs = TRUE) {
		self::$matches= array();
		self::getFilesRecursive($file, $includeDirs, $regex);
		return self::$matches;
	}

	private static function getFilesRecursive($file,  $includeDirs, $regex=FALSE) {
		if(is_dir($file)){
			$lastChar = $file[strlen($file)-1];
			$dir = $lastChar=='/'?$file:$file.'/';
			if($includeDirs){
				self::addMatches($dir, $regex);
			}
			$files = array_diff(scandir($dir), array('..', '.'));
			foreach ($files as $file2) {
				self::getFilesRecursive($dir.$file2, $includeDirs,$regex);
			}
		}else{
			self::addMatches($file, $regex);
		}
	}

	private static function addMatches($fileOrDir, $regex)
	{
		if($regex){
			if(preg_match($regex, $fileOrDir)){
				array_push(self::$matches, $fileOrDir);
			}
		}else{
			array_push(self::$matches, $fileOrDir);
		}
	}

	// copies files and non-empty directories
	public static function copyRecursive($src, $dst) {
		if (file_exists($dst)) self::removeDirRecursive($dst);
		if (is_dir($src)) {
			mkdir($dst);
			$files = scandir($src);
			foreach ($files as $file)
				if ($file != "." && $file != "..") self::copyRecursive("$src/$file", "$dst/$file");

		}
		else if (file_exists($src)) copy($src, $dst);
	}

	// removes files and non-empty directories
	public static function clearDir($dir) {
		if (is_dir($dir)) {
			$files = scandir($dir);
			foreach ($files as $file){
				if ($file != "." && $file != "..") self::removeDirRecursive("$dir/$file");
			}
		}
		else if (file_exists($dir)) unlink($dir);
	}

	// removes files and non-empty directories
	public static function removeDirRecursive($dir) {
		if (is_dir($dir)) {
			$files = scandir($dir);
			foreach ($files as $file){
				if ($file != "." && $file != "..") self::removeDirRecursive("$dir/$file");
			}
			rmdir($dir);
		}
		else if (file_exists($dir)) unlink($dir);
	}

	public static function writeToFile($file, $content)
	{
		$fh = fopen($file, 'w') or die("can't open file");
		fwrite($fh, $content);
		fclose($fh);
	}

	//file/dir/array
	public static function createZip($fda, $zipFilename, $cutPath)
	{
		if(!is_file($fda) && is_dir($fda) && is_array($fda))return FALSE;
		
		$zip = new ZipArchive();
		if((!$zip->open($zipFilename, ZipArchive::CREATE))){
			die('Error: Unable to create zip file');
		}

		
		if(is_file($fda))
		{
			$files = array($fda);
		}
		else if(is_dir($fda))
		{
			$files = self::getAllFiles($fda);
		}
		else if(is_array($fda))
		{
			$files = $fda;
		}

		foreach ($files as $file) {
			$localName = preg_replace('=^('.$cutPath.')(.*)$=i','$2', $file);
			$zip->addFile($file, $localName);
		}

		$zip->close();
		
		return $zipFilename;

	}


}


?>
