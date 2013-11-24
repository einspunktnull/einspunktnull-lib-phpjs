
<?php include("index_head.php");?>

        <div class = "leftdivs"><? include("admin_menu.php"); ?></div>
</div>

<div id="middle">
	<form action="admin_upload.php" method="post" enctype="multipart/form-data">
               <div>

                 <p>Semester<br>
                 	<select name="Semester" >
    				<option selected=>1</option>
    				<option>2</option>
    				<option>3</option>
                         	<option>4</option>
	                        <option>5</option>
	                        <option>6</option>
	                        <option>7</option>
	                        <option>8</option>
                 	</select>
                 </p>


                         <p>Fach<br>
                         	<select name="Fach" >
	                                 <option selected=>- anderes Fach -</option>
                                          <option>Mathematik</option>
                                          <option>Physik</option>
                                          <option>Informatik</option>
                                          <option>BWL</option>
                                          <option>GAVP</option> </option>
                                          <option>Physik</option>
                                          <option>Elektrotechnik</option>
                                          <option>Elektronik</option>
                                          <option>Rechnungswesen</option>
                                          <option>Kommunikationsdesign</option>
                                          <option>V.d.Medienvorstufe</option>
                                          <option>Werkstoffe</option>
                         	</select>
                                 Anderes Fach: <input name="AnderesFach" type="text" size="30" value="">
                 	</p>

                         <p>Kategorie<br>
                                	<select name="Kategorie" >
	                                 <option selected=>Klausur</option>
	                                 <option>Übung</option>
	                                 <option>Sonstiges</option>
                         	</select>
                         </p>


                         <p>Titel<br>
                 	<input name="Titel" type="text" size="30" value=""></p>

                         <p>Mit Lösung?<br>
                                 <select name="Lösung" >
                                         <option selected=>nein</option>
                                         <option>ja</option>
                                 </select>
                         </p>


                         <!-- Semester- und Jahreszahl -->

                         <? $bis = 2008;?>

                         <p>Semester und Jahr<br>
                         <select name="SemesterJahr" >
                         <option>unbekanntes Datum</option>
                        	<option selected=>WS 93/94</option>
                         	<?
                                 	for($i = 1994; $i <= $bis; $i++){
                                                 if ($i < 2000){
                                                 	$jahr = $i-1900;
                                                 }

                                                 if ($i >= 2000){
                                                 	$jahr = $i-2000;
                                                 }

                                                 $jahr = sprintf("%02d",$jahr);

                                                 if ($jahr + 1 != 100){
                                                 	$folgejahr = sprintf("%02d",$jahr+1);
                                                 }else{
                                                         $folgejahr = '00';
                                                 }

                                                 echo "<option>SS $jahr</option>";
                                                 echo "<option>WS $jahr/$folgejahr</option>";
                                         }
                                 ?>
                         
                 	</select>
                 	</p>


                         <p>Beschreibung<br>
                         <textarea name="Beschreibung" cols="80" rows="10"></textarea>

                         <p>Quelle<br>
                 	<input name="Quelle" type="text" size="30" value=""></p>

                         <p>Professor<br>
                 	<input name="Professor" type="text" size="30" value=""></p>




                 </div>

                 <div>   Datei<br>
                 	<input type="file" size="30" name="datei"><br>
                         <input type="submit" value="Hochladen">
		</div>


	</form>
</div>

<div id="right">
        <div class= "rightdivs_main"><b>norr leer</b></div>
</div>

<?php include("index_foot.php");?>