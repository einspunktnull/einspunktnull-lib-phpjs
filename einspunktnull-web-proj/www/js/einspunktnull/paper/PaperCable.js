/**
 * 
 * (c)2012 Albrecht Nitsche
 * 
 * www.einspunktnull.net
 */
;
(function(window, document, undefined)
{

    function PaperCable(canvas)
    {
	// BASE VARS
	var _canvas = canvas;
	var _width = _canvas.width;
	var _height = _canvas.height;
	var _render = false;

	// PHYSICS VARS
	var NODESNUM = 4;
	var TENSION = 9;
	var DAMP = .8;
	var GRAVITY = 4;
	var _nodes = [];

	// PAPER VARS
	var _hitOptions;
	var _mouseTool;
	var _background;
	var _cable;
	var _plug0;
	var _plug1;
	var _currItem;

	// LETS GO
	initPaper();
	addPaths();
	initPhysX();
	_render = true;

	function initPaper()
	{
	    paper.install(window);
	    paper.setup(_canvas);
	    view.onFrame = onFrame;
	    _hitOptions =
	    {
		segments : true,
		stroke : true,
		fill : true,
		tolerance : 5
	    }
	    _mouseTool = new Tool();
	    _mouseTool.onMouseDown = onMouseDown;
	    _mouseTool.onMouseDrag = onMouseDrag;
	}

	function addPaths()
	{
	    _background = new Path.Rectangle(0, 0, _width, _height);
	    _background.fillColor = '#EEEEEE';
	    _cable = new Path();
	    _plug0 = new Path.Circle(_width / 6, _height / 2, 10);
	    _plug0.fillColor = '#000000';
	    _plug1 = new Path.Circle(_width / 6 * 5, _height / 2, 10);
	    _plug1.fillColor = '#000000';
	}

	function initPhysX()
	{
	    var n = NODESNUM + 1;
	    var dx = (_plug1.position.x - _plug0.position.x) / n;
	    var dy = (_plug1.position.y - _plug0.position.y) / n;

	    var node;
	    var lastNode;

	    do
	    {
		n--;
		node =
		{
		    x : _plug0.position.x + dx * n,
		    y : _plug0.position.y + dy * n
		}
		if (n < NODESNUM)
		{
		    node.next = lastNode;
		    lastNode.prev = node;
		}
		else
		{
		    node.next =
		    {
			x : _plug1.position.x,
			y : _plug1.position.y
		    };
		}
		node.vx = node.vy = 0;
		lastNode = node;
		_nodes.push(node);
	    }
	    while (n > 0);

	    node.prev =
	    {
		x : _plug0.position.x,
		y : _plug0.position.y
	    };

	}

	function onMouseDown(event)
	{
	    _currItem = hittestItem(event);
	}

	function onMouseUp(event)
	{
	    _currItem = null;
	}

	function onMouseMove(event)
	{
	    project.activeLayer.selected = false;

	    var item = hittestItem();
	    if (item)
	    {
		item.selected = true;
	    }
	}

	function onMouseDrag(event)
	{
	    project.activeLayer.selected = false;
	    if (_currItem)
	    {
		_currItem.position.x += event.delta.x;
		_currItem.position.y += event.delta.y;

	    }
	}

	function hittestItem(event)
	{
	    var hitResult = project.hitTest(event.point, _hitOptions);
	    if (hitResult && hitResult.item != _background)
	    {
		return hitResult.item;
	    }
	    return null;
	};

	function onFrame()
	{
	    if (!_render) return;
	    var vx;
	    var vy;
	    var next;
	    var prev;
	    var node;
	    var n = _nodes.length;
	    var sumx = 0;
	    var sumy = 0;
	    do
	    {
		n--;
		node = _nodes[n];
		next = node.next;
		prev = node.prev;
		node.vx += (next.x + prev.x - node.x * 2) / TENSION;
		node.vy += (next.y + prev.y - node.y * 2) / TENSION;
		node.vy += GRAVITY;
		node.vx *= DAMP;
		node.vy *= DAMP;
		node.x += node.vx;
		node.y += node.vy;
		sumx += vx;
		sumy += vy;
	    }
	    while (n > 0);

	};

    }

    einspunktnull.PaperCable = PaperCable;

}(window, document, undefined));
