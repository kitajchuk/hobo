var Hobo = require( "../Hobo" );


/**
 *
 * @public
 * @method parent
 * @description Get a Hobo instance of the parent node of this instance.
 * @returns {Hobo}
 *
 */
module.exports = function () {
    return new Hobo(
        "",
        null,
        [ this._nodeList[ 0 ].parentNode ]
    );
};