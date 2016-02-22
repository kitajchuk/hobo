var Hobo = require( "../Hobo" ),
    matchElement = require( "properjs-matchelement" );


/**
 *
 * @instance
 * @memberof Hobo
 * @method is
 * @param {string} selector The selector to match elements against
 * @description Determine if a node set is this selector.
 * @returns {boolean}
 *
 */
module.exports = function ( selector ) {
    return (matchElement( this[ 0 ], selector ) ? true : false);
};