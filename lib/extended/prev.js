var Hobo = require( "../Hobo" ),
    matchElement = require( "properjs-matchelement" );



/**
 *
 * @instance
 * @memberof Hobo
 * @method prev
 * @param {string} selector Optional selector to match
 * @description Get the previous sibling, test against selector
 * @returns {Hobo}
 *
 */
module.exports = function ( selector ) {
    var ret = [];

    this.forEach(function ( node ) {
        var prevNode = node.previousSibling;

        while ( prevNode.nodeType !== 1 ) {
            prevNode = nextNode.previousSibling;
        }

        if ( prevNode && (!selector || (selector && matchElement( prevNode, selector ))) ) {
            ret.push( prevNode );
        }
    });

    return new Hobo( ret, this._context );
};