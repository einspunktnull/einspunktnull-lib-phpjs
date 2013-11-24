

(function($, window, documnet, undefined)
{
    function Color(input)
    {
	// declare variables
	var rgba = [], result;

	// rgba
	result = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/.exec(input);
	if (result)
	{
	    rgba = [ pInt(result[1]), pInt(result[2]), pInt(result[3]), parseFloat(result[4], 10) ];
	}
	else
	{ // hex
	    result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(input);
	    if (result)
	    {
		rgba = [ pInt(result[1], 16), pInt(result[2], 16), pInt(result[3], 16), 1 ];
	    }
	}

	function pInt(s, mag)
	{
	    return parseInt(s, mag || 10);
	}

	function isNumber(n)
	{
	    return typeof n === 'number';
	}

	/***********************************************************************
	 * public Methods
	 **********************************************************************/
	this.get = function(format)
	{
	    var ret;

	    // it's NaN if gradient colors on a column chart
	    if (rgba && !isNaN(rgba[0]))
	    {
		if (format === 'rgb')
		{
		    ret = 'rgb(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + ')';
		}
		else if (format === 'a')
		{
		    ret = rgba[3];
		}
		else
		{
		    ret = 'rgba(' + rgba.join(',') + ')';
		}
	    }
	    else
	    {
		ret = input;
	    }
	    return ret;
	};

	this.brighten = function(alpha)
	{
	    if (isNumber(alpha) && alpha !== 0)
	    {
		var i;
		for (i = 0; i < 3; i++)
		{
		    rgba[i] += pInt(alpha * 255);

		    if (rgba[i] < 0)
		    {
			rgba[i] = 0;
		    }
		    if (rgba[i] > 255)
		    {
			rgba[i] = 255;
		    }
		}
	    }
	    return this;
	};

	this.setOpacity = function(alpha)
	{
	    rgba[3] = alpha;
	    return this;
	};

    };
    einspunktnull.Color = Color;
    
    function gradient(col)
    {
        var col1 = new Color(col);
        var col2 = new Color(col);
        col1.brighten(0.1);

        var ret =
        {
    	linearGradient :
    	{
    	    y1 : 1,
    	    y2 : 0
    	},
    	stops : [ [ 0, col2.get() ], [ 1, col1.get() ] ]
        };
        return ret;
    };
    einspunktnull.gradient = gradient;

    
    

}(jQuery, window, document, undefined));
