/**
 *
 * @public
 * @method index
 * @description Get the nodes index compared to its siblings.
 * @returns {number}
 *
 */
module.exports = function () {
    return Array.prototype.indexOf.call(
        this._nodeList[ 0 ].parentNode.children,
        this._nodeList[ 0 ]
    );
};