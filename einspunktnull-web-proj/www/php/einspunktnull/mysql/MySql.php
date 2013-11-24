<?php

class MySql{

	private $host;
	private $name;
	private $user;
	private $pwd;
	private $encodeUtf8;

	function __construct($host,$name,$user,$pwd,$encodeUtf8) {
		$this->encodeUtf8 =$encodeUtf8;
		$this->host=$host;
		$this->name=$name;
		$this->user=$user;
		$this->pwd=$pwd;
	}

	public function connect(){

		$link = mysql_connect($this->host, $this->user, $this->pwd)
		or die ( "Datenbankserver nicht erreichbar: ". mysql_error());

		mysql_select_db($this->name)
		or die ( "Datenbank nicht vorhanden: ". mysql_error());
	}

	public function execSql($sql){

		$retSql = mysql_query($sql) or die (mysql_error());

		//echo gettype($retSql);

		$retArr = array();

		if(gettype($retSql)=="resource"){
			while($row = mysql_fetch_array($retSql,MYSQL_ASSOC)){
				if($this->encodeUtf8){
					foreach ($row as &$value) {
						$value = utf8_encode($value);
					}
				}
				array_push ( $retArr,$row);
			}
		}
		return $retArr;
	}
}


?>