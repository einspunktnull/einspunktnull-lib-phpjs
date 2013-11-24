<?php

class UrlPathParams{

	private $params = array();

	function __construct() {

		$isOk=true;

		$c=1;

		while($isOk)
		{
			if(isset($_REQUEST['param'.$c])) {
				$param = $_REQUEST['param'.$c];
				if($param!="")array_push($this->params, $_REQUEST['param'.$c]);
				else $isOk=false;
			}
			else $isOk=false;
			$c++;
		}
	}

	public function getDepth(){
		return count($this->params);
	}

	public function get($idx){
		return $this->params[$idx];
	}

}


?>