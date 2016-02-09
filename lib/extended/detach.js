/**
 *
 * @instance
 * @memberof Hobo
 * @method detach
 * @description Detach the nodes from the DOM
 *              This method does NOT remove events or data.
 * @returns {Hobo}
 *
 */
module.exports = function () {
    this.forEach(function ( node ) {
        if ( node.parentNode ) {
            node.parentNode.removeChild( node );
        }
    });

    return this;
};