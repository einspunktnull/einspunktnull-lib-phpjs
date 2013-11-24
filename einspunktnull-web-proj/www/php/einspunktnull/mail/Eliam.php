<?php 


import('einspunktnull.mail.Email');
import('einspunktnull.data.util.ConvertUtil');

class Eliam{

	private $dec = array('xY'=>'w','a7'=>'y','b3'=>'z','c1'=>'9','d7'=>'7','e6'=>'5','qf'=>'8','g1'=>'0','_h'=>'6','r5'=>'3','pj'=>'4','kµ'=>'2','l7'=>'1','m_'=>'@','n5'=>'z','oµ'=>'x','p$'=>'v','qx'=>'u','r3'=>'s','$s'=>'t','tt'=>'r','uv'=>'q','ve'=>'p','wa'=>'o','xf'=>'n','yf'=>'m','z7'=>'l','_1'=>'k','s2'=>'j','z3'=>'i','f4'=>'h','_5'=>'g','_6'=>'f','u7'=>'e','g8'=>'d','c9'=>'c','a0'=>'b','fµ'=>'a','Hg'=>'.');
	private $deci = array();

	function __construct() {
		foreach ($this->dec as $key =>$value) {
			$this->deci[$value] = $key;
		}
	}

	public function getLinks($txt) {
		$ret = array();
		$matches = Email::getEmailAddresses($txt);
		foreach ($matches as  $value) {
			$len = strlen($value);
			$out = '';
			for ($i = 0; $i < $len; $i++) {
				$char = $value[$i];
				$out.=$this->deci[$char];
			}
			$html = '<a class="eliam" href="#">';
			$html.= $out;
			$html.= '</a>';
			$html = '<br/>'.ConvertUtil::html2Text($html).$html;
			array_push($ret,$html );
		}
		return $ret;
	}
}


?>