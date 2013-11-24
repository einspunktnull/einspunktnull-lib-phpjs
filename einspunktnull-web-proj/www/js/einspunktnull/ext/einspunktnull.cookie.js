/**
 * 
 * (c)2012 Albrecht Nitsche
 * 
 * www.einspunktnull.net
 */

;
(function(window, document, undefined)
{

    window.einspunktnull.setCookie = function(name, value, milliseconds)
    {
	var expires = '';
	if (milliseconds)
	{
	    var date = new Date();
	    date.setTime(date.getTime() + milliseconds);
	    expires = "; expires=" + date.toGMTString();
	}
	document.cookie = name + "=" + value + expires + "; path=/";
    };

    window.einspunktnull.getCookie = function(name)
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
    };

    window.einspunktnull.deleteCookie = function(name)
    {
	window.einspunktnull.setCookie(name, "", -1);
    };

}(window, document, undefined));