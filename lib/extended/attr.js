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
 */
module.exports = function ( key, value ) {
    if ( value ) {
        this.forEach(function ( node ) {
            node.setAttribute( key, value );
        });

    } else {
        return this[ 0 ].getAttribute( key );
    }
};