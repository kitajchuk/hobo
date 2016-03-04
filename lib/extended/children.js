var Hobo = require( "../Hobo" ),
    utils = require( "../utils" );



/**
 *
 * @instance
 * @memberof Hobo
 * @method children
 * @description Gather all child nodes that are NOT text nodes
 * @returns {Hobo}
 *
 */
module.exports = function () {
    var children = [],
        len,
        i;

    this.forEach(function ( node ) {
        i = 0;
        len = node.children.length;

        for ( i; i < len; i++ ) {
            children.push( node.children[ i ] );
        }
    });

    return new Hobo( children, this._context );
};