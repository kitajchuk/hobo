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
    var closest = [];

    this.forEach(function ( node ) {
        var match = matchElement( node, selector, true );

        if ( match ) {
            closest.push( match );
        }
    });

    return new Hobo( closest, null );
};