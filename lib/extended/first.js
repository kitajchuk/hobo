var Hobo = require( "../Hobo" );


/**
 *
 * @instance
 * @memberof Hobo
 * @method first
 * @description Get hobo instance of the first element.
 * @returns {Hobo}
 *
 */
module.exports = function () {
    return new Hobo( this[ 0 ], this._context );
};