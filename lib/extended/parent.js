var Hobo = require( "../Hobo" ),
    matchElement = require( "properjs-matchelement" );


/**
 *
 * @instance
 * @memberof Hobo
 * @method parent
 * @param {string} selector Optional selector to match
 * @description Get a Hobo instance of the parent node of this instance.
 * @returns {Hobo}
 *
 */
module.exports = function ( selector ) {
    var parents = [];

    this.forEach(function ( node ) {
        if ( !selector || (selector && matchElement( node.parentNode, selector )) ) {
            parents.push( node.parentNode );
        }
    });

    return new Hobo( parents, null );
};