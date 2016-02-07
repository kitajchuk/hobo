/**
 *
 * @public
 * @instance
 * @method removeClass
 * @description Remove one or more classNames from the nodes.
 * @param {string} classes The space-separated classNames
 *
 */
module.exports = function ( classes ) {
    this.forEach(function ( element ) {
        var oldClass = classes.split( " " ),
            elsClass = element.className.split( " " );

        oldClass.forEach(function ( klass ) {
            if ( elsClass.indexOf( klass ) !== -1 ) {
                elsClass.splice( elsClass.indexOf( klass ), 1 );
            }
        });

        element.className = elsClass.join( " " );
    });

    return this;
};