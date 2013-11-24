<?php 

//setup import engine
$phpBase = '../../php/';
include_once ($phpBase.'einspunktnull/import.php');
import_base_path($phpBase);

//imports
import('einspunktnull.mail.Email');

//script
print_r (Email::getEmailAddresses('matze mail ist ino@affe.de und affe@info.de und so'));
print '<br/>';
echo Email::isValidEmailAddress('affe@penus.de');
print '<br/>';
echo Email::isValidEmailAddress('äffe@pönus.com');

?>