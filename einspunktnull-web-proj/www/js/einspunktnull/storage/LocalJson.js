/**
 * 
 * (c)2012 Albrecht Nitsche
 * 
 * www.einspunktnull.net
 */

;
(function(window, document, undefined)
{
    LocalJson.managers = [ new LocalStorageManager(), new CookieManager(), new WindowNameManager() ];
    LocalJson.addManager = function(mgr)
    {
	LocalJson.managers.splice(0, 0, mgr);
    };

    function LocalJson(name)
    {
	/***********************************************************************
	 * SETUP
	 **********************************************************************/
	var _name = name;
	var _mgr;

	for ( var i = 0; i < LocalJson.managers.length; i++)
	{
	    var manager = LocalJson.managers[i];
	    if (manager.isValid())
	    {
		_mgr = manager;
		break;
	    }
	}
	if (!_mgr) throw (new Error('No valid StorageManager'));

	/***********************************************************************
	 * FUNCTIONS
	 **********************************************************************/
	this.set = function(name, json)
	{
	    try
	    {
		_mgr.set(_name + '_' + name, JSON.stringify(json));
		return true;
	    }
	    catch (e)
	    {
	    }
	    return false;
	};

	this.has = function(name)
	{
	    return _mgr.get(_name + '_' + name) != null;
	};

	this.get = function(name)
	{
	    try
	    {
		return JSON.parse(_mgr.get(_name + '_' + name));
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
		_mgr.remove(_name + '_' + name);
		return true;
	    }
	    catch (e)
	    {
	    }
	    return false;
	};

    }

    /***************************************************************************
     * MANAGERS
     **************************************************************************/
    function WindowNameManager()
    {
	this.name = 'window.name';
	var specChars = '*+-./_@';
	this.isValid = function()
	{
	    return typeof window.top.name != 'undefined';
	};

	this.set = function(name, jsonString)
	{
	    var string = escape(jsonString);
	    for ( var i = 0; i < specChars.length; i++)
	    {
		string = string.replace(specChars.charAt(i), '%X' + i);
	    }
	    string = string.replace('%', '_');
	    window.name = jsonString;
	};

	this.get = function(name)
	{
	    var string = '' + window.name;
	    string = string.replace('_', '%');
	    for ( var i = 0; i < specChars.length; i++)
	    {
		string = string.replace("%X" + i, specChars.charAt(i));
	    }
	    return unescape(string);

	};

	this.remove = function(name)
	{
	    window.name = '';
	};
    }

    function LocalStorageManager()
    {
	this.name = 'localStorage';
	this.isValid = function()
	{
	    try
	    {
		var mod = 'lsTest' + Math.random() * 10000000;
		window.localStorage.setItem(mod, mod);
		window.localStorage.removeItem(mod);
		return true;
	    }
	    catch (e)
	    {

	    }
	    return false;

	};

	this.set = function(name, jsonString)
	{
	    localStorage.setItem(name, jsonString);
	};

	this.get = function(name)
	{
	    return localStorage.getItem(name);
	};

	this.remove = function(name)
	{
	    localStorage.removeItem(name);
	};
    }

    function CookieManager()
    {
	this.name = 'cookie';
	var MAX_CHARS = 3800;
	var MILLISECONDS = 31536000000;

	this.isValid = function()
	{
	    try
	    {
		var mod = 'lsTest' + Math.random() * 10000000;
		setCookie(mod, mod, 3600000);
		removeCookie(mod);
		return true;
	    }
	    catch (e)
	    {
	    }
	    return false;
	};

	this.set = function(name, jsonString)
	{
	    for ( var i = 0; i < jsonString.length; i += MAX_CHARS)
	    {
		var subStr = jsonString.substr(i, MAX_CHARS);
		setCookie(name + '_' + i / MAX_CHARS, subStr, MILLISECONDS);
	    }
	};

	this.get = function(name)
	{
	    var ready = false;
	    var c = 0;
	    var ret = '';
	    while (!ready)
	    {
		var tmp = getCookie(name + '_' + c);
		if (!tmp)
		{
		    ready = true;
		}
		else
		{
		    ret += tmp;
		}
		c++;
	    }
	    return ret;
	};

	this.remove = function(name)
	{
	    var ready = false;
	    var c = 0;
	    while (!ready)
	    {
		var tmp = getCookie(name + '_' + c);
		if (!tmp)
		{
		    ready = true;
		}
		else
		{
		    removeCookie(name + '_' + c);
		}
		c++;
	    }
	};

	function setCookie(name, value, milliseconds)
	{
	    var expires = '';
	    if (milliseconds)
	    {
		var date = new Date();
		date.setTime(date.getTime() + milliseconds);
		expires = "; expires=" + date.toGMTString();
	    }
	    document.cookie = name + "=" + value + expires + "; path=/";
	}

	function getCookie(name)
	{
	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for ( var i = 0; i < ca.length; i++)
	    {
		var c = ca[i];
		while (c.charAt(0) == ' ')
		    c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	    }
	    return null;
	}

	function removeCookie(name)
	{
	    setCookie(name, '', -1);
	}
    }

    if (!window.einspunktnull) window.einspunktnull = {};
    window.einspunktnull.LocalJson = LocalJson;
}(window, document, undefined));
