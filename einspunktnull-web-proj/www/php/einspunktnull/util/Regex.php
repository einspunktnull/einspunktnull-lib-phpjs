<?php 

class Regex
{
	const EMAIL_ADDRESS = '=\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b=i';
	const EQUALS_EMAIL_ADDRESS = '=^\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$=i';
	const FILE_TYPE_JAVSCRIPT = '=\b[\w\./\\!:_\-äöü]+\.js(x|on)?\b=i';
	const EQUALS_FILE_TYPE_JAVSCRIPT = '=^[\w\./\\!:_\-äöü]+\.js(x|on)?\b$=i';
	const HTML_TAG_ANCHOR = '=(<\s*a\s+.*?href\=")([\w\d:_\-\.\/\\\]+)("[^<>]*>)(.*?)(<\s*/\s*a>)=mis';
	const XML_TAG_ATTRIBUTES = '=(\b[\w-_]+\b)\s*\=\s*"([^"]+)"=i';
	
	
	
	public static function matchXmlTags($tagName, $txt)
	{
		$ret = array();
		$regexTag = '=<\s*'.$tagName.'[^>]*>(.*?)<\s*/\s*'.$tagName.'>=mis';
		preg_match_all($regexTag, $txt, $matchesTags);
		
		for ($i = 0; $i < count($matchesTags[0]); $i++) {
			$match1 = $matchesTags[0][$i];
			$match2 = $matchesTags[1][$i];
			$res = array();
			$res['string'] = $match1;
			$res['content'] = $match2;
			$res['attributes'] = array();
			preg_match_all(self::XML_TAG_ATTRIBUTES, $res['string'], $matchesAttr);
			for ($j = 0; $j < count($matchesAttr[0]); $j++) {
				$attr = array();
				$attr['name'] = $matchesAttr[1][$j];
				$attr['value'] = $matchesAttr[2][$j];
				array_push($res['attributes'],$attr);
			}
			array_push($ret,$res);
		}
		return $ret;
	}
	
}



?>