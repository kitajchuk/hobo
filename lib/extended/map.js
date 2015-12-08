/**
 *
 * @public
 * @method map
 * @description Like Array map but for Hobo intances.
 * @returns {this}
 *
 */
module.exports = function ( fn ) {
    this._nodeList.forEach(function ( node ) {
        node = (fn( node ) || node);

        return node;
    });

    return this;
};