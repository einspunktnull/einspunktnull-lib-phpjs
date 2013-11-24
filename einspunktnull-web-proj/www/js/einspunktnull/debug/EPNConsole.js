/**
 * 
 * (c)2012 Albrecht Nitsche
 * 
 * www.einspunktnull.net
 */

;
(function(window)
{

    this.Cc =
    {
	_version : 0.1,
	// i.e. fallback types are "div" or "alert";
	type : "div",
	debug : true, // global debug on|off
	quietDismiss : true, // may want to just drop, or alert instead,
	_initialized : false,
	method : "log",
	init : function()
	{
	    if (!this._initialized)
	    {

		if (this.type == "div" && this.debug && !this._hasConsole(this.method))
		{
		    Cc.div = document.createElement('div');
		    Cc.div.id = "epnConsole";
		    Cc.div.style.position = "absolute";
		    Cc.div.style.left = "0px";
		    Cc.div.style.top = "0px";
		    Cc.div.style.width = "400px";
		    Cc.div.style.zIndex = "99999";

		    Cc.div.style.backgroundColor = "#eff1f5";
		    Cc.div.style.border = "1px solid black";

		    Cc.div.style.fontFamily = "Courier, MS Courier New, Prestige, Everson Mono";
		    Cc.div.style.fontWeight = "bold";
		    Cc.div.style.color = "#000000";
		    Cc.div.style.fontSize = "9pt";

		    Cc.div.innerHTML = "EPN Console<br/><br/>";

		    document.body.appendChild(Cc.div);
		}
		_initialized = true;
	    }
	},

	_hasConsole : function(fctName)
	{
	    var methodName = fctName || "log";
	    return typeof (console) == 'object' && typeof (console[methodName]) != "undefined";
	},

	_consoleMethod : function()
	{

	    if (!this.debug) return false;

	    if (this._hasConsole(this.method))
	    {

		var method = console[this.method];
		method.apply(console, arguments);
	    }
	    else
	    {
		if (!this.quietDismiss && arguments.length && !this._initialized)
		{

		    var result = "";
		    for ( var i = 0, l = arguments.length; i < l; i++)
			result += arguments[i] + " (" + typeof arguments[i] + ") ";
		    if (this.type == "div")
		    {
			Cc.div.innerHTML += '<br/>' + result;
		    }
		    else
		    {
			alert(result);
		    }

		}
	    }
	},

	log : function()
	{
	    this.method = "log";
	    this._consoleMethod.apply(this, arguments);
	},

	info : function()
	{
	    this.method = "info";
	    this._consoleMethod.apply(this, arguments);
	},

	warn : function()
	{
	    this.method = "warn";
	    this._consoleMethod.apply(this, arguments);
	},

	clear : function()
	{
	    this.method = "clear";
	    this._consoleMethod.apply(this);
	},

	count : function()
	{
	    this.method = "count";
	    this._consoleMethod.apply(this, arguments);
	},

	trace : function()
	{
	    this.method = "trace";
	    this._consoleMethod.apply(this, arguments);
	},

	assert : function()
	{
	    this.method = "assert";
	    this._consoleMethod.apply(this, arguments);
	},

	dir : function()
	{
	    this.method = "dir";
	    this._consoleMethod.apply(this, arguments);
	},

	addLoadEvent : function(func)
	{
	    var oldonload = window.onload;
	    if (typeof window.onload != 'function')
	    {
		window.onload = func;
	    }
	    else
	    {
		window.onload = function()
		{
		    if (oldonload)
		    {
			oldonload();
		    }
		    func();
		};

	    };
	}

    };
    // end console wrapper.

    Cc.addLoadEvent(Cc.init);

    einspunktnull.Cc = Cc;

}(window));
