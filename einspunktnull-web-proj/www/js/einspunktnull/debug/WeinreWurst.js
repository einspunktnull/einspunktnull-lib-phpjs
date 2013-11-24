;( function(window, document, undefined)
{
	function WeinreWurst(id, host, port)
	{
		var userAgent = navigator.userAgent || navigator.vendor || window.opera;
		var isWebkit = RegExp(" AppleWebKit/").test(userAgent);
		if(!isWebkit)
		{
			return;
		}

		var _id = id || 'einspunktnull';
		var _host = host || 'debug.phonegap.com';
		var _port = port || 80;

		//Use weinre >>> set Weinre Id
		var enable = window.location.href.match(/(?:\?|&)weinre\=true/i) != null;
		if(enable)
		{
			var scriptEmbed = '<script type="text/javascript" src="http://' + _host + ':' + _port + '/target/target-script-min.js#' + _id + '"></script>';
			document.write(scriptEmbed);
			console.log('WEINRE DEBUGGING ENABLED');
		}

	}


	window.einspunktnull.WeinreWurst = WeinreWurst;

}(window, document, undefined));
