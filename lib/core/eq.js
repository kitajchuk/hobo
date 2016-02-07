var Hobo = require( "../Hobo" );


/**
 *
 * @public
 * @method eq
 * @description Get a Hobo instance for the node at an index.
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