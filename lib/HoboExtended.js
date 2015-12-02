/*!
 *
 * 
 * @HoboExtended
 * @author: kitajchuk
 *
 *
 */
var Hobo = require( "./Hobo" );


Hobo.prototype.eq = function ( i ) {
    return i < this._length 
            ? new Hobo(
                this._selector,
                this._context,
                [ this._nodeList[ i ] ]
            ) 
            : this;
};


Hobo.prototype.map = function ( fn ) {
    this._nodeList.forEach(function ( node ) {
        node = (fn() || node);

        return node;
    });

    return this;
};


Hobo.prototype.index = function () {
    return Array.prototype.indexOf.call(
        this._nodeList[ 0 ].parentNode.children,
        this._nodeList[ 0 ]
    );
};


Hobo.prototype.parent = function () {
    return new Hobo(
        "",
        null,
        [ this._nodeList[ 0 ].parentNode ]
    );
};


module.exports = Hobo;