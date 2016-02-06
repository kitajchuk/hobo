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
 * @param {string} selector The goods - String, Element, Collection.
 * @param {element} context The Element used to call `querySelectorAll`
 *
 */
module.exports = function Hobo( selector, context ) {
    // Hobo version?
    this._hobo = utils.version;

    // Hobo context
    this._context = (context && context.nodeType && context.nodeType === 1 ? context : document);

    // Hobo selector / nodeList
    // Hobo supports a mixed selector argument

    // 0.1 => String
    if ( typeof selector === "string" ) {
        this._selector = selector;
        this._nodeList = utils.makeArray( this._context.querySelectorAll( selector ) );

    // 0.2 => DOMElement
    } else if ( selector.nodeType ) {
        this._selector = "";
        this._nodeList = [ selector ];

    // 0.3 => Collection: NodeList, HTMLCollection, Array
    } else if ( selector.length ) {
        this._selector = "";
        this._nodeList = utils.makeArray( selector );
    }

    // Hobo initialization steps
    // This performs an initial mapping of each node's DOMStringMap to its `hoboDataMap`
    this._nodeList.forEach( utils.mapDataset.bind( this ) );

    // Hobo events store
    this._events = {};

    // Hobo length?
    this.length = this._nodeList.length;
};