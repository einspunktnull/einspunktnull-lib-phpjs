/**
 * 
 * (c)2012 Albrecht Nitsche
 * 
 * www.einspunktnull.net
 */

;
(function(window)
{

    function Vehicle(ctx2d)
    {

	var WRAP = "wrap";
	var BOUNCE = "bounce";
	var _ctx = ctx2d;

	var _rotation = 0;
	var _x = 0;
	var _y = 0;

	var _maxSpeed = 10;
	var _mass = 1.0;
	var _edgeBehaviour = WRAP;

	var _position = new Vector2D();
	var _velocity = new Vector2D();

	this.update = function()
	{
	    _velocity.truncate(_maxSpeed);
	    _position = _position.add(_velocity);

	    if (_edgeBehaviour == WRAP)
	    {
		wrap();
	    }
	    else if (_edgeBehavior == BOUNCE)
	    {
		bounce();
	    }
	    _x = position.getX();
	    _y = position.getY();

	    // rotate heading to match velocity
	    _rotation = _velocity.getAngle() * 180 / Math.PI;
	};

	this.setPosition = function(position)
	{
	    _position = position;
	    _x = position.getX();
	    _y = position.getY();
	};

    }

    window.Vehicle = Vehicle;

}(window));
