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
 *                        data      => object, default: {}
 *                        dataType  => string, default: "html"
 *                        method    => string, default: "GET"
 *                        jsonp     => string, default: "callback"
 * @returns {Promise}
 *
 */
module.exports = function ( config ) {
    var data = utils.serializeData( config.data || {} ),
        dataType = config.dataType || "html",
        method = (config.method || "get").toUpperCase(),
        url = ((config.url || window.location.href) + (data ? "?" + data : ""));

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

            xhr.send();
        }
    });
};