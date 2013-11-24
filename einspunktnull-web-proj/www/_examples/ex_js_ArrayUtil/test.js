
function intersection()
{
    var val, arrayCount, firstArray, i, j, intersection = [], missing;
    var arrays = Array.prototype.slice.call(arguments); // Convert arguments

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
		if (!arrayContains(arrays[i], val))
		{
		    missing = true;
		    console.log(arrays[i], val, 'nö');
		}
	    }
	    if (!missing)
	    {
		intersection.push(val);
	    }
	}
    }
    return intersection;
}

 pimmel = einspunktnull.ArrayUtil.intersection( [1, {coool:"s"}, 3, "a"], [1, "a", {coool:"s"}], [{coool:"s"}, 1] );
//
//pimmel = _.intersection([ 1,
//{
//    coool : "s"
//}, 3, "a" ], [ 1, "a",
//{
//    coool : "s"
//} ], [
//{
//    coool : "s"
//}, 1 ]);

console.log(pimmel);
