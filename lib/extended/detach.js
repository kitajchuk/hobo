/**
 *
 * @instance
 * @memberof Hobo
 * @method detach
 * @description Detach the nodes from the DOM
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