einspunktnull.config.scope = window;
einspunktnull.config.debug = true;
einspunktnull.config.useArrayFix = true;
einspunktnull.update();

var dbase =
{
    stadt :
    {
	stadtId : [ 1, 2, 3 ],
	stadtName : [ 'Dresden', 'Leipzig', 'Chemnitz' ]
    },
    station :
    {
	stationId : [ 1, 2, 3, 4, 5, 6, 7, 8 ],
	stationName : [ 'L Hbf', 'Platz', 'Nüschel', 'Sachsenbrücke', 'Goldener Reiter', 'DD Hbf', 'C Hbf', 'Blaues Wunder' ],
	stadtId : [ 2, 1, 3, 2, 1, 1, 3, 1 ]
    },
    attrib :
    {
	attribId : [ 1, 2, 3 ],
	attribName : [ 'coool', 'schwul', 'schön' ]
    },
    relStadtAttrib :
    {
	attribId : [1,3,1,2],
	stadtId : [1,1,2,3]
    }
};

var db = new LocalJsonDataBase('staedteUndStationen', dbase);

var qu = 'SELECT stadt.stadtName,stadt.stadtId FROM stadt WHERE stadt.stadtId = 16-(1-((14-5)*3+120/4))*2-126';
var qu = 'SELECT stadt.stadtName,stadt.stadtId FROM stadt WHERE stadt.stadtName = "Dresden"';
var qu = 'SELECT stadt.stadtName, station.stationName FROM station, stadt WHERE stadt.stadtName = "Dresden" AND station.stadtId = stadt.stadtId';
var qu = 'SELECT stadt.stadtName, station.stationName FROM station, stadt WHERE (stadt.stadtName = "Dresden" OR stadt.stadtName = "Leipzig") AND station.stadtId = stadt.stadtId';
var qu = 'SELECT stadt.stadtName, attrib.attribName FROM stadt, attrib, relStadtAttrib WHERE relStadtAttrib.stadtId = stadt.stadtId AND relStadtAttrib.attribId = attrib.attribId';
var qu = 'SELECT stadt.stadtName, attrib.attribName FROM stadt, attrib, relStadtAttrib WHERE relStadtAttrib.stadtId = stadt.stadtId AND relStadtAttrib.attribId = attrib.attribId AND stadt.stadtId = 16-(1-((14-5)*3+120/4))*2-127';
var qu = 'SELECT * FROM stadt';
var qu = 'SELECT * FROM stadt, attrib, relStadtAttrib WHERE relStadtAttrib.stadtId = stadt.stadtId AND relStadtAttrib.attribId = attrib.attribId AND stadt.stadtId = 16-(1-((14-5)*3+120/4))*2-127';

var res = db.query(qu);

console.log('query:', qu);
console.log('result:', res);
