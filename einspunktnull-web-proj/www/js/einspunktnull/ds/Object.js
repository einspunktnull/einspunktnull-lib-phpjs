;
(function(window, document, undefined)
{
    var _prototype = Object.prototype;

    _prototype.length = _prototype.length ? _prototype.length : function()
    {
	var size = 0;
	for (key in this)
	{
	    if (this.hasOwnProperty(key)) size++;
	}
	return size;
    };
}(window, document, undefined));