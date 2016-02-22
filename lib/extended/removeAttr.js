var utils = require( "../utils" );


/**
 *
 * @instance
 * @memberof Hobo
 * @method removeAttr
 * @description Remove the specified attribute from each node in the set.
 * @returns {Hobo}
 *
 * @note This method needs to update data() in case we remove data-attr's
 *
 */
module.exports = function ( attr ) {
    this.forEach(function ( node ) {
        node.removeAttribute( attr );

        // Remove data()?
        if ( utils.rData.test( attr ) ) {
            utils.removeData( attr.replace( utils.rData, "" ), node );
        }
    });

    return this;
};