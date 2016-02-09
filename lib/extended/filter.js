var Hobo = require( "../Hobo" ),
    matchElement = require( "properjs-matchelement" );


/**
 *
 * @instance
 * @memberof Hobo
 * @method filter
 * @param {string} selector The selector to match elements against
 * @description Filter out the elements that match the selector.
 * @returns {Hobo}
 *
 */
module.exports = function ( selector ) {
    var filtered = [];

    this.forEach(function ( node ) {
        if ( matchElement( node, selector ) ) {
            filtered.push( node );
        }
    });

    return new Hobo( filtered, null );
};