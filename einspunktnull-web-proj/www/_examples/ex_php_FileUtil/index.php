<?php 

//setup import engine
$phpBase = '../../php/';
include_once ($phpBase.'einspunktnull/import.php');
import_base_path($phpBase);

//imports
import('einspunktnull.file.util.FileUtil');
import('einspunktnull.util.Regex');



$allFiles = FileUtil::getAllFiles('../../');
print_r($allFiles);
print('<br/><br/>');
print(FileUtil::size($allFiles).' bytes');
print('<br/><br/>');

$jsFiles = FileUtil::search('../../', Regex::EQUALS_FILE_TYPE_JAVSCRIPT, FALSE);
print_r($jsFiles);
print('<br/><br/>');
print(FileUtil::size($jsFiles).' bytes');
print('<br/><br/>');

?>
