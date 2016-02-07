var utils = require( "../utils" );


/**
 *
 * @public
 * @instance
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

        this.forEach( utils.storeData.bind( this, obj ) );

    // Storing data as a `key:value` pair
    } else if ( value ) {
        obj = {};
        obj[ key ] = value;

        this.forEach( utils.storeData.bind( this, obj ) );

    // Accessing data by `key`
    } else if ( key ) {
        this.forEach((function ( node ) {
            if ( obj !== null ) {
                return;
            }

            for ( var i in node.hoboDataMap ) {
                if ( i === key ) {
                    obj = node.hoboDataMap[ i ];
                    break;
                }
            }

        }).bind( this ));

        ret = obj;

    // Accessing all data
    // Merges all `unique` data for a `_nodeList`
    } else {
        obj = {};

        this.forEach( utils.mergeData.bind( this, obj ) );

        ret = obj;
    }

    return ret;
};