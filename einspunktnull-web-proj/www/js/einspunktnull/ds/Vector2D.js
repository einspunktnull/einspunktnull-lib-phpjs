/**
 * 
 * (c)2012 Albrecht Nitsche
 * 
 * www.einspunktnull.net
 */

;
(function(window)
{

    function Vector2D(x, y)
    {
	var _x = x != null ? x : 0;
	var _y = y != null ? y : 0;
	/*------------------------------------
	 * single
	 -----------------------------------*/
	this.clone = function()
	{
	    return new Vector2D(_x, _y);
	};

	this.perpendicular = function()
	{
	    return new Vector2D(-_y, _x);
	};

	this.isZero = function()
	{
	    return _x == 0 && _y == 0;
	};

	this.zero = function()
	{
	    _x = 0;
	    _y = 0;
	    return this;
	};

	this.normalize = function()
	{
	    var len = this.getLength();
	    if (len == 0)
	    {
		_x = 1.0;
		return this;
	    }
	    _x /= len;
	    _y /= len;
	    return this;
	};

	this.truncate = function(max)
	{
	    this.setLength(Math.min(max, this.getLength()));
	    return this;
	};

	this.reverse = function()
	{
	    _x = -_x;
	    _y = -_y;
	    return this;
	};

	this.isNormalized = function()
	{
	    return this.getLength() == 1.0;
	};

	/*------------------------------------
	 * relation
	 -----------------------------------*/
	Vector2D.angleBetween = function(v1, v2)
	{
	    if (!v1.isNormalized()) v1.clone().normalize();
	    if (!v2.isNormalized()) v2.clone().normalize();
	    return Math.acos(v1.dotProduct(v2));
	};

	this.dotProduct = function(v2)
	{
	    return _x * v2.getX() + _y * v2.getY();
	};

	this.sign = function(v2)
	{
	    return perpendicular.dotProduct(v2) < 0 ? -1 : 1;
	};

	this.distance = function(v2)
	{
	    return Math.sqrt(distanceSquared(v2));
	};

	this.distanceSquared = function(v2)
	{
	    var dx = v2.getX() - _x;
	    var dy = v2.getY() - _y;
	    return dx * dx + dy * dy;
	};

	this.add = function(v2)
	{
	    return new Vector2D(_x + v2.getX(), _y + v2.getY());
	};

	this.subtract = function(v2)
	{
	    return new Vector2D(_x - v2.getX(), _y - v2.getY());
	};

	this.multiply = function(value)
	{
	    return new Vector2D(_x * value, _y * value);
	};

	this.divide = function(value)
	{
	    return new Vector2D(_x / value, _y / value);
	};

	this.equals = function(v2)
	{
	    return _x == v2.x && _y == v2.y;
	};

	this.toString = function()
	{
	    return "Vetor2D (x:" + _x + ", y:" + _y + ")";
	};

	/*------------------------------------
	 * getter and setter
	 -----------------------------------*/

	this.setLength = function(length)
	{
	    var ang = this.getAngle();
	    _x = Math.cos(ang) * this.getLength();
	    _y = Math.sin(ang) * this.getLength();
	};

	this.getLength = function()
	{
	    return Math.sqrt(this.getLengthSquared());
	};

	this.getLengthSquared = function()
	{
	    return _x * _x + _y * _y;
	};

	this.getX = function()
	{
	    return _x;
	};

	this.getY = function()
	{
	    return _y;
	};

	this.setX = function()
	{
	    _x = x;
	};

	this.setY = function(y)
	{
	    _y = y;
	};

	this.setAngle = function(angle)
	{
	    var len = this.getlength();
	    _x = Math.cos(angle) * len;
	    _y = Math.sin(angle) * len;
	};

	this.getAngle = function()
	{
	    return Math.atan2(_y, _x);
	};

    }

    einspunktnull.Vector2D = Vector2D;

}(window));
