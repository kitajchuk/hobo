var utils = require( "../utils" );


/**
 *
 * @static
 * @memberof Hobo
 * @method ajax
 * @description Perform standar XHR with a native Promise.
 *              dataType can be `html`, `json`, `jsonp`.
 * @param {object} config The ajax config object
 *                        url       => string, default: window.location.href
 *                        data      => object, default: null
 *                        dataType  => string, default: "html"
 *                        method    => string, default: "GET"
 *                        jsonp     => string, default: "callback"
 *                        headers   => object, default: null
 * @returns {Promise}
 *
 */
module.exports = function ( config ) {
    var params = (config.data || null),
        dataType = (config.dataType || "html"),
        method = (config.method || "GET").toUpperCase(),
        url = (config.url || window.location.href),
        headers = (config.headers || null),
        payload = (config.payload || null);

    // Handle params
    // Params will be one of the following:
    // Serialized querystring
    // Instanceof FormData
    // Null
    if ( params && !(FormData && params instanceof FormData) ) {
        params = utils.serializeData( config.data );
    }

    // Handle JSON payloads
    if ( payload && typeof payload !== "string" ) {
        payload = JSON.stringify( payload );
    }

    // Handle params in GET URL
    if ( method === "GET" && params ) {
        url += ("?" + params);
    }

    return new Promise(function ( resolve, reject ) {
        var handleResponse = function ( response ) {
            if ( dataType === "json" ) {
                try {
                    response = JSON.parse( response );

                } catch ( error ) {
                    reject( ("Rejecting on JSON.parse error : " + error) );
                }
            }

            resolve( response );
        };

        // JSONP
        if ( dataType === "jsonp" ) {
            var jsonpCallbackValue = (utils.makeId() + "JSONP"),
                jsonpCallbackKey = (config.jsonp || "callback"),
                jsonpScript = document.createElement( "script" );

            jsonpScript.src = (url + (/\?/.test( url ) ? "&" : "?") + jsonpCallbackKey + "=" + jsonpCallbackValue);

            window[ jsonpCallbackValue ] = function ( response ) {
                document.getElementsByTagName( "head" )[ 0 ].removeChild( jsonpScript );
                jsonpScript = null;
                delete window[ jsonpCallbackValue ];

                handleResponse( response );
            };

            document.getElementsByTagName( "head" )[ 0 ].appendChild( jsonpScript );

        // XHR
        } else {
            var xhr = new XMLHttpRequest();

            xhr.open( method, url, true );

            if ( headers ) {
                for ( var header in headers ) {
                    if ( headers.hasOwnProperty( header ) ) {
                        xhr.setRequestHeader( header, headers[ header ] );
                    }
                }
            }

            xhr.onreadystatechange = function ( e ) {
                if ( this.readyState === 4 ) {
                    // Two-Hundo's are A-Okay with Hobo
                    if ( /^20/.test( this.status ) ) {
                        handleResponse( this.responseText );

                    } else {
                        reject( ("Rejecting on server status code : " + this.status) );
                    }
                }
            };

            xhr.send( (params || payload) );
        }
    });
};
