/**
 * 
 * (c)2012 Albrecht Nitsche
 * 
 * www.einspunktnull.net
 */

;
(function(window, document, undefined)
{

    window.einspunktnull.impor = function(pkgsClass)
    {
	var path = _einspunktnull.imp.basePath + pkgsClass.replace('.', '/') + '.js';
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = path;
	document.getElementsByTagName('head')[0].appendChild(script);
    };
    _einspunktnull.impor.basePath = './';

}(window, document, undefined));