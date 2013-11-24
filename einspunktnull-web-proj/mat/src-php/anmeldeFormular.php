<?php
$sane = true;
$message = "";
$mailArr = array("name" => true, "praxis" => true, "strasse" => true, "plzort" => true, "telefon" => true, "mail" => true);


if ($_POST['action'] == 'send') {
    if (empty($_COOKIE["formular"])) {


        if (empty($_POST['name']) || strlen($_POST['name']) <= 5) {
            $sane = false;
            $mailArr["name"] = false;
            $message.="Bitte geben sie Ihren Namen und Vor- und Nachnamen an!<br/>";
        }

        if (empty($_POST['praxis']) || strlen($_POST['praxis']) <= 5) {
            $sane = false;
            $mailArr["praxis"] = false;
            $message.="Bitte geben sie Einrichtung an!<br/>";
        }

        if (empty($_POST['strasse']) || strlen($_POST['strasse']) <= 3) {
            $sane = false;
            $mailArr["strasse"] = false;
            $message.="Bitte geben sie eine Strasse und Hausnummer an!<br/>";
        }

        if (empty($_POST['plzort']) || strlen($_POST['plzort']) <= 5) {
            $sane = false;
            $mailArr["plzort"] = false;
            $message.="Bitte geben sie eine Strasse und Hausnummer an!<br/>";
        }

        if (empty($_POST['telefon']) || strlen($_POST['telefon']) <= 7) {
            $sane = false;
            $mailArr["telefon"] = false;
            $message.="Bitte geben sie eine gültige Telefon- und/oder Faxnummer an!<br/>";
        }

        if (empty($_POST['mail']) || strlen($_POST['mail']) <= 5) {
            $sane = false;
            $mailArr["mail"] = false;
            $message.="Bitte geben sie eine gülige E-Mailadresse an!<br/>";
        }





        //Final Check
        if ($sane) {
            setcookie("formular", "Email wurde gesendet", time() + 60);
            $from = 'ISKE-Anmeldung <info@iske-leipzig.de>';
            $mailadresse = $_POST['mail'];
            
            $to = "info@iske-leipzig.de";
            $to_test = "albrechtnitsche@gmx.de";
            $betreff = "Anmeldung zum ISKE am 11. März 2011";
            $header = 'From: ' . $from . "\r\n";
            $nachricht = '';

            $nachricht .= 'Titel: ' . $_POST['titel'] . "\r\n";
            $nachricht .= 'Vorname, Name: ' . $_POST['name'] . "\r\n";
            $nachricht .= 'Einrichtung: ' . $_POST['praxis'] . "\r\n";
            $nachricht .= 'Strasse, Hausnummer: ' . $_POST['strasse'] . "\r\n";
            $nachricht .= 'PLZ, Ort: ' . $_POST['plzort'] . "\r\n";
            $nachricht .= 'Telefon/Telefax: ' . $_POST['telefon'] . "\r\n";
            $nachricht .= 'E-Mail: ' . $mailadresse . "\r\n";
            if ($_POST['essen'] == 'ja'

                )$nachricht .= 'Mittagessen: ja' . "\r\n";
            else
                $nachricht .= 'Mittagessen: nein' . "\r\n";

            $nachricht1 = 'Folgende Person hat sich zum 1. Symposium kindliche Entwicklung am 11. März 2011 mit folgenden Daten angemeldet:' . "\r\n\r\n" . $nachricht;
            $nachricht1 = utf8_decode($nachricht1);
            mail(utf8_decode($to), utf8_decode($betreff), $nachricht1, utf8_decode($header));
            mail(utf8_decode($to_test), utf8_decode($betreff), $nachricht1, utf8_decode($header));

            $nachricht2 = 'Sie haben sich erfolgreich zum 1. Symposium kindliche Entwicklung am 11. März 2011 mit folgenden Daten angemeldet:' . "\r\n\r\n" . $nachricht;
            $nachricht2 = utf8_decode($nachricht2);
            
            mail(utf8_decode($mailadresse), utf8_decode("Bestätigung: " . $betreff), $nachricht2, utf8_decode($header));
            $message = 'Vielen Dank! Die Anfage wurde versendet.<br/>Eine Kopie wurde Ihnen zugesandt.<br/>';
        }
    }
    else
        $message.="Sie können nur alle 60 Sekunden eine Email verschicken!<br/>";
}

