var utils = require( "../utils" );


/**
 *
 * @instance
 * @memberof Hobo
 * @method data
 * @description Get / set data values with nodes.
 * @param {string} key The access key
 * @param {string} value The value to be stored
 * @returns {mixed}
 *
 */
module.exports = function ( key, value ) {
    // Any `non-unique` data keys resolve to the first unique occurrence
    // Exactly how jQuery handles `.data( ... )` on multi-node collections

    var ret = this,
        obj = null;

    // Storing data from an Object
    if ( typeof key === "object" ) {
        obj = key;

        this.forEach(function ( node ) {
            utils.storeData( obj, node );
        });

    // Storing data as a `key:value` pair
    } else if ( value ) {
        obj = {};
        obj[ key ] = value;

        this.forEach(function ( node ) {
            utils.storeData( obj, node );
        });

    // Accessing data by `key`
    } else if ( key ) {
        this.forEach(function ( node ) {
            if ( obj !== null ) {
                return;
            }

            obj = utils.retrieveData( key, node );

        });

        ret = obj;

    // Accessing all data
    // Merges all `unique` data for a Hobo set
    } else {
        obj = {};

        // Object is mutated here by `mergeData`
        this.forEach(function ( node ) {
            utils.mergeData( obj, node );
        });

        ret = obj;
    }

    return ret;
};