/**
 * 
 * (c)2012 Albrecht Nitsche
 * 
 * www.einspunktnull.net
 */

;
(function(window, document, undefined)
{

    LocalJsonDataBase.ERROR_MSG_PARSE_ERROR = 'ParseError: Invalid SQL-Query';
    LocalJsonDataBase.ERROR_MSG_NO_VALID_QUERY_TYPE = 'QueryError: Invalid Query Type';
    function LocalJsonDataBase(dbName, dbObj)
    {
	/***********************************************************************
	 * SETUP
	 **********************************************************************/
	var PREFIX = 'ljdb_';
	var _ljson = new einspunktnull.LocalJson();
	var _name = PREFIX + dbName;
	var _db = dbObj || {};

	/***********************************************************************
	 * INIT
	 **********************************************************************/
	if (_ljson.has(_name))
	{
	    load();
	}
	else
	{
	    save();
	}

	/***********************************************************************
	 * PUBLIC
	 **********************************************************************/

	this.querySelectFromWhere = function(select, from, where)
	{
	    var query = 'SELECT ' + select;
	    query += ' FROM ' + from;
	    query += where ? ' WHERE ' + where : '';
	    this.query(query);
	};

	this.query = function(query)
	{
	    var quNode = new QNode();
	    quNode.text = query;
	    try
	    {
		parseQuery(quNode);
	    }
	    catch (e)
	    {
		throw new Error(LocalJsonDataBase.ERROR_MSG_PARSE_ERROR);
		return null;
	    }
	    quNode.value = executeQuery(quNode);
	    return quNode.value;
	};

	/***********************************************************************
	 * PARSE QUERY
	 **********************************************************************/
	function parseQuery(pNode)
	{

	    // SELECT ... FROM ... WHERE ...
	    var regexSelectQuery1 = /\s*select[\s]+(.+)\s+from\s+([a-z0-9,_ ]*) where (.*)/i;
	    var regexSelectQuery2 = /\s*select[\s]+(.+)\s+from\s+([a-z0-9,_ ]*)/i;
	    var txt = pNode.text;
	    var matchSelectQuery1 = regexSelectQuery1.exec(txt);
	    var matchSelectQuery2 = regexSelectQuery2.exec(txt);
	    if (matchSelectQuery1) parseSelectQuery(pNode, matchSelectQuery1);
	    else if (matchSelectQuery2) parseSelectQuery(pNode, matchSelectQuery2);
	    else
	    {
		throw new Error(LocalJsonDataBase.ERROR_MSG_PARSE_ERROR);
		return null;
	    }
	}

	/*********************************************************************** 
	 * PARSE QUERY - SELECT
	 **********************************************************************/
	function parseSelectQuery(pNode, matchSelectQuery)
	{
	    pNode.type = QNode.TYPE_QUERY_SELECT;

	    // SELECT ...
	    var cNodeSelect = new QNode();
	    cNodeSelect.type = QNode.TYPE_CLAUSE_SELECT;
	    cNodeSelect.text = matchSelectQuery[1];
	    cNodeSelect.parent = pNode;
	    pNode.children.push(cNodeSelect);
	    var ccNodeSelect = new QNode();
	    ccNodeSelect.text = cNodeSelect.text;
	    ccNodeSelect.parent = cNodeSelect;
	    cNodeSelect.children.push(ccNodeSelect);
	    ccNodeSelect.type = QNode.TYPE_VALUE_UNKNOWN;
	    parseSelect(ccNodeSelect);

	    // FROM ...
	    var cNodeFrom = new QNode();
	    cNodeFrom.type = QNode.TYPE_CLAUSE_FROM;
	    cNodeFrom.text = matchSelectQuery[2];
	    cNodeFrom.parent = pNode;
	    pNode.children.push(cNodeFrom);
	    var ccNodeFrom = new QNode();
	    ccNodeFrom.text = cNodeFrom.text;
	    ccNodeFrom.parent = cNodeFrom;
	    cNodeFrom.children.push(ccNodeFrom);
	    ccNodeFrom.type = QNode.TYPE_VALUE_UNKNOWN;
	    parseFrom(ccNodeFrom);

	    // WHERE ...

	    var cNodeWhere = new QNode();
	    cNodeWhere.type = QNode.TYPE_CLAUSE_WHERE;
	    if (matchSelectQuery[3])
	    {
		cNodeWhere.text = matchSelectQuery[3];
	    }
	    else
	    {
		cNodeWhere.text = '';
	    }
	    cNodeWhere.parent = pNode;
	    pNode.children.push(cNodeWhere);
	    var ccNodeWhere = new QNode();
	    ccNodeWhere.text = cNodeWhere.text;
	    ccNodeWhere.parent = cNodeWhere;
	    cNodeWhere.children.push(ccNodeWhere);
	    parseWhere(ccNodeWhere, 0);
	}

	/***********************************************************************
	 * PARSE QUERY - SELECT - FROM CLAUSE
	 **********************************************************************/
	function parseFrom(pNode)
	{
	    pNode.type = QNode.TYPE_VALUE_LIST;
	    var txt = pNode.text;
	    txt = txt.toString().replace(/[\s\t\r\n]+/g, "");
	    var tables = txt.split(/,/g);
	    for ( var i = 0; i < tables.length; i++)
	    {
		var table = tables[i];
		var cNode = new QNode();
		cNode.type = QNode.TYPE_VALUE_TABLE;
		cNode.text = table;
		cNode.parent = pNode;
		pNode.children.push(cNode);
	    }
	}

	/***********************************************************************
	 * PARSE QUERY - SELECT - SELECT CLAUSE
	 **********************************************************************/
	function parseSelect(pNode)
	{
	    pNode.type = QNode.TYPE_VALUE_LIST;
	    var txt = pNode.text;
	    txt = txt.toString().replace(/[\s\t\r\n]+/g, "");
	    var tableCols = txt.split(/,/g);
	    for ( var i = 0; i < tableCols.length; i++)
	    {
		var col = tableCols[i];
		var cNode = new QNode();
		cNode.type = QNode.TYPE_VALUE_TABLE_COL;
		cNode.text = col;
		cNode.parent = pNode;
		pNode.children.push(cNode);
	    }
	}

	/***********************************************************************
	 * PARSE QUERY - SELECT - WHERE CLAUSE
	 **********************************************************************/
	var _parseFilters = [
	{
	    // ... NOT ...
	    type : QNode.TYPE_OP_LOGIC_NOT,
	    regex : /\s+not\s+/i
	},
	{
	    // ... ORT ...
	    type : QNode.TYPE_OP_LOGIC_OR,
	    regex : /\s+or\s+/i
	},
	{
	    // ... AND ...
	    type : QNode.TYPE_OP_LOGIC_AND,
	    regex : /\s+and\s+/i
	},
	{
	    // ... != ...
	    type : QNode.TYPE_OP_EQUALITY_NOTEQUAL,
	    regex : /\s*!=\s*/gi
	},
	{
	    // ... < ...
	    type : QNode.TYPE_OP_EQUALITY_LESS,
	    regex : /\s*<(?!=)\s*/gi
	},
	{
	    // ... <= ...
	    type : QNode.TYPE_OP_EQUALITY_LESSEQUAL,
	    regex : /\s*<=\s*/gi
	},
	{
	    // ... > ...
	    type : QNode.TYPE_OP_EQUALITY_GREATER,
	    regex : /\s*>(?!=)\s*/gi
	},
	{
	    // ... >= ...
	    type : QNode.TYPE_OP_EQUALITY_GREATEREQUAL,
	    regex : /\s*>=\s*/gi
	},
	{
	    // ... = ... / ... IS ...
	    type : QNode.TYPE_OP_EQUALITY_EQUAL,
	    regex : /\s*=\s*/gi
	},
	{
	    // ... + ...
	    type : QNode.TYPE_OP_MATH_ADD,
	    regex : /\s*\+\s*/gi
	},
	{
	    // ... - ...
	    type : QNode.TYPE_OP_MATH_SUBTRACT,
	    regex : /\s*-\s*/gi
	},
	{
	    // ... * ...
	    type : QNode.TYPE_OP_MATH_MULTIPLY,
	    regex : /\s*\*\s*/gi
	},
	{
	    // ... / ...
	    type : QNode.TYPE_OP_MATH_DIVIDE,
	    regex : /\s*\/\s*/gi
	},
	{
	    // ... % ...
	    type : QNode.TYPE_OP_MATH_MODULO,
	    regex : /\s*%\s*/gi
	},
	{
	    // "..." / '...'
	    type : QNode.TYPE_VALUE_STRING,
	    regex : /'([^']*)'|"([^"]*)"/gi
	},
	{
	    // 1 / 1.234
	    type : QNode.TYPE_VALUE_NUMBER,
	    regex : /\s*[\d]+(\.[\d]+)?\s*/gi
	},
	{
	    // table.key
	    type : QNode.TYPE_VALUE_TABLE_COL,
	    regex : /\s*[a-z_][a-z\d_]*\.[a-z_][a-z\d_]*\s*/gi
	},
	{
	    type : QNode.TYPE_VALUE_UNKNOWN,
	    regex : /[\s\S]*/i,
	    stop : true
	} ];

	function parseWhere(pNode, depth)
	{
	    // READY???
	    var filter = _parseFilters[depth];
	    var type = filter.type;
	    if (filter.stop)
	    {
		pNode.type = type;
		return;
	    }
	    // LETS GO
	    var regex = filter.regex;
	    var txt = pNode.text;
	    // PARANTHESIS
	    var matchesParanthesis = [];
	    var regexParanthesis = /\(((?:[^\(\)]|\((?:[^\(\)]|\((?:[^\(\)]|\((?:[^\(\)])*\))*\))*\))*)\)/gi;
	    var replacer = '###';
	    do
	    {
		var match = regexParanthesis.exec(txt);
		if (match)
		{
		    matchesParanthesis.push(match[1]);
		}
	    }
	    while (match != null)
	    txt = txt.replace(regexParanthesis, replacer);
	    var res = txt.split(regex);
	    for ( var i = 0; i < res.length; i++)
	    {
		var result = res[i];
		if (result == replacer)
		{
		    res[i] = matchesParanthesis.shift();
		}
		else if (result && result.indexOf(replacer) > -1)
		{
		    res[i] = result.replace(replacer, '(' + matchesParanthesis.shift() + ')');
		}
	    }
	    // DECISION
	    if (res.length > 1)
	    {
		pNode.type = type;
		if (!type || type == QNode.TYPE_VALUE_STRING || type == QNode.TYPE_VALUE_NUMBER || type == QNode.TYPE_VALUE_TABLE_COL || type == QNode.TYPE_VALUE_TABLE || type == QNode.TYPE_VALUE_UNKNOWN)
		{
		    return;
		}
		for ( var i = 0; i < res.length; i++)
		{
		    var cNode = new QNode();
		    cNode.text = res[i];
		    cNode.parent = pNode;
		    pNode.children.push(cNode);
		    parseWhere(cNode, 0);
		}
	    }
	    else
	    {
		parseWhere(pNode, depth + 1);
	    }
	}

	/***********************************************************************
	 * EXECUTE QUERY
	 **********************************************************************/
	function executeQuery(quNode)
	{
	    switch (quNode.type)
	    {
		case QNode.TYPE_QUERY_SELECT:
		    return executeSelectQuery(quNode);
		    break;
		default:
		    throw new Error(LocalJsonDataBase.ERROR_MSG_NO_VALID_QUERY_TYPE);
		    return null;
		    break;
	    }
	}

	/***********************************************************************
	 * EXECUTE QUERY - SELECT
	 **********************************************************************/
	function executeSelectQuery(node)
	{
	    var nodeFrom = node.getChildByType(QNode.TYPE_CLAUSE_FROM)[0];
	    var nodeSelect = node.getChildByType(QNode.TYPE_CLAUSE_SELECT)[0];
	    var nodeWhereClause = node.getChildByType(QNode.TYPE_CLAUSE_WHERE)[0];

	    // FROM
	    var resFrom = executeFrom(nodeFrom);
	    // WHERE
	    var nodeWhere = nodeWhereClause.children[0];
	    var resWhere = executeWhere(nodeWhere, resFrom);
	    nodeWhereClause.value = resWhere;
	    // SELECT
	    var resSelect = executeSelect(nodeSelect, resWhere);
	    return resSelect;
	}

	/***********************************************************************
	 * EXECUTE QUERY - SELECT - FROM CLAUSE
	 **********************************************************************/
	function executeFrom(nodeFrom)
	{
	    var nodeList = nodeFrom.children[0];
	    nodeList.value = {};
	    nodeList.children.forEach(function(cNode)
	    {
		cNode.value = _db[cNode.text];
		nodeList.value[cNode.text] = cNode.value;
	    });

	    nodeFrom.value = multiplyTables(nodeList.value);
	    return nodeFrom.value;
	}

	/***********************************************************************
	 * EXECUTE QUERY - SELECT - SELECT CLAUSE
	 **********************************************************************/
	function executeSelect(nodeSelect, resWhere)
	{
	    var nodeList = nodeSelect.children[0];
	    if (nodeList.text == '*')
	    {
		nodeList.value = resWhere;
	    }
	    else
	    {
		nodeList.value = {};
		nodeList.children.forEach(function(cNode)
		{
		    cNode.value = {};
		    cNode.value[cNode.text] = resWhere[cNode.text];
		    nodeList.value[cNode.text] = resWhere[cNode.text];
		});
	    }
	    nodeSelect.value = nodeList.value;
	    return nodeSelect.value;
	}

	/***********************************************************************
	 * EXECUTE QUERY - SELECT - WHERE CLAUSE
	 **********************************************************************/
	function executeWhere(node, resFrom)
	{

	    if (node.text !== '')
	    {
		switch (node.type)
		{
		    case QNode.TYPE_VALUE_NUMBER:
			return executeValueNumber(node);
			break;
		    case QNode.TYPE_VALUE_STRING:
			return executeValueString(node);
			break;
		    case QNode.TYPE_VALUE_TABLE_COL:
			return executeValueTableCol(node, resFrom);
			break;
		    case QNode.TYPE_VALUE_UNKNOWN:
			return executeValueUnknown(node);
			break;
		    case QNode.TYPE_OP_LOGIC_AND:
			return executeOp(node, '&&', resFrom);
			break;
		    case QNode.TYPE_OP_LOGIC_OR:
			return executeOp(node, '||', resFrom);
			break;
		    case QNode.TYPE_OP_LOGIC_NOT:
			return executeOp(node, '!', resFrom);
			break;
		    case QNode.TYPE_OP_EQUALITY_EQUAL:
			return executeOp(node, '==', resFrom);
			break;
		    case QNode.TYPE_OP_MATH_ADD:
			return executeOp(node, '+', resFrom);
			break;
		    case QNode.TYPE_OP_MATH_SUBTRACT:
			return executeOp(node, '-', resFrom);
			break;
		    case QNode.TYPE_OP_MATH_MULTIPLY:
			return executeOp(node, '*', resFrom);
			break;
		    case QNode.TYPE_OP_MATH_DIVIDE:
			return executeOp(node, '/', resFrom);
			break;
		    case QNode.TYPE_OP_MATH_MODULO:
			return executeOp(node, '%', resFrom);
			break;
		    case QNode.TYPE_OP_EQUALITY_NOTEQUAL:
			return executeOp(node, '!=', resFrom);
			break;
		    case QNode.TYPE_OP_EQUALITY_LESS:
			return executeOp(node, '<', resFrom);
			break;
		    case QNode.TYPE_OP_EQUALITY_LESSEQUAL:
			return executeOp(node, '<=', resFrom);
			break;
		    case QNode.TYPE_OP_EQUALITY_GREATER:
			return executeOp(node, '>', resFrom);
			break;
		    case QNode.TYPE_OP_EQUALITY_GREATEREQUAL:
			return executeOp(node, '>=', resFrom);
			break;
		}
	    }
	    else
	    {
		node.value = resFrom;
		return node.value;
	    }
	}

	/***********************************************************************
	 * EXECUTE QUERY - SELECT - WHERE CLAUSE - VALUE NUMBER
	 **********************************************************************/
	function executeValueNumber(node)
	{
	    node.value = Number(node.text);
	    return node.value;
	}

	/***********************************************************************
	 * EXECUTE QUERY - SELECT - WHERE CLAUSE - VALUE STRING
	 **********************************************************************/
	function executeValueString(node)
	{
	    var txt = node.text;
	    txt = txt.replace(/'/g, "");
	    txt = txt.replace(/"/g, '');
	    node.value = txt;
	    return node.value;
	}

	/***********************************************************************
	 * EXECUTE QUERY - SELECT - WHERE CLAUSE - TABLE COLUMN
	 **********************************************************************/
	function executeValueTableCol(node, resFrom)
	{
	    node.value = resFrom[node.text];
	    return node.value;
	}

	/***********************************************************************
	 * EXECUTE QUERY - SELECT - WHERE CLAUSE - VALUE UNKNOWN
	 **********************************************************************/
	function executeValueUnknown(node)
	{
	    node.value = node.text;
	    return node.value;
	}

	/***********************************************************************
	 * EXECUTE QUERY - SELECT - WHERE CLAUSE - VALUE OPERATOR
	 **********************************************************************/
	function executeOp(node, op, resFrom)
	{
	    if (node.isComplex()) return executeOpTableCol(node, op, resFrom);
	    return executeOpSimple(node, op, resFrom);
	}

	function executeOpTableCol(node, op, resFrom)
	{
	    switch (op)
	    {
		case '!':
		case '&&':
		case '||':
		    return executeOpTableColLogic(node, op, resFrom);
		    break;
		default:
		    return executeOpTableColMathOrEq(node, op, resFrom);
		    break;
	    }

	}

	function executeOpTableColLogic(node, op, resFrom)
	{
	    var children = node.children;
	    var childArrs = [];
	    for ( var cK in children)
	    {
		var val = executeWhere(children[cK], resFrom);
		childArrs.push(einspunktnull.ObjectUtil.transpose(val));
	    }
	    var ret = null;
	    switch (op)
	    {
		case '&&':
		    ret = einspunktnull.ArrayUtil.intersection(childArrs);
		    break;
		case '||':
		    ret = einspunktnull.ArrayUtil.union(childArrs);
		    break;
		case '!':
		    break;
	    }
	    ret = einspunktnull.ObjectUtil.transpose(ret);
	    return ret;
	}

	function executeOpTableColMathOrEq(node, op, resFrom)
	{
	    var evalString = '';
	    var children = node.children;
	    var from = einspunktnull.ObjectUtil.transpose(resFrom);
	    for ( var cK in children)
	    {
		executeWhere(children[cK], resFrom);
	    }

	    var ret = [];
	    for ( var k in from)
	    {
		var row = from[k];
		evalString = '';
		for ( var ky in children)
		{
		    var child = children[ky];
		    var val = child.type == QNode.TYPE_VALUE_TABLE_COL ? child.value[k] : child.value;
		    if (typeof val == 'string') val = '"' + val + '"';
		    evalString += ky == 0 ? '' : op;
		    evalString += val;
		}
		if (evaluate(evalString))
		{
		    ret.push(row);
		}
	    }
	    ret = einspunktnull.ObjectUtil.transpose(ret);
	    node.value = ret;
	    return node.value;
	}

	function executeOpSimple(node, op, resFrom)
	{
	    var evalString = '';
	    var children = node.children;
	    for ( var i = 0; i < children.length; i++)
	    {
		var child = children[i];
		var val = executeWhere(child, resFrom);
		if (typeof val == 'string') val = '"' + val + '"';
		evalString += i == 0 ? '' : op;
		evalString += val;
	    }
	    // console.log(node, evalString);
	    node.value = evaluate(evalString);
	    return node.value;
	}

	/***********************************************************************
	 * HELPER
	 **********************************************************************/

	function evaluate(string)
	{
	    string = string.replace(/--/g, '+');

	    var evalr = null;
	    try
	    {
		evalr = eval(string);
	    }
	    catch (e)
	    {
		console.log(e);
	    }
	    // console.log(string, evalr);
	    return evalr;
	};

	function multiplyTables(parent)
	{
	    var tmp = [];
	    var pKeys = [];
	    for ( var pKey in parent)
	    {
		var child = parent[pKey];
		var transposed = einspunktnull.ObjectUtil.transpose(child);
		tmp.push(transposed);
		pKeys.push(pKey);
	    }
	    var multiplied = einspunktnull.ArrayUtil.multiply(tmp);
	    tmp = [];
	    for ( var pK in multiplied)
	    {
		var o = {};
		var objArr = multiplied[pK];
		for ( var cKey in objArr)
		{
		    var obj = objArr[cKey];
		    for ( var oKey in obj)
		    {
			o[pKeys[cKey] + '.' + oKey] = obj[oKey];
		    }
		}
		tmp.push(o);
	    }
	    return einspunktnull.ObjectUtil.transpose(tmp);
	}

	/***********************************************************************
	 * BASE
	 **********************************************************************/
	function save()
	{
	    _ljson.set(_name, _db);
	}

	function load()
	{
	    _db = _ljson.get(_name);
	}
    }

    /***************************************************************************
     * QNODE
     **************************************************************************/
    // QUERY
    QNode.TYPE_QUERY_SELECT = 'TYPE_QUERY_SELECT';
    QNode.TYPE_CLAUSE_SELECT = 'TYPE_CLAUSE_SELECT';
    QNode.TYPE_CLAUSE_FROM = 'TYPE_CLAUSE_FROM';
    QNode.TYPE_CLAUSE_WHERE = 'TYPE_CLAUSE_WHERE';

    // OPERATORS LOGIC
    QNode.TYPE_OP_LOGIC_NOT = 'TYPE_OP_LOGIC_NOT';
    QNode.TYPE_OP_LOGIC_OR = 'TYPE_OP_LOGIC_OR';
    QNode.TYPE_OP_LOGIC_AND = 'TYPE_OP_LOGIC_AND';

    // OPERATORS EQUALITY
    QNode.TYPE_OP_EQUALITY_NOTEQUAL = 'TYPE_OP_EQUALITY_NOTEQUAL';
    QNode.TYPE_OP_EQUALITY_LESS = 'TYPE_OP_EQUALITY_LESS';
    QNode.TYPE_OP_EQUALITY_LESSEQUAL = 'TYPE_OP_EQUALITY_LESSEQUAL';
    QNode.TYPE_OP_EQUALITY_GREATER = 'TYPE_OP_EQUALITY_GREATER';
    QNode.TYPE_OP_EQUALITY_GREATEREQUAL = 'TYPE_OP_EQUALITY_GREATEREQUAL';
    QNode.TYPE_OP_EQUALITY_EQUAL = 'TYPE_OP_EQUALITY_EQUAL';

    // OPERATORS MATH
    QNode.TYPE_OP_MATH_ADD = 'TYPE_OP_MATH_ADD';
    QNode.TYPE_OP_MATH_SUBTRACT = 'TYPE_OP_MATH_SUBTRACT';
    QNode.TYPE_OP_MATH_MULTIPLY = 'TYPE_OP_MATH_MULTIPLY';
    QNode.TYPE_OP_MATH_DIVIDE = 'TYPE_OP_MATH_DIVIDE';
    QNode.TYPE_OP_MATH_MODULO = 'TYPE_OP_MATH_MODULO';

    // VALUES
    QNode.TYPE_VALUE_STRING = 'TYPE_VALUE_STRING';
    QNode.TYPE_VALUE_NUMBER = 'TYPE_VALUE_NUMBER';
    QNode.TYPE_VALUE_LIST = 'TYPE_VALUE_LIST';
    QNode.TYPE_VALUE_TABLE = 'TYPE_VALUE_TABLE';
    QNode.TYPE_VALUE_TABLE_COL = 'TYPE_VALUE_TABLE_COL';
    QNode.TYPE_VALUE_UNKNOWN = 'TYPE_VALUE_UNKNOWN';

    function QNode()
    {
	this.type = null;
	this.text = null;
	this.value = null;
	this.children = [];
	this.parent = null;
	this.getChildByType = function(type)
	{
	    var ret = [];
	    for ( var i = 0; i < this.children.length; i++)
	    {
		var child = this.children[i];
		if (child.type == type) ret.push(child);
	    }
	    return ret.length > 0 ? ret : null;
	};

	this.isComplex = function()
	{
	    return complex(this);
	};

	function complex(node)
	{

	    if (node.type == QNode.TYPE_VALUE_TABLE_COL) return true;
	    else
	    {
		for ( var i in node.children)
		{
		    if (complex(node.children[i])) return true;
		}
	    }
	    return false;
	}
    }

    /***************************************************************************
     * END
     **************************************************************************/
    if (!window.einspunktnull)
    {
	window.einspunktnull = {};
    }
    if (!window.einspunktnull) window.einspunktnull = window.µ = {};
    window.einspunktnull.LocalJsonDataBase = LocalJsonDataBase;

}(window, document, undefined));
