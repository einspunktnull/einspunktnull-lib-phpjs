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
	table2highchart : function(options)
	{

	    return this.each(forEachFct);

	    function forEachFct()
	    {

		// create HighChart config config Object
		var _conf =
		{
		    chart :
		    {
			animation : false
		    },
		    plotOptions :
		    {
			series :
			{
			    animation : false
			}
		    },
		    title : {},
		    xAxis : {},
		    series : []
		};

		// get the table as jQuery Object
		var _$table = $(this);
		// get it's "data-" attribute values
		var _data = _$table.data();

		// write chart type to config object
		_conf.chart.type = _data.type;
		_conf.title.text = _data.title;

		// get table values as two-dim array
		var _tableArray = new TableArray(_$table);

		// translate table values to chartconfig Array
		var firstCol = _tableArray.getColAt(0);
		_conf.xAxis.categories = firstCol.slice(1);
		var $firstRow = $(_tableArray[0].slice(1));
		$firstRow.each(function(i)
		{
		    var entry = new Object();
		    entry.name = this;
		    entry.data = [];
		    _conf.series.push(entry);
		});
		var $cols = $(_tableArray.getCols().slice(1));
		$cols.each(function(i)
		{
		    var $col = $(this.slice(1));
		    $col.each(function(j)
		    {
			var value = parseFloat(this);
			_conf.series[i].data.push(value);
		    });
		});

		// create highchart container div
		var $containerDiv = $('<div/>');
		$containerDiv.addClass('highchart-container');
		var µ_containerDiv = $containerDiv.get(0);
		_conf.chart.renderTo = µ_containerDiv;

		// replace table with chart's container div
		_$table.replaceWith($containerDiv);

		// create highchart and pass the modified config object
		var _hichart = new Highcharts.Chart(_conf);

	    }

	}
    });

})(jQuery, window, document);

(function($, window)
{
    function TableArray($table)
    {
	var _rows = this;
	var _$rows = $('tr', $table);
	_$rows.each(function(i)
	{
	    var _cols = [];
	    var $row = $(this);
	    var $cols = $('td', $row);
	    $cols.each(function(j)
	    {
		$col = $(this);
		_cols.push($col.text());
	    });
	    _rows.push(_cols);
	});

	this.getColAt = function(idx)
	{
	    var ret = [];
	    $(_rows).each(function(i)
	    {
		var row = this;
		ret.push(row[idx]);
	    });
	    return ret;
	};

	this.getCols = function()
	{
	    var len = _rows[0].length;
	    var ret = [];
	    for ( var i = 0; i < len; i++)
	    {

		var col = [];
		$(_rows).each(function(j)
		{
		    var row = this;
		    col.push(row[i]);
		});
		ret.push(col);
	    };
	    return ret;
	};
    }

    TableArray.prototype = new Array();
    window.TableArray = TableArray;
}(jQuery, window));
