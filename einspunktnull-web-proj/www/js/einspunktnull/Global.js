/**
 * 
 * (c)2012 Albrecht Nitsche
 * 
 * www.einspunktnull.net
 */

;
(function($, window, document)
{

    function Global()
    {
	function GlobalObject()
	{
	    var _name = "GlobalObject";
	    this.getName = function()
	    {
		return _name;
	    };
	    this.setName = function(name)
	    {
		_name = name;
	    };
	}

	var _instance;

	function retObj()
	{
	    if (_instance === undefined)
	    {
		_instance = new GlobalObject();
	    }
	    return _instance;
	}

	return retObj();

    }
    einspunktnull.Global = new Global();
}(jQuery, window, document));
