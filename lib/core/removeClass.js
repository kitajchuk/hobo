var utils = require( "../utils" );


/**
 *
 * @instance
 * @memberof Hobo
 * @method removeClass
 * @description Remove one or more classNames from the nodes.
 * @param {string} classes The space-separated classNames
 * @returns {Hobo}
 *
 */
module.exports = function ( classes ) {
    this.forEach(function ( element ) {
        // Explicit check for `undefined`
        // Using `!classes` would be bad in this case
        // Calling `removeClass( "" )` should not wipe the entire className
        if ( classes === undefined ) {
            utils.setClass( element, "" );

        } else {
            var oldClass = classes.split( " " ),
                elsClass = utils.getClass( element ).split( " " );

            oldClass.forEach(function ( klass ) {
                if ( elsClass.indexOf( klass ) !== -1 ) {
                    elsClass.splice( elsClass.indexOf( klass ), 1 );
                }
            });

            utils.setClass( element, utils.trimString( elsClass.join( " " ) ) );
        }
    });

    return this;
};
