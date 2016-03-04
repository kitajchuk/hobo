/*!
 *
 *
 * @Hobo-utils
 * @author: kitajchuk
 *
 *
 */
var version = "0.3.0",


    rData = /^data-/,


    rDigit = /\D/g,


    rDashAlpha = /-([\da-z])/gi,


    rTag = /^</,


    rJson = /^\[|\{/,


    rDocType = /^<\!DOCTYPE\shtml>/i,


    rFront2Back = /^\s+|\s+$/g,


    trimString = function ( str ) {
        return str.replace( rFront2Back, "" );
    },


    camelCase = function ( string ) {
        return string.replace( rDashAlpha, function ( all, letter ) {
            return letter.toUpperCase();
        });
    },


    makeId = function () {
        return ("hobo" + ( version + Math.random() ).replace( rDigit, "" ));
    },


    makeArray = function ( nodes ) {
        return [].slice.call( nodes );
    },


    // Since DOMStringMap camel-cases data-attr's,
    // All data mapped through Hobo must camel-case as well.
    mapDataset = function ( node ) {
        if ( !node.hoboDataMap ) {
            node.hoboDataMap = {};
        }

        for ( var i in node.dataset ) {
            if ( node.dataset.hasOwnProperty( i ) ) {
                // Dataset keys will already be camel-cased
                var store = node.dataset[ i ];

                if ( rJson.test( store ) ) {
                    try {
                        store = JSON.parse( store );

                    } catch ( error ) {
                        throw error;
                    }
                }

                node.hoboDataMap[ i ] = store;
            }
        }
    },


    storeData = function ( data, node ) {
        var id;

        for ( var i in data ) {
            if ( data.hasOwnProperty( i ) ) {
                id = camelCase( i );

                node.hoboDataMap[ id ] = data[ i ];
            }
        }
    },


    retrieveData = function ( key, node ) {
        var ret = null;

        // All data mapped into Hobo will be camel-cased
        key = camelCase( key );

        if ( node.hoboDataMap && node.hoboDataMap[ key ] ) {
            ret = node.hoboDataMap[ key ];
        }

        return ret;
    },


    mergeData = function ( data, node ) {
        for ( var i in node.hoboDataMap ) {
            if ( node.hoboDataMap.hasOwnProperty( i ) && !data[ i ] ) {
                data[ i ] = node.hoboDataMap[ i ];
            }
        }
    },


    removeData = function ( key, node ) {
        // All data mapped into Hobo will be camel-cased
        key = camelCase( key );

        if ( node.hoboDataMap && node.hoboDataMap[ key ] ) {
            delete node.hoboDataMap[ key ];
        }
    },


    serializeData = function ( data, prefix ) {
        var str = [],
            key,
            val;

        for ( var i in data ) {
            if ( data.hasOwnProperty( i ) ) {
                key = prefix ? (prefix + "[" + i + "]") : i;
                val = data[ i ];

                if ( typeof val === "object" ) {
                    str.push( serializeData( val, key ) );

                } else {
                    str.push( (encodeURIComponent( key ) + "=" + encodeURIComponent( val )) );
                }
            }
        }

        return str.join( "&" );
    };


module.exports = {
    version: version,
    rData: rData,
    rDigit: rDigit,
    rTag: rTag,
    rJson: rJson,
    rDocType: rDocType,
    rFront2Back: rFront2Back,
    trimString: trimString,
    camelCase: camelCase,
    makeId: makeId,
    makeArray: makeArray,
    mapDataset: mapDataset,
    storeData: storeData,
    retrieveData: retrieveData,
    mergeData: mergeData,
    removeData: removeData,
    serializeData: serializeData
};