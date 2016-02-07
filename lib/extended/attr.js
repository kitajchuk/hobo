/**
 *
 * @public
 * @method attr
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