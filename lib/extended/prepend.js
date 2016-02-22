var Hobo = require( "../Hobo" );


/**
 *
 * @instance
 * @memberof Hobo
 * @method prepend
 * @param {mixed} prependage What to prepend? Hobo, Element...
 * @description Append the nodes to the DOM
 * @returns {Hobo}
 *
 */
module.exports = function ( prependage ) {
    // Selector string, wrap in new Hobo instance
    if ( typeof prependage === "string" ) {
        prependage = new Hobo( prependage );
    }

    this.forEach(function ( node ) {
        // Hobo instance OR Array OR Array-like object with forEach
        if ( prependage instanceof Hobo || (prependage.length && typeof prependage.forEach === "function") ) {
            prependage.forEach(function ( prepend ) {
                if ( prepend.nodeType ) {
                    // https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
                    // Context node inserts first element BEFORE second element
                    node.insertBefore( prepend, node.firstChild );
                }
            });

        } else if ( prependage.nodeType ) {
            node.insertBefore( prependage, node.firstChild );
        }
    });

    return this;
};