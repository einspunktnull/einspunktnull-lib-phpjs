/**
 * 
 * (c)2012 Albrecht Nitsche
 * 
 * www.einspunktnull.net
 */

;
(function(window, document, undefined)
{

    // Basic
    var _einspunktnull = new Object();
    window.einspunktnull = _einspunktnull;
    window.µ = _einspunktnull;

    // Definitions
    _einspunktnull.config = new Object();
    _einspunktnull.config.scope = _einspunktnull;
    _einspunktnull.config.useAlert = false;
    _einspunktnull.config.debug = false;
    _einspunktnull.objLength = function(obj)
    {
	if (!typeof obj === 'object') return undefined;
	var c = 0;
	for ( var i in obj)
	{
	    i;
	    c++;
	}
	return c;
    };
    _einspunktnull.extend = function(childClass, superClass)
    {
	function Inheritance()
	{
	};
	Inheritance.prototype = superClass.prototype;
	childClass.prototype = new Inheritance();
	childClass.prototype.constructor = childClass;
	childClass.sup = superClass;
	childClass.superClass = superClass.prototype;
    };
    _einspunktnull.merge = function(target, source)
    {
	if (!source) return target;
	for ( var key in source)
	{
	    try
	    {
		if (source[key] && source[key].constructor == Object)
		{
		    target[key] = _einspunktnull.merge(target[key], source[key]);
		}
		else
		{
		    target[key] = source[key];
		}
	    }
	    catch (e)
	    {
		target[key] = source[key];
	    }
	}
	return target;
    };
    _einspunktnull.Console = function(debug, useAlert)
    {
	this.log = function(obj)
	{
	    if (useAlert)
	    {
		alert('###log### :', obj);
	    }
	};

	if (debug)
	{
	    if (!window.console) return this;
	    return window.console;
	}
	useAlert = false;
	return this;
    };
    _einspunktnull.update = function()
    {

	var scope = _einspunktnull.config.scope;
	var debug = _einspunktnull.config.debug;
	var useAlert = _einspunktnull.config.useAlert;

	// Console
	_einspunktnull.console = new _einspunktnull.Console(debug, useAlert);

	if (scope != _einspunktnull) _einspunktnull.merge(scope, _einspunktnull);

    };

}(window, document, undefined));
