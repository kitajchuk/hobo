var Hobo = require( "../Hobo" ),
    matchElement = require( "properjs-matchelement" );


/**
 *
 * @instance
 * @memberof Hobo
 * @method closest
 * @param {string} selector The selector to try and match
 * @description Find the first ancestor element with this selector
 * @returns {Hobo}
 *
 */
module.exports = function ( selector ) {
    var closest = null;

    this.forEach(function ( node ) {
        if ( !closest ) {
            closest = matchElement( node, selector, true );
        }
    });

    return new Hobo( (closest || []), null );
};