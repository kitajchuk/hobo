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
    var keepers = new Hobo( [], this._context );

    // Hobo instance
    if ( selector instanceof Hobo ) {
        this.forEach(function ( node ) {
            var pushNode = true;

            selector.forEach(function ( elem ) {
                if ( node === elem ) {
                    pushNode = false;
                }
            });

            if ( pushNode ) {
                keepers.push( node );
            }
        });

    } else {
        this.forEach(function ( node, i ) {
            if ( typeof selector === "function" ) {
                if ( selector( i, node ) ) {
                    keepers.push( node );
                }

            } else if ( !matchElement( node, selector ) ) {
                keepers.push( node );
            }
        });
    }

    return keepers;
};