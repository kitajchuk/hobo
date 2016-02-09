var Hobo = require( "../Hobo" );


/**
 *
 * @instance
 * @memberof Hobo
 * @method eq
 * @param {number} i The indexOf the element
 * @description Get the element at the index as a Hobo instance.
 * @returns {Hobo}
 *
 */
module.exports = function ( i ) {
    return i < this.length 
            ? new Hobo(
                this[ i ],
                this._context
            ) 
            : this;
};