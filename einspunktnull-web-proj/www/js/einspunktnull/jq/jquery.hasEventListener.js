/**
 * 
 * (c) 2012 Albrecht Nitsche
 * 
 * www.einspunktnull.net
 */

;
(function($, window, document)
{

    $.extend($.fn,
    {
	hasEventListener : function(evtType)
	{
	    $evts = this.data('events');
	    if ($evts && $evts[evtType] !== undefined && $evts[evtType].length > 0)
	    {
		return true;
	    }
	    return false;
	}
    });

})(jQuery, window, document);
