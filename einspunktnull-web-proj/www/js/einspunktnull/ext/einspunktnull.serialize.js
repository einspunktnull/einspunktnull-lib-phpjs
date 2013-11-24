/**
 * 
 * (c)2012 Albrecht Nitsche
 * 
 * www.einspunktnull.net
 */

;
(function(window, document, undefined)
{

    window.einspunktnull.serialize = function(obj,prefix)
    {
	var str = [];
	for ( var p in obj)
	{
	    var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
	    str.push(typeof v == "object" ? einspunktnull.serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
	}
	return str.join("&");

    };

}(window, document, undefined));