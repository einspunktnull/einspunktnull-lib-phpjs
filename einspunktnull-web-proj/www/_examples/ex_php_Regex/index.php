<?php 

//setup import engine
$phpBase = '../../php/';
include_once ($phpBase.'einspunktnull/import.php');
import_base_path($phpBase);


import('einspunktnull.util.Regex');
import('einspunktnull.data.util.ConvertUtil');


$txt = '<li><a href="buchung" data-transition="none">Buchung</a></li>

<div data-role="page" id="page-buchung" data-title="Buchung">
<div data-role="content" class="content">
<h1>Suche</h1>
<div data-role="controlgroup"  >
<a id = "btn-buchung-fahrzeugklasse" href="buchung-fahrzeugklasse" data-role="button"  data-icon="arrow-r" data-transition="slide" data-iconpos="right" ></a>
<a href="buchung-ort" id = "btn-buchung-ort" data-role="button" data-icon="arrow-r" data-transition="slide" data-iconpos="right">Ort</a>
<a href="buchung-zeitraum" id = "btn-buchung-zeitraum" data-role="button"  data-icon="arrow-r" data-transition="slide" data-iconpos="right">Beginn<br/>	Ende</a>


<a href="buchung-zeitraum" id = "btn-buchung-zeitraum" data-role="button"  data-icon="arrow-r" data-transition="slide" data-iconpos="right">
Beginn
<br/>
Ende
</a>';
echo ConvertUtil::html2text($txt);

print('<br/>');
print('<br/>');

print_r(Regex::matchXmlTags('a', $txt));

?>