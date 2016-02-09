/*!
 *
 *
 * @Hobo-utils
 * @author: kitajchuk
 *
 *
 */
var version = "0.2.2",


    makeId = function () {
        return ("hobo" + ( version + Math.random() ).replace( /\D/g, "" ));
    },


    makeArray = function ( nodes ) {
        return [].slice.call( nodes );
    },


    mapDataset = function ( node ) {
        if ( !node.hoboDataMap ) {
            node.hoboDataMap = {};
        }

        for ( var i in node.dataset ) {
            node.hoboDataMap[ i ] = node.dataset[ i ];
        }
    },


    storeData = function ( data, node ) {
        for ( var i in data ) {
            node.hoboDataMap[ i ] = data[ i ];
        }
    },


    mergeData = function ( data, node ) {
        for ( var i in node.hoboDataMap ) {
            if ( !data[ i ] ) {
                data[ i ] = node.hoboDataMap[ i ];
            }
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
    makeId: makeId,
    makeArray: makeArray,
    mapDataset: mapDataset,
    storeData: storeData,
    mergeData: mergeData,
    serializeData: serializeData
};