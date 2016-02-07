/**
 *
 * @public
 * @method detach
 * @description Detach the nodes from the DOM
 * @returns {Hobo}
 *
 */
module.exports = function () {
    this.forEach(function ( node ) {
        node.parentNode.removeChild( node );
    });

    return this;
};