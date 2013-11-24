<?php

//setup import engine
$phpBase = '../../php/';
include_once ($phpBase.'einspunktnull/import.php');
import_base_path($phpBase);

//imports
import('einspunktnull.mail.Eliam');

/*
 * Formular-Post-Daten
*/
if(isset($_POST['frmEliam'])){
	$frmEliam=$_POST['frmEliam'] ;
}else {
	$frmEliam = 'affe@waffe.de conrad@cool.de';
}

?>



<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>index</title>
<meta name="description" content="bla" />
<meta name="author" content="einspunktnull" />
<link rel="stylesheet" type="text/css" media="screen"
	href="css/style.css">
<script type="text/javascript" src="../../js/libs/jquery-1.7.1.js"></script>
<script type="text/javascript" src="../../js/einspunktnull/BasicSetup.js"></script>
<script type="text/javascript" src="../../js/einspunktnull/jq/jquery.eliam.js"></script>
</head>
<body>
	<form action="" method="post">
		<input type="text" name="frmEliam" value="<?php print $frmEliam ?>" />
		<input type="submit" value="Absenden" />
	</form>
	

	<?php 
	$eliam = new Eliam();
	$mails = $eliam->getLinks($frmEliam);
	foreach ($mails as $mail) {
		print $mail;
	}
	
	 ?>
</body>
</html>
