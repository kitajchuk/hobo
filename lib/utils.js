/**
 *
 * @static
 * @memberof Hobo
 * @member utils
 * @description Utility methods used internally by Hobo
 *
 */
var version = "0.3.15",


    rData = /^data-/,


    rDigit = /\D/g,


    rDashAlpha = /-([\da-z])/gi,


    rTag = /^</,


    rJson = /^\[|\{/,


    rDocType = /^<\!DOCTYPE\shtml>/i,


    rFront2Back = /^\s+|\s+$/g,


    /**
     *
     * @public
     * @memberof utils
     * @method trimString
     * @description Trim leading and trailing whitespace
     * @param {string} str The string to trim
     * @returns {string}
     *
     */
    trimString = function ( str ) {
        return str.replace( rFront2Back, "" );
    },


    /**
     *
     * @public
     * @memberof utils
     * @method camelCase
     * @description Camel case a string
     * @param {string} str The string to camel case
     * @returns {string}
     *
     */
    camelCase = function ( str ) {
        return str.replace( rDashAlpha, function ( all, letter ) {
            return letter.toUpperCase();
        });
    },


    /**
     *
     * @public
     * @memberof utils
     * @method makeId
     * @description Make a unique hobo ID string
     * @returns {string}
     *
     */
    makeId = function () {
        return ("hobo" + ( version + Math.random() ).replace( rDigit, "" ));
    },


    /**
     *
     * @public
     * @memberof utils
     * @method makeArray
     * @description Convert elements to a native Array
     * @param {elements} nodes The nodes to make into an array
     * @returns {array}
     *
     */
    makeArray = function ( nodes ) {
        return [].slice.call( nodes );
    },


    /**
     *
     * @public
     * @memberof utils
     * @method makeData
     * @description Establish the hoboDataMap for a node
     * @param {element} node The node to map data on
     *
     */
    makeData = function ( node ) {
        if ( !node.hoboDataMap ) {
            node.hoboDataMap = {};
        }

        if ( node.dataset ) {
            _mapDataset( node );

        } else if ( node.attributes ) {
            _mapAttributes( node );
        }
    },


    /**
     *
     * @public
     * @memberof utils
     * @method storeData
     * @description Store data in the hoboDataMap
     * @param {object} data The data to store
     * @param {element} node The node to store data with
     *
     */
    storeData = function ( data, node ) {
        var id,
            i;

        for ( i in data ) {
            if ( data.hasOwnProperty( i ) ) {
                id = camelCase( i );

                node.hoboDataMap[ id ] = data[ i ];
            }
        }
    },


    /**
     *
     * @public
     * @memberof utils
     * @method mergeData
     * @description Merge
     * @param {object} data The data to mutate
     * @param {element} node The node to pull data from
     *
     */
    mergeData = function ( data, node ) {
        for ( var i in node.hoboDataMap ) {
            if ( node.hoboDataMap.hasOwnProperty( i ) && !data[ i ] ) {
                data[ i ] = node.hoboDataMap[ i ];
            }
        }
    },


    /**
     *
     * @public
     * @memberof utils
     * @method retrieveData
     * @description Get data from a node
     * @param {string} key The reference point for a data entry
     * @param {element} node The node to pull a data value from
     * @returns {mixed}
     *
     */
    retrieveData = function ( key, node ) {
        var ret = null;

        // All data mapped into Hobo will be camel-cased
        key = camelCase( key );

        if ( node.hoboDataMap && node.hoboDataMap[ key ] ) {
            ret = node.hoboDataMap[ key ];
        }

        return ret;
    },


    /**
     *
     * @public
     * @memberof utils
     * @method removeData
     * @description Delete data from a nodes hoboDataMap
     * @param {string} key The reference point for a data entry
     * @param {element} node The node to delete a data value from
     *
     */
    removeData = function ( key, node ) {
        // All data mapped into Hobo will be camel-cased
        key = camelCase( key );

        if ( node.hoboDataMap && node.hoboDataMap[ key ] ) {
            delete node.hoboDataMap[ key ];
        }
    },


    /**
     *
     * @public
     * @memberof utils
     * @method serializeData
     * @description Convert data into AJAXable querystring
     * @param {object} data The data to convert
     * @param {string} prefix The current iterations property name
     * @returns {string}
     *
     */
    serializeData = function ( data, prefix ) {
        var str = [],
            key,
            val,
            i;

        for ( i in data ) {
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
    },


    /**
     *
     * @public
     * @memberof utils
     * @method getClass
     * @description Get the class string from a node
     * @param {Element} node The node to get `class` for
     * @returns {string}
     *
     */
    getClass = function ( node ) {
        return (node.getAttribute( "class" ) || "");
    },


    /**
     *
     * @public
     * @memberof utils
     * @method setClass
     * @description Set the class string for a node
     * @param {Element} node The node to set `class` on
     * @param {string} klass The class string to be applied
     *
     */
    setClass = function ( node, klass ) {
        node.setAttribute( "class", klass );
    },


    // DOMStringMap camel-cases data- attributes.
    // NamedNodeMap is a fallback which supports IE 10.
    // Data mapped through Hobo must camel-case as well.


    /**
     *
     * @private
     * @memberof utils
     * @method _getDataValue
     * @description Normalized parsing of JSON string into Object
     * @param {object} data The data to parse
     * @returns {object}
     *
     */
    _getDataValue = function ( data ) {
        if ( rJson.test( data ) ) {
            try {
                data = JSON.parse( data );

            } catch ( error ) {
                throw error;
            }
        }

        return data;
    },


    /**
     *
     * @private
     * @memberof utils
     * @method _mapAttributes
     * @description Migrate existing NamedNodeMap to a nodes hoboDataMap
     * @param {element} node The data to parse
     *
     */
    _mapAttributes = function ( node ) {
        var i = node.attributes.length;

        for ( i; i--; ) {
            if ( rData.test( node.attributes[ i ].name ) ) {
                var key = camelCase( node.attributes[ i ].name.replace( rData, "" ) );

                node.hoboDataMap[ key ] = _getDataValue( node.attributes[ i ].value );
            }
        }
    },


    /**
     *
     * @private
     * @memberof utils
     * @method _mapDataset
     * @description Migrate existing DOMStringMap to a nodes hoboDataMap
     * @param {element} node The data to parse
     *
     */
    _mapDataset = function ( node ) {
        for ( var i in node.dataset ) {
            if ( node.dataset.hasOwnProperty( i ) ) {
                node.hoboDataMap[ i ] = _getDataValue( node.dataset[ i ] );
            }
        }
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
    makeData: makeData,
    storeData: storeData,
    retrieveData: retrieveData,
    mergeData: mergeData,
    removeData: removeData,
    serializeData: serializeData,
    getClass: getClass,
    setClass: setClass
};
