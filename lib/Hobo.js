/*!
 *
 * 
 * @Hobo
 * @author: kitajchuk
 *
 *
 */
var utils = require( "./utils" ),
    array = [];


/**
 *
 * @class Hobo
 * @classdesc A very small, modular DOM utility for modern web apps.
 * @param {string} selector The goods - String, Element, Collection.
 * @param {element} context The Element used to call `querySelectorAll`
 *
 */
var Hobo = function ( selector, context ) {
    // Hobo version?
    this._hobo = utils.version;

    // Hobo context
    this._context = (context && context.nodeType && context.nodeType === 1 ? context : document);

    // Hobo selector / elements
    // Hobo supports a mixed selector argument

    // Handle Window
    // Handle Document
    // Handle DOMElement
    if ( selector === window || selector === document || (selector.nodeType && selector.nodeType === 1) ) {
        this._selector = "";
        selector = [ selector ];

    // Handle String
    } else if ( typeof selector === "string" ) {
        // Handle string html => Element creation
        if ( utils.rTag.test( selector ) ) {
            var tag = selector.match( utils.rTagName ),
                el = null;

            if ( tag && tag[ 1 ] ) {
                tag = tag[ 1 ];

                el = document.createElement( tag );
                el.innerHTML = selector;

                // Creating a new element may require this shim
                if ( tag !== "html" && tag !== "body" ) {
                    // The createElement method wraps a dummy element
                    // around what we really want to apply as the element
                    el = el.firstChild;
                }

                selector = [ el ];
            }

        // Handle string selector
        } else {
            this._selector = selector;
            selector = utils.makeArray( this._context.querySelectorAll( selector ) );
        }

    // Handle Collection: NodeList, HTMLCollection, Array
    } else if ( selector.length !== undefined ) {
        this._selector = "";
        selector = utils.makeArray( selector );
    }

    // Hobo events?
    this._events = {};

    // Hobo length?
    this.length = selector.length;

    // Hobo elements?
    for ( var i = this.length; i--; ) {
        this[ i ] = selector[ i ];
    }

    // This performs an initial mapping of each node's DOMStringMap to its `hoboDataMap`
    this.forEach( utils.mapDataset.bind( this ) );
};


// Shim Array-like presentation in console
Hobo.prototype.splice = array.splice;


/**
 *
 * @instance
 * @method forEach
 * @param {function} callback The method called on each iteration
 * @memberof Hobo
 * @description Make sure Hobo is iterable like an Array
 *
 */
Hobo.prototype.each = array.forEach;
Hobo.prototype.forEach = array.forEach;


/**
 *
 * @instance
 * @method push
 * @param {?} element element1, ..., elementN
 * @memberof Hobo
 * @description Make sure Hobo is pushable like an Array
 *
 */
Hobo.prototype.push = array.push;


/**
 *
 * @instance
 * @method map
 * @param {function} callback The method called for each element
 * @memberof Hobo
 * @description Make sure Hobo is mappable like an Array
 *
 */
Hobo.prototype.map = array.map;


// Export the main Hobo Class :D
module.exports = Hobo;