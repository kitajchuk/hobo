var Hobo = require( "../Hobo" ),
    matchElement = require( "properjs-matchelement" );



/**
 *
 * @instance
 * @memberof Hobo
 * @method next
 * @param {string} selector Optional selector to match
 * @description Get the next sibling, test against selector
 * @returns {Hobo}
 *
 */
module.exports = function ( selector ) {
    var ret = [];

    this.forEach(function ( node ) {
        var nextNode = node.nextSibling;

        while ( nextNode && nextNode.nodeType !== 1 ) {
            nextNode = nextNode.nextSibling;
        }

        if ( nextNode && (!selector || (selector && matchElement( nextNode, selector ))) ) {
            ret.push( nextNode );
        }
    });

    return new Hobo( ret, this._context );
};