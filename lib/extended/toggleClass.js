var Hobo = require( "../Hobo" ),
    matchElement = require( "properjs-matchelement" );


/**
 *
 * @instance
 * @memberof Hobo
 * @method toggleClass
 * @description Add or remove the specified classNames.
 * @param {string} classes The space-separated classNames
 * @returns {Hobo}
 *
 */
module.exports = function ( classes ) {
    classes = classes.split( " " );

    this.forEach(function ( node ) {
        classes.forEach(function ( klass ) {
            if ( matchElement( node, ("." + klass) ) ) {
                new Hobo( node, null ).removeClass( klass );

            } else {
                new Hobo( node, null ).addClass( klass );
            }
        });
    });

    return this;
};