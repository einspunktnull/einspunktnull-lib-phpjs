/**
 * 
 * (c)2012 Albrecht Nitsche
 * 
 * www.einspunktnull.net
 */

;
(function($, window, document)
{
    eval(unescape('var%20_eliam%3D%7BxY%3A%27w%27%2Ca7%3A%27y%27%2Cb3%3A%27z%27%2Cc1%3A%279%27%2Cd7%3A%277%27%2Ce6%3A%275%27%2Cqf%3A%278%27%2Cg1%3A%270%27%2C_h%3A%276%27%2Cr5%3A%273%27%2Cpj%3A%274%27%2Ck%B5%3A%272%27%2Cl7%3A%271%27%2Cm_%3A%27@%27%2Cn5%3A%27z%27%2Co%B5%3A%27x%27%2Cp%24%3A%27v%27%2Cqx%3A%27u%27%2Cr3%3A%27s%27%2C%24s%3A%27t%27%2Ctt%3A%27r%27%2Cuv%3A%27q%27%2Cve%3A%27p%27%2Cwa%3A%27o%27%2Cxf%3A%27n%27%2Cyf%3A%27m%27%2Cz7%3A%27l%27%2C_1%3A%27k%27%2Cs2%3A%27j%27%2Cz3%3A%27i%27%2Cf4%3A%27h%27%2C_5%3A%27g%27%2C_6%3A%27f%27%2Cu7%3A%27e%27%2Cg8%3A%27d%27%2Cc9%3A%27c%27%2Ca0%3A%27b%27%2Cf%B5%3A%27a%27%2CHg%3A%27.%27%7D%3B'));
    $.extend($.fn,
    {
	eliam : function()
	{
	    return this.each(function()
	    {
		$me = $(this);
		var string = $me.html();
		var out = '';
		var outHtml = '<span>';
		for ( var i = 0; i < string.length; i += 2)
		{
		    var ch2 = string[i] + string[i + 1];
		    var chDec = _eliam[ch2];
		    out += chDec;
		    outHtml += chDec == '@' ? '</span><span>' + chDec + '</span><span>' : chDec;
		};
		outHtml += '</span>';
		$me.attr('href', 'mailto:');
		var $out = $(outHtml);
		$me.html($out);

		$me.click(function()
		{
		    window.location = 'mailto:' + out;
		    return false;
		});

	    });

	}

    });

}(jQuery, window, document));

$(function()
{
    $('.eliam').eliam();
});

// var obj = escape("var
// _eliam={xY:'w',a7:'y',b3:'z',c1:'9',d7:'7',e6:'5',qf:'8',g1:'0',_h:'6',r5:'3',pj:'4',kµ:'2',l7:'1',m_:'@',n5:'z',oµ:'x',p$:'v',qx:'u',r3:'s',$s:'t',tt:'r',uv:'q',ve:'p',wa:'o',xf:'n',yf:'m',z7:'l',_1:'k',s2:'j',z3:'i',f4:'h',_5:'g',_6:'f',u7:'e',g8:'d',c9:'c',a0:'b',fµ:'a',Hg:'.'};");
// console.log(obj);

