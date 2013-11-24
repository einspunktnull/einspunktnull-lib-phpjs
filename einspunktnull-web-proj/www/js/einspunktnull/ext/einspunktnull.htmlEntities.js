/**
 * 
 * (c)2012 Albrecht Nitsche
 * 
 * www.einspunktnull.net
 */

;
(function(window, document, undefined)
{

    window.einspunktnull.htmlEntitiesEncode = function(str)
    {
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/&nbsp;/g, " ");
    };
    window.einspunktnull.htmlEntitiesDecode = function(str)
    {
	return String(str).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
    };
}(window, document, undefined));