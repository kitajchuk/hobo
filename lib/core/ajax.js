var utils = require( "../utils" );
var AjaxPromise = function () {
    var self = this;

    this._promise = new Promise(function ( resolve, reject ) {
        self._resolve = resolve;
        self._reject = reject;
    });
};
AjaxPromise.prototype.then = function ( fn ) {
    this._then = fn;
    return this;
};
AjaxPromise.prototype.catch = function ( fn ) {
    this._catch = fn;
    return this;
};
AjaxPromise.prototype.resolve = function ( arg ) {
    if ( this._then ) {
        this._then( arg );
        this._resolve( arg );
    }

    return this;
};
AjaxPromise.prototype.reject = function ( err ) {
    if ( this._catch ) {
        this._catch( err );
        this._reject( err );
    }

    return this;
};
AjaxPromise.prototype.abort = function () {
    if ( this._xhr ) {
        this._reject( "Rejecting on XMLHttpRequest.abort()" );
        this._xhr.abort();
    }

    return this;
};


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
        payload = (config.payload || null),
        ajaxPromise = new AjaxPromise();

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

    // Normalize response handling
    var handleResponse = function ( response ) {
        if ( dataType === "json" ) {
            try {
                response = JSON.parse( response );

            } catch ( error ) {
                // ajaxPromise.reject( ("Rejecting on JSON.parse error : " + error) );
                ajaxPromise.reject( response );
            }
        }

        ajaxPromise.resolve( response );
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
                    // ajaxPromise.reject( ("Rejecting on server status code : " + this.status) );
                    ajaxPromise.reject( this.responseText );
                }
            }
        };

        xhr.send( (params || payload) );

        ajaxPromise._xhr = xhr;
    }

    return ajaxPromise;
};