function checkInput($value) {
    if ($value

        )echo ' class="formattr" ';
    else
        echo ' class="falseinput" ';
}

include("head.php");
?>


<!--################################# CONTENT START #########################################-->

<p class="dick" >Anmeldung zum 1. Symposium kindliche Entwicklung am 19. März 2011 in Leipzig</p>


<p id="hinweis"><? echo $message; ?></p>
<br/>


<div class="dick" style="font-size: 11pt;">Hiermit melde ich mich zu der o.g. Veranstaltung an.</div>
<div style="float:right"><img src="img/children2.jpg"/></div>


<form class ="anmeldung" action="anmeldung.php" method="post" style="width:500px;">

    <br />

    <table>
        <tr >
            <td >Titel</td>
            <td class="formattr"><input type="text" name="titel" class="text" value="<?php echo $_POST['titel'] ?>"/></td>
        </tr>
        <tr>
            <td >Vorname, Name</td>
            <td <?php checkInput($mailArr["name"]); ?> ><input type="text" name="name" class="text" value="<?php echo $_POST['name'] ?>"/></td>
        </tr>
        <tr>
            <td >Einrichtung</td>
            <td  <?php checkInput($mailArr["praxis"]); ?>><input type="text" name="praxis" class="text" value="<?php echo $_POST['praxis'] ?>"/></td>
        </tr>

        <tr >
            <td >Straße, Hausnummer</td>
            <td <?php checkInput($mailArr["strasse"]); ?>><input type="text" name="strasse" class="text" value="<?php echo $_POST['strasse'] ?>"/></td>
        </tr>
        <tr >
            <td >PLZ, Ort</td>
            <td <?php checkInput($mailArr["plzort"]); ?>><input type="text" name="plzort" class="text" value="<?php echo $_POST['plzort'] ?>"/></td>
        </tr>
        <tr >
            <td >Telefon/Telefax</td>
            <td <?php checkInput($mailArr["telefon"]); ?>><input type="text" name="telefon" class="text" value="<?php echo $_POST['telefon'] ?>"/></td>
        </tr>
        <tr >
            <td >E-Mail</td>
            <td <?php checkInput($mailArr["mail"]); ?>><input type="text" name="mail" class="text" value="<?php echo $_POST['mail'] ?>"/></td>
        </tr>
        <tr>
            <td colspan="2">&nbsp;</td>
        </tr>
        <tr>
            <td colspan="2"><input style="margin-left:0px;" type="checkbox" name="essen" value="ja" <?php if ($_POST['essen'] == 'ja')
    echo 'checked="checked"'; ?>/><div style="float:right;width:340px;margin-left:20px;">Ich möchte am Mittagessen teilnehmen. (nicht im Teilnehmerpreis enthalten)</div></td>
        </tr>

    </table>

    <br/>
     <div style="font-size:8pt;margin-left:2px;">
        <b>Die Teilnahmegebühr beträgt 95,00€.</b> Bitte überweisen Sie den Betrag auf das unter <a href="./organisatorische-angaben.php" style="text-decoration:underline;font-size:8pt;">Organisatorische Angaben</a> ausgewiesene Konto.
        Bitte geben Sie im Verwendungszweck der Überweisung Ihren Namen an.
    </div>
    <br/>
    <div style="font-size:8pt;margin-left:2px;">
        Wir beachten den Grundsatz der zweckgebundenen Daten-Verwendung und erheben, verarbeiten und speichern Ihre personenbezogenen Daten nur für interne Zwecke. Eine Weitergabe Ihrer persönlichen Daten an Dritte erfolgt nicht ohne Ihre ausdrückliche Einwilligung.
    </div>
    <p>

        <input type="hidden" name="action" value="send" />

        <input type="submit" name="feedback" class="button" value="Absenden" />

        <input type="reset" class="button" value="Löschen" />

    </p>






</form>



<!--################################# CONTENT ENDE #########################################-->










<?php
include("foot.php");
?>