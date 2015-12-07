/*!
 *
 * 
 * @Hobo
 * @author: kitajchuk
 *
 *
 */
var matchElement = require( "properjs-matchelement" ),
    utils = require( "./utils" );


/**
 *
 * @private
 * @class Hobo
 * @classdesc All the things you want without all the cruft.
 * @param {string} selector The parameter passed to `querySelectorAll`
 *                          Optionally you can pass the nodelist Array too.
 *                          This is really just for the use of hobo().find().
 * @param {element} context The Element used to call `querySelectorAll`
 * @param {array} nodelist An already formed array of nodes
 *
 */
module.exports = function Hobo( selector, context, nodelist ) {
    this.cl
    // Hobo instance properties
    this._context = (context && context.nodeType && context.nodeType === 1 ? context : document);
    this._nodeList = (Array.isArray( nodelist ) ? nodelist : utils.makeArray( this._context.querySelectorAll( selector ) ));
    this._selector = selector;

    // Hobo initialization steps
    // This performs an initial mapping of each node's DOMStringMap to its `hoboDataMap`
    this._nodeList.forEach( utils.mapDataset.bind( this ) );

    // Hobo version?
    this._version = utils.version;

    // Hobo events store
    this._events = {};

    // Hobo length?
    this._length = this._nodeList.length;
};