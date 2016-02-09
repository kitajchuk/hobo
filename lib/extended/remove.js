/**
 *
 * @instance
 * @memberof Hobo
 * @method remove
 * @description Remove the nodes from the DOM
 *              This method will remove events and data.
 * @returns {Hobo}
 *
 */
module.exports = function () {
    // Remove Events
    this.off();

    this.forEach(function ( node ) {
        // Remove Data
        // Could this cause issues ?
        delete node.hoboDataMap;

        if ( node.parentNode ) {
            node.parentNode.removeChild( node );
        }
    });

    return this;
};