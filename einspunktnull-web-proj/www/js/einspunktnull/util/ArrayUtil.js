;
(function(window, document, undefined)
{
    var ArrayUtil = {};

    ArrayUtil.multiply = function(arrays)
    {
	var ret = [];
	var res = {};
	function multiply(arrs, lv)
	{
	    if (arrs.length == lv)
	    {
		var retPush = [];
		for ( var key in arrs)
		{
		    retPush.push(res[key]);
		}
		ret.push(retPush);
	    }
	    else
	    {
		for ( var key in arrs[lv])
		{
		    var val = arrs[lv][key];
		    res[lv] = val;
		    multiply(arrs, lv + 1);

		}
	    }
	}
	multiply(arrays, 0);
	return ret;
    };

    ArrayUtil.contains = function(arr, val)
    {
	var i = arr.length;
	while (i--)
	{
	    var curVal = arr[i];
	    if (curVal instanceof Object)
	    {
		if (einspunktnull.ObjectUtil.isEqual(curVal, val)) return true;
	    }
	    else
	    {
		if (arr[i] === val)
		{
		    return true;
		}
	    }
	}
	return false;
    };

    ArrayUtil.intersection = function(arrs)
    {
	var val, arrayCount, firstArr, i, j, intersection = [], missing;
	var arrays = arrs || Array.prototype.slice.call(arguments);

	firstArr = arrays.pop();
	if (firstArr)
	{
	    j = firstArr.length;
	    arrayCount = arrays.length;
	    while (j--)
	    {
		val = firstArr[j];
		missing = false;

		// Check val is present in each remaining array
		i = arrayCount;
		while (!missing && i--)
		{
//		    console.log('###',arrays[i], val,ArrayUtil.contains(arrays[i], val));
		    if (!ArrayUtil.contains(arrays[i], val))
		    {
			missing = true;
		    }
		}
		if (!missing)
		{
		    intersection.push(val);
		}
	    }
	}
	return intersection;
    };

    ArrayUtil.union = function(arrs)
    {
	var arrays = arrs || Array.prototype.slice.call(arguments);
	var a = arrays[0], b;
	for ( var i = 1; i < arrays.length; i++)
	{
	    b = arrays[i];
	    a = uniq(a, b);
	}
	return a;
    };

    function uniq(a, b)
    {
//	console.log('uniq a',a);
//	console.log('uniq b',b);
	for ( var nonDuplicates = [], i = 0, l = b.length; i < l; ++i)
	{
	    console.log(a,b[i],b.length,ArrayUtil.contains(a, b[i]));
	    if (!ArrayUtil.contains(a, b[i]))
	    {
		nonDuplicates.push(b[i]);
	    }
	}
	return a.concat(nonDuplicates);
    }
    
    if (!window.einspunktnull) window.einspunktnull = {};
    window.einspunktnull.ArrayUtil = ArrayUtil;

}(window, document, undefined));
