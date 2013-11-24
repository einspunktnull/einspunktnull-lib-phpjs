/**
 * 
 * (c)2012 Albrecht Nitsche
 * 
 * www.einspunktnull.net
 */

;
(function(window, document, undefined)
{

    window.einspunktnull.stringify = function(obj)
    {
	var t = typeof (obj);
	if (t != "object" || obj === null)
	{
	    // simple data type
	    if (t == "string") obj = '"' + obj + '"';
	    return String(obj);
	}
	else
	{
	    // recurse array or object
	    var n = null, v, json = [], arr = (obj && obj.constructor == Array);
	    for (n in obj)
	    {
		v = obj[n];
		t = typeof (v);
		if (obj.hasOwnProperty(n))
		{
		    if (t == "string") v = '"' + v + '"';
		    else if (t == "object" && v !== null) v = window.einspunktnull.stringify(v);
		    json.push((arr ? "" : '"' + n + '":') + String(v));
		}
	    }
	    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
	}
    };
}(window, document, undefined));