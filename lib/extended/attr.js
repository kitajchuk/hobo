var utils = require( "../utils" );


/**
 *
 * @instance
 * @memberof Hobo
 * @method addAttr
 * @param {element} node The element to set attribute on
 * @param {string} key The attribute
 * @param {mixed} value The value to set
 * @description Get or Set an attribute(s) on a DOM node
 * @returns {string}
 *
 */
var addAttr = function ( node, key, value ) {
    node.setAttribute( key, value );

    // Apply data()?
    if ( utils.rData.test( key ) ) {
        // storeData expects a {data object}
        var obj = {};

        obj[ key.replace( utils.rData, "" ) ] = value;

        utils.storeData( obj, node );
    }
};


/**
 *
 * @instance
 * @memberof Hobo
 * @method attr
 * @param {string} key The attribute
 * @param {mixed} value The value to set
 * @description Get or Set an attribute(s) on a DOM node
 * @returns {string}
 *
 */
module.exports = function ( key, value ) {
    var ret = this;

    // Value can be an {object}
    if ( typeof key === "object" ) {
        for ( var i in key ) {
            this.forEach(function ( node ) {
                addAttr( node, i, key[ i ] );
            });
        }

    // Value could possibly be "" or 0
    } else if ( value !== undefined ) {
        this.forEach(function ( node ) {
            addAttr( node, key, value );
        });

    } else {
        ret = this[ 0 ].getAttribute( key );
    }

    return ret;
};