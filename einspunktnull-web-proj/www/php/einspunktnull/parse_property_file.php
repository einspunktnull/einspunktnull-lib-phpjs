<?php

function parse_property_files( $filenames ) {
	return propertiesParser($filenames);
}

function propertiesParser( $filenames ) {
	if( !is_array( $filenames ) ) $filenames = array($filenames);
	$properties = array();
	foreach( $filenames as $filename ) {
		$properties = array_merge($properties,
				propertiesReadFile($filename)
		);
	}
	return propertiesFixReferences($properties);
}

function propertiesReadFile( $filename ) {
	$lines = file( $filename );
	if( $lines === false ) return false;

	$properties = array();

	foreach( $lines as $line ) {
		if( preg_match( '/^([^=#]*)=(.*)$/', $line, $matches ) ) {
			$properties[trim($matches[1])] = trim($matches[2]);
		}
	}

	return $properties;
}

function propertiesFixReferences( $properties ) {
	$keys = array_keys($properties);
	/* don't iterate over $properties directly; $properties going to change */
	foreach( $keys as $key ) {
		$replacevalue = $properties[$key];
		foreach( $keys as $key2 ) {
			$properties[$key2] = str_replace( '${'.$key.'}', $replacevalue, $properties[$key2] );
		}
	}

	foreach( $properties as $key => $value ) {
		if( preg_match_all('/\$\{([^{}]*)\}/', $value, $matches) ) {
			print "Undefined reference to '".implode("','",$matches[1])."' in '$key'\n";
		}
	}
	return $properties;
}