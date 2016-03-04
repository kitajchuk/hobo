var Hobo = require( "../Hobo" ),
    utils = require( "../utils" );


/**
 *
 * @instance
 * @memberof Hobo
 * @method find
 * @description Query into a Hobo instance for new nodes.
 * @param {string} selector The selector to query for
 * @returns {Hobo}
 *
 */
module.exports = function ( selector ) {
    var ret = this;

    // If we are `finding` within a multi-node collection...
    // Here its probably faster to grab the nodes within each Node
    // and then just let the context be the document for the new instance. 
    if ( this.length > 1 ) {
        ret = [];

        this.forEach(function ( node ) {
            ret = ret.concat( utils.makeArray( node.querySelectorAll( selector ) ) );
        });

        ret = new Hobo( ret, null );

    // Single node collection
    // Empty node collection
    } else {
        ret = new Hobo( (this.length ? selector : []), (this.length ? this[ 0 ] : null) );
    }

    return ret;
};