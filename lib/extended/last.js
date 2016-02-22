var Hobo = require( "../Hobo" );


/**
 *
 * @instance
 * @memberof Hobo
 * @method last
 * @description Get hobo instance of the last element.
 * @returns {Hobo}
 *
 */
module.exports = function () {
    return new Hobo( this[ (this.length - 1) ], this._context );
};