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
    return i < this._length 
            ? new Hobo(
                this._selector,
                this._context,
                [ this._nodeList[ i ] ]
            ) 
            : this;
};