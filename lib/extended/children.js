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
    var children = [];

    this.forEach(function ( node ) {
        children = children.concat( utils.makeArray( node.children ) );
    });

    return new Hobo( children, null );
};