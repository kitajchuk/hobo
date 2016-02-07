/*!
 *
 * 
 * @Hobo
 * @author: kitajchuk
 *
 *
 */
var utils = require( "./utils" ),
    arr = [];


/**
 *
 * @private
 * @class Hobo
 * @classdesc All the things you want without all the cruft.
 * @param {string} selector The goods - String, Element, Collection.
 * @param {element} context The Element used to call `querySelectorAll`
 *
 */
var Hobo = function ( selector, context ) {
    var elements = null;

    // Hobo version?
    this._hobo = utils.version;

    // Hobo context
    this._context = (context && context.nodeType && context.nodeType === 1 ? context : document);

    // Hobo selector / elements
    // Hobo supports a mixed selector argument

    // 0.1 => String
    if ( typeof selector === "string" ) {
        this._selector = selector;
        elements = utils.makeArray( this._context.querySelectorAll( selector ) );

    // 0.2 => DOMElement
    } else if ( selector.nodeType ) {
        this._selector = "";
        elements = [ selector ];

    // 0.3 => Collection: NodeList, HTMLCollection, Array
    } else if ( selector.length !== undefined ) {
        this._selector = "";
        elements = utils.makeArray( selector );
    }

    // Hobo initialization steps

    // Hobo events?
    this._events = {};

    // Hobo length?
    this.length = elements.length;

    // Hobo elements?
    for ( var i = this.length; i--; ) {
        this[ i ] = elements[ i ];
    }

    // This performs an initial mapping of each node's DOMStringMap to its `hoboDataMap`
    this.forEach( utils.mapDataset.bind( this ) );
};


// Shim Array-like presentation in console
Hobo.prototype.splice = arr.splice;


// Make sure Hobo is iterable like an Array
Hobo.prototype.forEach = arr.forEach;


// Make sure Hobo is pushable like an Array
Hobo.prototype.push = arr.push;


// Make sure Hobo is mappable like an Array
Hobo.prototype.map = arr.map;


// Export the main Hobo Class :D
module.exports = Hobo;