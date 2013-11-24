/**
 * 
 * (c)2012 Albrecht Nitsche
 * 
 * www.einspunktnull.net
 */

;
(function(window, document, undefined)
{
    function Mathe()
    {
    }

    Mathe.rad2deg = function(angleRad)
    {
	return angleRad / Math.PI * 180;
    };

    Mathe.deg2rad = function(angleDeg)
    {
	return angleDeg * Math.PI / 180;
    };

    einspunktnull.Mathe = Mathe;
}(window, document, undefined));
