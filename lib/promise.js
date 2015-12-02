/**
 *
 * @public
 * @method promise
 * @description Wrapper method returns a native Promise.
 * @param {function} executor The function passed to the Promise constructor
 * @returns {Promise}
 *
 */
module.exports = function ( executor ) {
    return new Promise( executor );
};