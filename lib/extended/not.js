var matchElement = require( "properjs-matchelement" ),
    Hobo = require( "../Hobo" );


/**
 *
 * @instance
 * @memberof Hobo
 * @method not
 * @param {string} selector The selector to filter out elements
 * @description Filter out elements that are NOT this selector
 * @returns {Hobo}
 *
 */
module.exports = function ( selector ) {
    var ret = [];

    if ( selector instanceof Hobo ) {
        this.forEach(function ( node ) {
            var push = true;

            selector.forEach(function ( elem ) {
                if ( node === elem ) {
                    push = false;
                }
            });

            if ( push ) {
                ret.push( node );
            }
        });

    } else {
        this.forEach(function ( node ) {
            if ( !matchElement( node, selector ) ) {
                ret.push( node );
            }
        });
    }

    return new Hobo( ret, this._context );
};