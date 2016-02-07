var Hobo = require( "../Hobo" ),
    utils = require( "../utils" );


/**
 *
 * @public
 * @instance
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

    // Otherwise we can assume to use our single node as context
    } else {
        ret = new Hobo( selector, this[ 0 ] );
    }

    return ret;
};