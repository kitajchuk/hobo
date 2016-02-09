var Hobo = require( "../Hobo" );


/**
 *
 * @instance
 * @memberof Hobo
 * @method append
 * @param {mixed} appendage What to append? Hobo, Element...
 * @description Append the nodes to the DOM
 * @returns {Hobo}
 *
 */
module.exports = function ( appendage ) {
    this.forEach(function ( node ) {
        // Hobo instance OR Array OR Array-like object with forEach
        if ( appendage instanceof Hobo || (appendage.length && typeof appendage.forEach === "function") ) {
            appendage.forEach(function ( append ) {
                if ( append.nodeType ) {
                    node.appendChild( append );
                }
            });

        } else if ( appendage.nodeType ) {
            node.appendChild( appendage );
        }
    });

    return this;
};