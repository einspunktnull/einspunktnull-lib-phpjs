/**
 *
 * (c)2012 Albrecht Nitsche
 *
 *  www.einspunktnull.net
 */

;( function($,window)
{
	function TableArray($table)
	{
		var _rows = this;
		var _$rows = $('tr', $table);
		_$rows.each(function(i) {
			var _cols = [];
			var $row = $(this);
			var $cols = $('td',$row);
			$cols.each(function(j){
				$col = $(this);
				_cols.push($col.text());
			});
			_rows.push(_cols);
		});

		this.getColAt = function(idx)
		{
			var ret = [];
			$(_rows).each(function(i){
				var row = this;
				ret.push(row[idx]);
			});
			return ret;
		};
		
		this.getCols = function()
		{
			var len = _rows[0].length;
			var ret = [];
			for (var i=0; i < len; i++) {

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
	einspunktnull.TableArray = TableArray;
}(jQuery,window));
