/**
 * 
 * (c)2012 Albrecht Nitsche
 * 
 * www.einspunktnull.net
 */

;
(function(window, document, undefined)
{

    function Timer(delay, repeatCount)
    {

	var _TIMER = 'timer';
	var _TIMER_COMPLETE = 'timerComplete';

	var _delay = delay || 0;
	var _repeatCount = repeatCount;
	var _currCount = 0;
	var _running = false;
	var _listeners = [];
	var _interval = null;

	this.addEventListener = function()
	{
	    var args = Array.prototype.slice.call(arguments);
	    var type = args.shift();
	    var handler = args.shift();

	    var el =
	    {
		type : type,
		handler : handler,
		args : args
	    };

	    _listeners.push(el);
	};

	this.start = function()
	{
	    _running = true;
	    _interval = setInterval(onInterval, _delay);
	};

	function onInterval()
	{
	    // Timer
	    if (_delay > 0) _currCount++;
	    var stop = false;
	    if (_currCount >= _repeatCount)
	    {
		clearInterval(_interval);
		_interval = null;
		stop = true;
		_running = false;
	    }
	    for ( var key in _listeners)
	    {
		var el = _listeners[key];
		switch (el.type)
		{
		    case _TIMER:
			appli(el.handler, el.args);
			break;
		    case _TIMER_COMPLETE:
			if (stop) appli(el.handler, el.args);
			break;

		}

	    }

	    function appli(fct, args)
	    {
		fct.apply(null, args);
	    }
	}

	/*
	 * GETTER / SETTER
	 */

	this.isRunning = function()
	{
	    return _running;
	};

	this.setDelay = function(delay)
	{
	    _delay = delay;
	};

	this.getDelay = function(delay)
	{
	    return _delay;
	};

	this.setRepeatCount = function(repeatCount)
	{
	    _repeatCount = repeatCount;
	};

	this.getRepeatCount = function()
	{
	    return _repeatCount;
	};

    }

    einspunktnull.Timer = Timer;

}(window, document, undefined));