var utils = require( "../utils" );


/**
 *
 * @instance
 * @memberof Hobo
 * @method attr
 * @param {string} key The attribute
 * @param {mixed} value The value to set
 * @description Get or Set an attribute on a DOM node
 * @returns {string}
 *
 * @note This method needs to update data() in case we add data-attr's
 *
 */
module.exports = function ( key, value ) {
    // Value could possibly be "" or 0
    if ( value !== undefined ) {
        this.forEach(function ( node ) {
            node.setAttribute( key, value );

            // Apply data()?
            if ( utils.rData.test( key ) ) {
                // storeData expects a {data object}
                var obj = {};

                obj[ key.replace( utils.rData, "" ) ] = value;

                utils.storeData( obj, node );
            }
        });

        return this;

    } else {
        return this[ 0 ].getAttribute( key );
    }
};