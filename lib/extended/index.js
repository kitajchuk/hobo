/**
 *
 * @instance
 * @memberof Hobo
 * @method index
 * @description Get the nodes index compared to its DOM siblings.
 *              Possibly this should be its index in the Hobo set?
 * @returns {number}
 *
 */
module.exports = function () {
    return Array.prototype.indexOf.call(
        this[ 0 ].parentNode.children,
        this[ 0 ]
    );
};