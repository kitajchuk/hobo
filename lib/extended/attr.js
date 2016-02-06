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
        this._nodeList.forEach(function ( node ) {
            node.setAttribute( key, value );
        });

    } else {
        return this._nodeList[ 0 ].getAttribute( key );
    }
};