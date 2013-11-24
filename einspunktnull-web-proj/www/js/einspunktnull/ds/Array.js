;
(function(window, document, undefined)
{

    var _prototype = Array.prototype;

    _prototype.forEach = _prototype.forEach ? _prototype.forEach : function(fun, thisp)
    {
	var len = this.length;
	if (typeof fun != "function") throw new TypeError();

	var thisp = arguments[1];
	for ( var i = 0; i < len; i++)
	{
	    if (i in this) fun.call(thisp, this[i], i, this);
	}
    };

    _prototype.push = _prototype.push ? _prototype.push : function(x)
    {
	this[this.length] = x;
	return true;
    };

    _prototype.pop = _prototype.pop ? _prototype.pop : function()
    {
	var response = this[this.length - 1];
	this.length--;
	return response;
    };

    _prototype.transpose = _prototype.transpose ? _prototype.transpose : function()
    {

	var a = this, w = a.length ? a.length : 0, h = a[0] instanceof Array ? a[0].length : 0;

	if (h === 0 || w === 0)
	{
	    return [];
	}
	var i, j, t = [];
	for (i = 0; i < h; i++)
	{
	    t[i] = [];
	    for (j = 0; j < w; j++)
	    {
		t[i][j] = a[j][i];
	    }
	}
	return t;
    };

}(window, document, undefined));