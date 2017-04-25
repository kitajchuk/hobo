var utils = require( "../utils" );


/**
 *
 * @instance
 * @memberof Hobo
 * @method addClass
 * @description Add one or more classNames to the nodes.
 * @param {string} classes The space-separated classNames
 * @returns {Hobo}
 *
 */
module.exports = function ( classes ) {
    this.forEach(function ( element ) {
        var newClass = classes.split( " " ),
            elsClass = utils.getClass( element ).split( " " );

        newClass.forEach(function ( klass ) {
            if ( elsClass.indexOf( klass ) === -1 ) {
                elsClass.push( klass );
            }
        });

        utils.setClass( element, utils.trimString( elsClass.join( " " ) ) );
    });

    return this;
};
