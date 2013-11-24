<?php

import('einspunktnull.util.Regex');

class Email{

	public static function isValidEmailAddress($string) {
		return preg_match(Regex::EQUALS_EMAIL_ADDRESS, $string);
	}


	public static function getEmailAddresses($string) {

		preg_match_all(Regex::EMAIL_ADDRESS,$string,$matches);
		return $matches[0];
	}
}

?>