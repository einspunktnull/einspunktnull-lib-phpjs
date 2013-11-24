<?php 

class ConvertUtil{
	public static function html2Text($html) {
		return '<pre>'.htmlentities($html).'</pre>';
	}
}



?>
