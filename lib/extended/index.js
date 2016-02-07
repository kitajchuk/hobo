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
        this[ 0 ].parentNode.children,
        this[ 0 ]
    );
};