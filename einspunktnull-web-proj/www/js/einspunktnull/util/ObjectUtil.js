;
(function(window, document, undefined)
{
    var ObjectUtil = {};

    ObjectUtil.isFalsy = function(obj)
    {
	if (obj === undefined)
	{
	    return true;
	}
	if (obj == null)
	{
	    return true;
	}
	if (obj === false)
	{
	    return true;
	}
	if (typeof (obj) === 'string')
	{
	    if (obj === '' || obj === ' ')
	    {
		return true;
	    }
	}
	// else if (typeof (obj) === 'number')
	// {
	// if (obj == 0)
	// {
	// return true;
	// }
	// }
	// else if (obj !== obj)
	// {
	// // `NaN` is the only value for which `===` is not reflexive.
	// return true;
	//
	// }
	return false;
	return false;
    };

    ObjectUtil.hasProp = function(obj, propName)
    {
	var prop = ObjectUtil.getProp(obj, propName);
	return prop !== undefined;
    };

    ObjectUtil.getProp = function(obj, propName)
    {
	var propNameArr = propName.split('.');
	return rGet(obj, propNameArr);
    };

    ObjectUtil.transpose = function(obj)
    {
	if (obj instanceof Array)
	{
	    var ret = {};
	    for ( var key in obj[0])
	    {
		var vals = [];
		for ( var k = 0; k < obj.length; k++)
		{
		    vals.push(obj[k][key]);
		}
		ret[key] = vals;
	    }
	    return ret;
	}
	else if (obj instanceof Object)
	{
	    var valLen = getValueLength(obj);
	    var ret = [];
	    for ( var i = 0; i < valLen; i++)
	    {
		var o = {};
		for ( var key in obj)
		{
		    o[key] = obj[key][i];
		}
		ret.push(o);
	    }
	    return ret;
	}
	else return null;

	function getValueLength(obj)
	{
	    for ( var key in obj)
	    {
		var val = obj[key];
		if (val instanceof Array)
		{
		    return val.length;
		}
		else
		{
		    return null;
		}
	    }
	    return null;
	}

    };

    ObjectUtil.copyData = function(obj, propName)
    {
	var propNameArr = propName.split('.');
	rSet(obj, propNameArr);
    };

    ObjectUtil.isEqual = function(a, b)
    {
	return eq(a, b, []);
    };

    ObjectUtil.has = function(obj, key)
    {
	return hasOwnProperty.call(obj, key);
    };

    function eq(a, b, stack)
    {
	if (a === b) return a !== 0 || 1 / a == 1 / b;
	if (a == null || b == null) return a === b;
	var className = toString.call(a);
	if (className != toString.call(b)) return false;
	switch (className)
	{
	    // Strings, numbers, dates, and booleans are compared by value.
	    case '[object String]':
		return a == String(b);
	    case '[object Number]':
		return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
	    case '[object Date]':
	    case '[object Boolean]':
		return +a == +b;
	    case '[object RegExp]':
		return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
	}
	if (typeof a != 'object' || typeof b != 'object') return false;
	var length = stack.length;
	while (length--)
	{
	    if (stack[length] == a) return true;
	}
	stack.push(a);
	var size = 0, result = true;
	if (className == '[object Array]')
	{
	    size = a.length;
	    result = size == b.length;
	    if (result)
	    {
		while (size--)
		{
		    if (!(result = size in a == size in b && eq(a[size], b[size], stack))) break;
		}
	    }
	}
	else
	{
	    if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) return false;
	    for ( var key in a)
	    {
		if (einspunktnull.ObjectUtil.has(a, key))
		{
		    size++;
		    if (!(result = einspunktnull.ObjectUtil.has(b, key) && eq(a[key], b[key], stack))) break;
		}
	    }
	    if (result)
	    {
		for (key in b)
		{
		    if (einspunktnull.ObjectUtil.has(b, key) && !(size--)) break;
		}
		result = !size;
	    }
	}
	stack.pop();
	return result;
    }

    function rGet(obj, propNameArr)
    {
	var name = propNameArr[0];
	if (obj.hasOwnProperty(name))
	{
	    if (propNameArr.length > 1)
	    {
		propNameArr.shift();
		return rGet(obj[name], propNameArr);
	    }
	    else
	    {
		return obj[name];
	    }
	}
	else
	{
	    return undefined;
	}
    }

    if (!window.einspunktnull) window.einspunktnull = {};
    window.einspunktnull.ObjectUtil = ObjectUtil;

}(window, document, undefined));