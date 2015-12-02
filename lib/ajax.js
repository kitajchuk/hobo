var utils = require( "./utils" );


/**
 *
 * @public
 * @method ajax
 * @description Perform standar XHR with a native Promise.
 * @param {object} config The jQuery-like ajax config object
 *                        url       =>   string
 *                        data      =>   object
 *                        dataType  =>   string
 *                        method    =>   string
 * @returns {Promise}
 *
 */
module.exports = function ( config ) {
    // dataType can be `html` or `json`

    var xhr = new XMLHttpRequest(),
        url = config.url || window.location.href,
        data = utils.serializeData( config.data || {} ),
        dataType = config.dataType || "html",
        method = (config.method || "get").toUpperCase(),
        resData = null;

    return hobo.promise(function ( resolve, reject ) {
        xhr.open( method, (url + (data ? "?" + data : "")), true );

        xhr.onreadystatechange = function ( e ) {
            if ( this.readyState === 4 ) {
                // Two-Hundo's are A-Okay with Hobo
                if ( /^20/.test( this.status ) ) {
                    resData = this.responseText;

                    if ( dataType === "json" ) {
                        try {
                            resData = JSON.parse( resData );

                        } catch ( error ) {
                            reject( ("Rejecting on JSON.parse error : " + error) );
                        }
                    }

                    resolve( resData );

                } else {
                    reject( ("Rejecting on server status code : " + this.status) );
                }
            }
        };

        xhr.send();
    });
};