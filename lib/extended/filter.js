var Hobo = require( "../Hobo" ),
    matchElement = require( "properjs-matchelement" );


/**
 *
 * @public
 * @method parent
 * @description Get a Hobo instance of the parent node of this instance.
 * @returns {Hobo}
 *
 */
module.exports = function ( selector ) {
    var filtered = [];

    this._nodeList.forEach(function ( node ) {
        if ( matchElement( node, selector ) ) {
            filtered.push( node );
        }
    });

    return new Hobo( selector, null, filtered );
};