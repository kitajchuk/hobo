/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 35);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*!
 *
 *
 * @Hobo-utils
 * @author: kitajchuk
 *
 *
 */
var version = "0.3.6",


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


    mergeData = function ( data, node ) {
        for ( var i in node.hoboDataMap ) {
            if ( node.hoboDataMap.hasOwnProperty( i ) && !data[ i ] ) {
                data[ i ] = node.hoboDataMap[ i ];
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


    // DOMStringMap camel-cases data- attributes.
    // NamedNodeMap is a fallback which supports IE 10.
    // Data mapped through Hobo must camel-case as well.


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


    // Use {NamedNodeMap}
    _mapAttributes = function ( node ) {
        var i = node.attributes.length;

        for ( i; i--; ) {
            if ( rData.test( node.attributes[ i ].name ) ) {
                var key = camelCase( node.attributes[ i ].name.replace( rData, "" ) );

                node.hoboDataMap[ key ] = _getDataValue( node.attributes[ i ].value );
            }
        }
    },


    // Use {DOMStringMap}
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
    serializeData: serializeData
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 *
 * 
 * @Hobo
 * @author: kitajchuk
 *
 *
 */
var utils = __webpack_require__( 0 ),
    array = [];


/**
 *
 * @class Hobo
 * @classdesc A very small, modular DOM utility for modern web apps.
 * @param {string} selector The goods - String, Element, Collection.
 * @param {element} context The Element used to call `querySelectorAll`
 *
 */
var Hobo = function ( selector, context ) {
    // Hobo version?
    this._hobo = utils.version;

    // Hobo context
    this._context = (context && context.nodeType && context.nodeType === 1 ? context : document);

    // Hobo selector / elements
    // Hobo supports a mixed selector argument

    // Handle Window
    // Handle Document
    // Handle DOMElement
    if ( selector === window || selector === document || (selector.nodeType && selector.nodeType === 1) ) {
        this._selector = "";
        selector = [ selector ];

    // Handle String
    } else if ( typeof selector === "string" ) {
        // Trim trailing whitespace from the string
        selector = utils.trimString( selector );

        // Handle string html => Element creation
        if ( utils.rTag.test( selector ) ) {
            // Then remove the doctype - `<!DOCTYPE html>`
            selector = selector.replace( utils.rDocType, "" );

            // Create a dummy `hobo` element
            // Dump the HTML payload in the `hobo` element
            // Extract the elements from the `hobo` element
            var el = document.createElement( "hobo" );
                el.innerHTML = selector;

            // Format elements as a true Array
            selector = utils.makeArray( el.children );

            el = null;

        // Handle string selector
        } else {
            this._selector = selector;
            selector = utils.makeArray( this._context.querySelectorAll( selector ) );
        }

    // Handle Collection: NodeList, HTMLCollection, Array
    } else if ( selector.length !== undefined ) {
        this._selector = "";
        selector = utils.makeArray( selector );
    }

    // Hobo events?
    this._events = {};

    // Hobo length?
    this.length = selector.length;

    // Hobo elements?
    for ( var i = this.length; i--; ) {
        this[ i ] = selector[ i ];
    }

    // Initial mapping of each nodes data.
    // Transfer {DOMStringMap} => {hoboDataMap}
    this.forEach( utils.makeData );
};


// Shim Array-like presentation in console
Hobo.prototype.splice = array.splice;


/**
 *
 * @instance
 * @method forEach
 * @param {function} callback The method called on each iteration
 * @memberof Hobo
 * @description Make sure Hobo is iterable like an Array
 *
 */
Hobo.prototype.each = array.forEach;
Hobo.prototype.forEach = array.forEach;


/**
 *
 * @instance
 * @method push
 * @param {?} element element1, ..., elementN
 * @memberof Hobo
 * @description Make sure Hobo is pushable like an Array
 *
 */
Hobo.prototype.push = array.push;


/**
 *
 * @instance
 * @method map
 * @param {function} callback The method called for each element
 * @memberof Hobo
 * @description Make sure Hobo is mappable like an Array
 *
 */
Hobo.prototype.map = array.map;


// Export the main Hobo Class :D
module.exports = Hobo;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 *
 * Use native element selector matching
 *
 * @matchElement
 * @author: kitajchuk
 *
 */
(function ( factory ) {
    
    if ( true ) {
        module.exports = factory();

    } else if ( typeof window !== "undefined" ) {
        window.matchElement = factory();
    }
    
})(function () {

    /**
     *
     * Use native element selector matching
     * @memberof! <global>
     * @method matchElement
     * @param {object} el the element
     * @param {string} selector the selector to match
     * @param {boolean} walk should we walk the tree if el is not a match?
     * @returns element OR null
     *
     */
    var matchElement = function ( el, selector, walk ) {
        var method = ( el.matches ) ? "matches" : ( el.webkitMatchesSelector ) ? 
                                      "webkitMatchesSelector" : ( el.mozMatchesSelector ) ? 
                                      "mozMatchesSelector" : ( el.msMatchesSelector ) ? 
                                      "msMatchesSelector" : ( el.oMatchesSelector ) ? 
                                      "oMatchesSelector" : null;

        // Try testing the element against the selector
        // 0.1 => Method is not undefined
        // 0.2 => Element passes method call
        if ( method && el[ method ].call( el, selector ) ) {
            return el;

        // Keep walking up the DOM if we can - only if `walk` flag is `true`
        } else if ( walk && el !== document.documentElement && el.parentNode ) {
            return matchElement( el.parentNode, selector, walk );

        // Otherwise we should not execute an event
        } else {
            return null;
        }
    };


    return matchElement;

});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var utils = __webpack_require__( 0 );


/**
 *
 * @instance
 * @memberof Hobo
 * @method addClass
 * @description Add one or more classNames to the nodes.
 * @param {string} classes The space-separated classNames
 * @returns {Hobo}
 *
 */
module.exports = function ( classes ) {
    this.forEach(function ( element ) {
        var newClass = classes.split( " " ),
            elsClass = element.className.split( " " );

        newClass.forEach(function ( klass ) {
            if ( elsClass.indexOf( klass ) === -1 ) {
                elsClass.push( klass );
            }
        });

        element.className = utils.trimString( elsClass.join( " " ) );
    });

    return this;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var utils = __webpack_require__( 0 );


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
        headers = (config.headers || null);

    // Handle params
    // Params will be one of the following:
    // Serialized querystring
    // Instanceof FormData
    // Null
    if ( params && !(FormData && params instanceof FormData) ) {
        params = utils.serializeData( config.data );
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

            xhr.send( params );
        }
    });
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var utils = __webpack_require__( 0 );


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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var Hobo = __webpack_require__( 1 ),
    utils = __webpack_require__( 0 );


/**
 *
 * @instance
 * @memberof Hobo
 * @method find
 * @description Query into a Hobo instance for new nodes.
 * @param {string} selector The selector to query for
 * @returns {Hobo}
 *
 */
module.exports = function ( selector ) {
    var ret = this;

    // If we are `finding` within a multi-node collection...
    // Here its probably faster to grab the nodes within each Node
    // and then just let the context be the document for the new instance. 
    if ( this.length > 1 ) {
        ret = [];

        this.forEach(function ( node ) {
            ret = ret.concat( utils.makeArray( node.querySelectorAll( selector ) ) );
        });

        ret = new Hobo( ret, null );

    // Single node collection
    // Empty node collection
    } else {
        ret = new Hobo( (this.length ? selector : []), (this.length ? this[ 0 ] : null) );
    }

    return ret;
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

/**
 *
 * @private
 * @method unbind
 * @description Unbind a standard DOM Event.
 * @param {element} node
 * @param {string} event
 * @param {function} callback
 * @this {Hobo}
 *
 */
var unbind = function ( node, event, callback ) {
    var type,
        evo,
        id;

    // Remove a single handler for an event type
    if ( callback ) {
        for ( id in this._events[ event ] ) {
            if ( this._events[ event ].hasOwnProperty( id ) ) {
                evo = this._events[ event ][ id ];

                // Match the nodes, Match the callback
                if ( evo.node === node && evo.callback === callback ) {
                    node.removeEventListener( evo.type, evo.handler, false );

                    delete this._events[ event ][ id ];
                }
            }
        }

    // Remove all handlers for an event type
    } else {
        for ( id in this._events[ event ] ) {
            if ( this._events[ event ].hasOwnProperty( id ) ) {
                evo = this._events[ event ][ id ];

                // Match the nodes
                if ( evo.node === node ) {
                    node.removeEventListener( evo.type, evo.handler, false );

                    delete this._events[ event ][ id ];
                }
            }
        }
    }
};


/**
 *
 * @private
 * @method teardown
 * @description Unbind all events for instance.
 * @param {element} node
 * @this {Hobo}
 *
 */
var teardown = function ( node ) {
    var type,
        evo,
        id;

    for ( type in this._events ) {
        if ( this._events.hasOwnProperty( type ) ) {
            for ( id in this._events[ type ] ) {
                if ( this._events[ type ].hasOwnProperty( id ) ) {
                    evo = this._events[ type ][ id ];

                    // Match the nodes
                    if ( evo.node === node ) {
                        node.removeEventListener( evo.type, evo.handler, false );

                        delete this._events[ type ][ id ];
                    }
                }
            }
        }
    }
};


/**
 *
 * @instance
 * @memberof Hobo
 * @method off
 * @description Un-Bind a standard DOM Event.
 * @param {string} events The event type
 * @param {function} callback The supplied callback
 * @returns {Hobo}
 *
 */
module.exports = function ( events, callback ) {
    var self = this;

    // Iterate over event(s)
    // Space separated event list is supported
    // Example: "DOMMouseScroll mousewheel"
    // off() can be called with no args, account for this and remove ALL events
    (events ? events.split( " " ) : [null]).forEach(function ( event ) {
        self.forEach(function ( node ) {
            // Explicit `null` check for teardown
            if ( event === null ) {
                teardown.call( self, node );

            } else {
                unbind.call( self, node, event, callback );
            }
        });
    });

    return this;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var matchElement = __webpack_require__( 2 ),
    utils = __webpack_require__( 0 );


/**
 *
 * @private
 * @method bind
 * @description Bind a standard DOM Event.
 * @param {element} node
 * @param {string} event
 * @param {string} selector
 * @param {function} callback
 * @this {Hobo}
 *
 */
var bind = function ( node, event, selector, callback ) {
    // Unique ID for each node event
    var eventId = (utils.makeId() + "EVENT"),

        // The true event name
        eventType = event,

        // Normalize event handler with a small wrapper function
        eventHandler = function ( e ) {
            // Default context is `this` element
            var context = (selector ? matchElement( e.target, selector, true ) : this);

            // Handle `mouseenter` and `mouseleave`
            if ( event === "mouseenter" || event === "mouseleave" ) {
                var relatedElement = (event === "mouseenter" ? e.fromElement : e.toElement);

                if ( context && ( relatedElement !== context && !context.contains( relatedElement ) ) ) {
                    callback.call( context, e );
                }

            // Fire callback if context element
            } else if ( context ) {
                callback.call( context, e );
            }
        };

    // Support `mouseenter` and `mouseleave`
    if ( event === "mouseenter" ) {
        eventType = "mouseover";

    } else if ( event === "mouseleave" ) {
        eventType = "mouseout";
    }

    // Each handler/callback pair gets stored in an `events` index
    this._events[ event ][ eventId ] = {
        id: eventId,
        type: eventType,
        node: node,
        handler: eventHandler,
        callback: callback
    };

    node.addEventListener( eventType, eventHandler, false );
};


/**
 *
 * @instance
 * @memberof Hobo
 * @method on
 * @description Bind a standard DOM Event. Honor delegation as a primary.
 * @param {string} events 
 * @param {string} selector 
 * @param {function} callback
 * @returns {Hobo}
 *
 */
module.exports = function ( events, selector, callback ) {
    var self = this;

    // Normalize `selector` and `callback`
    if ( !callback ) {
        callback = selector;
        selector = this._selector;
    }

    // Iterate over event(s)
    // Space separated event list is supported
    // Example: "DOMMouseScroll mousewheel"
    events.split( " " ).forEach(function ( event ) {
        // Does this event type have an index yet
        if ( !self._events[ event ] ) {
            self._events[ event ] = {};
        }

        self.forEach(function ( node ) {
            bind.call( self, node, event, selector, callback );
        });
    });

    return this;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var utils = __webpack_require__( 0 );


/**
 *
 * @instance
 * @memberof Hobo
 * @method removeClass
 * @description Remove one or more classNames from the nodes.
 * @param {string} classes The space-separated classNames
 * @returns {Hobo}
 *
 */
module.exports = function ( classes ) {
    this.forEach(function ( element ) {
        // Explicit check for `undefined`
        // Using `!classes` would be bad in this case
        // Calling `removeClass( "" )` should not wipe the entire className
        if ( classes === undefined ) {
            element.className = "";

        } else {
            var oldClass = classes.split( " " ),
                elsClass = element.className.split( " " );

            oldClass.forEach(function ( klass ) {
                if ( elsClass.indexOf( klass ) !== -1 ) {
                    elsClass.splice( elsClass.indexOf( klass ), 1 );
                }
            });

            element.className = utils.trimString( elsClass.join( " " ) );
        }
    });

    return this;
};

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 *
 *
 * @method hobo
 * @author kitajchuk
 * @hobo-dist npm run build
 *
 * @links
 * https://developer.mozilla.org/en-US/docs/Web/API/Node
 * https://developer.mozilla.org/en-US/docs/Web/API/Element
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 * https://github.com/jakearchibald/es6-promise
 * http://www.html5rocks.com/en/tutorials/es6/promises/
 *
 *
 */
(function ( factory ) {

    if ( true ) {
        module.exports = factory();

    } else if ( typeof window !== "undefined" ) {
        window.hobo = factory();
    }

})(function () {

    var Hobo = __webpack_require__( 1 ),
        utils = __webpack_require__( 0 );


    // Core Hobo methods:
    Hobo.prototype.on = __webpack_require__( 9 );
    Hobo.prototype.off = __webpack_require__( 8 );
    Hobo.prototype.data = __webpack_require__( 6 );
    Hobo.prototype.find = __webpack_require__( 7 );
    Hobo.prototype.addClass = __webpack_require__( 4 );
    Hobo.prototype.removeClass = __webpack_require__( 10 );


    // Extended Hobo methods:
    // @hobo-ext


    /**
     *
     * @public
     * @method hobo
     * @description Wrapper for `Hobo` instances.
     * @param {string} selector The parameter passed to `querySelectorAll`
     * @param {element} context The Element used to call `querySelectorAll`
     *
     */
    hobo = function ( selector, context ) {
        return new Hobo( selector, context );
    };


    // Attach Hobo utilities to `wrapper` method
    hobo.ajax = __webpack_require__( 5 );


    return hobo;

});


/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["hobo"] = __webpack_require__(12);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ })
/******/ ]);