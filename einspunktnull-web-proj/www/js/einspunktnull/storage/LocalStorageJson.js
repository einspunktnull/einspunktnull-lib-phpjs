/**
 * 
 * (c)2012 Albrecht Nitsche
 * 
 * www.einspunktnull.net
 */

;
(function(window, document, undefined)
{

    function LocalStorageJson()
    {
	this.set = function(name, json)
	{
	    try
	    {
		var jsonString = JSON.stringify(json);
		window.localStorage.setItem(name, jsonString);
		return true;
	    }
	    catch (e)
	    {
	    }
	    return false;
	};

	this.get = function(name)
	{
	    try
	    {
		var jsonString = window.localStorage.getItem(name);
		var json = JSON.parse(jsonString);
		return json;
	    }
	    catch (e)
	    {
	    }
	    return null;
	};

	this.remove = function(name)
	{
	    try
	    {
		window.localStorage.removeItem(name);
		return true;
	    }
	    catch (e)
	    {
	    }
	    return false;
	};
    }

    if (!window.einspunktnull)
    {
	window.einspunktnull = {};
    }
    window.einspunktnull.LocalStorageJson = LocalStorageJson;

}(window, document, undefined));
