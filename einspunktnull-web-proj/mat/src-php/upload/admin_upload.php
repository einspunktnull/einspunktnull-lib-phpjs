<?php include("index_head.php");?>

        <div class = "leftdivs"><? include("admin_menu.php"); ?></div>
</div>

<div id="middle">



<?
// Aufnahme der Formularparameter
$sem = $_REQUEST['Semester'];
if ($_REQUEST['Fach'] == '- anderes Fach -'){
    $fach = $_REQUEST['AnderesFach'];
}else{
    $fach = $_REQUEST['Fach'];
}
$kat = $_REQUEST['Kategorie'];
$tit = $_REQUEST['Titel'];
$lsg = $_REQUEST['Lösung'];
$semjay = $_REQUEST['SemesterJahr'];
$desc = $_REQUEST['Beschreibung'];
$quell = $_REQUEST['Quelle'];
$prof = $_REQUEST['Professor'];

//Upload und umbennen der der Datei
if (!file_exists('files/'.$_FILES['datei']['name'])){       //wenn Datei noch nicht existiert
     // schreiben
     include('inc.dbconnect.php');

	$qu1 = 'INSERT INTO '.$db_base.'.files (ID,Semester,Fach,Kategorie,Titel,Lösung,SemesterJahr,Beschreibung,Quelle,Professor,Link,DatumZeit)';
	$qu2 = 'VALUES (LAST_INSERT_ID( ),"'.$sem.'", "'.$fach.'", "'.$kat.'", "'.$tit.'", "'.$lsg.'", "'.$semjay.'", "'.$desc.'", "'.$quell.'", "'.$prof.'", "'.$_FILES['datei']['name'].'", NOW() )';
	
	echo $_FILES['datei']['name'];
	
	
	mysql_query($qu1.$qu2);

    //Datei-Upload
    move_uploaded_file($_FILES['datei']['tmp_name'], "files/".$_FILES['datei']['name']);
     
    // Anzeigen
    include ('beitragsanzeige.php');

    $qu = 'SELECT * FROM files WHERE files.ID = LAST_INSERT_ID( )';
	showBeitrag($qu,'ja');
}else{
     echo '<b>Eintrag und Upload misslungen!!! Die Datei ist schon vorhanden!!!</b>';
}




?>

</div>

<div id="right">
	<div class= "rightdivs_main">
                 Upload
        </div>
</div>

<?php include("index_foot.php");?>