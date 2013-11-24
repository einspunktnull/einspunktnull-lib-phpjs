
<?
	
include('inc.dbconfig.php');

if ($db_online_oder_offline == 'offline'){
	$db_host = $db_host_offline;
	$db_base = $db_base_offline;
	$db_user = $db_user_offline;
	$db_passwd = $db_passwd_offline;
}else if ($db_online_oder_offline == 'online'){
	$db_host = $db_host_online;
	$db_base = $db_base_online;
	$db_user = $db_user_online;
	$db_passwd = $db_passwd_online;
}

$link = mysql_connect($db_host, $db_user, $db_passwd)
	 or die ( "Datenbankserver nicht erreichbar: ". mysql_error());

mysql_select_db($db_base)
	 or die ( "Datenbank nicht vorhanden: ". mysql_error());
	

?>
