/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 *
	 *
	 * @hobo
	 * @author: kitajchuk
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
	        utils = __webpack_require__( 3 );


	    // Core Hobo methods
	    Hobo.prototype.on = __webpack_require__( 4 );
	    Hobo.prototype.off = __webpack_require__( 5 );
	    Hobo.prototype.data = __webpack_require__( 6 );
	    Hobo.prototype.find = __webpack_require__( 7 );
	    Hobo.prototype.addClass = __webpack_require__( 8 );
	    Hobo.prototype.removeClass = __webpack_require__( 9 );


	    // Extended Hobo methods
	    // Ultimately these will be removed
	    Hobo.prototype.eq = __webpack_require__( 10 );
	    Hobo.prototype.map = __webpack_require__( 11 );
	    Hobo.prototype.attr = __webpack_require__( 12 );
	    Hobo.prototype.index = __webpack_require__( 13 );
	    Hobo.prototype.parent = __webpack_require__( 14 );
	    Hobo.prototype.filter = __webpack_require__( 15 );
	    Hobo.prototype.append = __webpack_require__( 16 );
	    Hobo.prototype.remove = __webpack_require__( 17 );
	    Hobo.prototype.detach = __webpack_require__( 18 );
	    Hobo.prototype.trigger = __webpack_require__( 19 );
	    Hobo.prototype.prepend = __webpack_require__( 20 );
	    Hobo.prototype.closest = __webpack_require__( 21 );
	    Hobo.prototype.appendTo = __webpack_require__( 22 );
	    Hobo.prototype.children = __webpack_require__( 23 );
	    Hobo.prototype.prependTo = __webpack_require__( 24 );
	    Hobo.prototype.toggleClass = __webpack_require__( 25 );
	    Hobo.prototype.insertAfter = __webpack_require__( 26 );
	    Hobo.prototype.insertBefore = __webpack_require__( 27 );


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
	    hobo.ajax = __webpack_require__( 28 );
	    hobo.promise = __webpack_require__( 29 );


	    return hobo;

	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 *
	 * 
	 * @Hobo
	 * @author: kitajchuk
	 *
	 *
	 */
	var matchElement = __webpack_require__( 2 ),
	    utils = __webpack_require__( 3 );


	/**
	 *
	 * @private
	 * @class Hobo
	 * @classdesc All the things you want without all the cruft.
	 * @param {string} selector The goods - String, Element, Collection.
	 * @param {element} context The Element used to call `querySelectorAll`
	 *
	 */
	module.exports = function Hobo( selector, context ) {
	    // Hobo version?
	    this._hobo = utils.version;

	    // Hobo context
	    this._context = (context && context.nodeType && context.nodeType === 1 ? context : document);

	    // Hobo selector / nodeList
	    // Hobo supports a mixed selector argument

	    // 0.1 => String
	    if ( typeof selector === "string" ) {
	        this._selector = selector;
	        this._nodeList = utils.makeArray( this._context.querySelectorAll( selector ) );

	    // 0.2 => DOMElement
	    } else if ( selector.nodeType ) {
	        this._selector = "";
	        this._nodeList = [ selector ];

	    // 0.3 => Collection: NodeList, HTMLCollection, Array
	    } else if ( selector.length ) {
	        this._selector = "";
	        this._nodeList = utils.makeArray( selector );
	    }

	    // Hobo initialization steps
	    // This performs an initial mapping of each node's DOMStringMap to its `hoboDataMap`
	    this._nodeList.forEach( utils.mapDataset.bind( this ) );

	    // Hobo events store
	    this._events = {};

	    // Hobo length?
	    this._length = this._nodeList.length;
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 3 */
/***/ function(module, exports) {

	/*!
	 *
	 *
	 * @HoboUtils
	 * @author: kitajchuk
	 *
	 *
	 */
	var version = "0.1.0",


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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var matchElement = __webpack_require__( 2 ),
	    utils = __webpack_require__( 3 );


	/**
	 *
	 * @public
	 * @instance
	 * @method on
	 * @description Bind a standard DOM Event. Honor delegation as a primary.
	 * @param {string} event 
	 * @param {string} selector 
	 * @param {function} callback
	 *
	 */
	module.exports = function ( event, selector, callback ) {
	    // Normalize `selector` for event delegation
	    // Normalize `callback` in case no delegate selector was passed
	    if ( !callback ) {
	        callback = selector;
	        selector = this._selector;
	    }

	    // Normalize event handler with a small wrapper function
	    var handler = function ( e ) {
	        var ctx = matchElement( e.target, selector, true );

	        // Only apply handler if ctx is not null
	        if ( ctx ) {
	            callback.call( ctx, e );
	        }
	    };

	    // Each handler gets a unique ID ref
	    handler.hoboId = utils.makeId();

	    // Each handler/callback pair gets stored in an `events` index
	    this._events[ handler.hoboId ] = {
	        type: event,
	        handler: handler,
	        callback: callback
	    };

	    this._context.addEventListener( event, handler, false );

	    return this;
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 *
	 * @public
	 * @instance
	 * @method off
	 * @description Un-Bind a standard DOM Event.
	 * @param {string} event 
	 * @param {function} callback
	 *
	 */
	module.exports = function ( event, callback ) {
	    var id;

	    // Remove a single handler
	    if ( callback ) {
	        for ( id in this._events ) {
	            // Make sure we stick to the event type
	            if ( this._events[ id ].type === event ) {
	                // Make sure the external callbacks match AND the handlers hoboId matches
	                if ( this._events[ id ].callback === callback && this._events[ id ].handler.hoboId === id ) {
	                    this._context.removeEventListener( event, this._events[ id ].handler, false );

	                    delete this._events[ id ];
	                }
	            }
	        }

	    // Remove all event handlers 
	    } else {
	        for ( id in this._events ) {
	            // Make sure we stick to the event type
	            if ( this._events[ id ].type === event ) {
	                this._context.removeEventListener( event, this._events[ id ].handler, false );

	                delete this._events[ id ];
	            }
	        }
	    }

	    return this;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__( 3 );


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

	        this._nodeList.forEach( utils.storeData.bind( this, obj ) );

	    // Storing data as a `key:value` pair
	    } else if ( value ) {
	        obj = {};
	        obj[ key ] = value;

	        this._nodeList.forEach( utils.storeData.bind( this, obj ) );

	    // Accessing data by `key`
	    } else if ( key ) {
	        this._nodeList.forEach((function ( node ) {
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

	        this._nodeList.forEach( utils.mergeData.bind( this, obj ) );

	        ret = obj;
	    }

	    return ret;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Hobo = __webpack_require__( 1 ),
	    utils = __webpack_require__( 3 );


	/**
	 *
	 * @public
	 * @instance
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
	    if ( this._nodeList.length > 1 ) {
	        ret = [];

	        this._nodeList.forEach(function ( node ) {
	            ret = ret.concat( utils.makeArray( node.querySelectorAll( selector ) ) );
	        });

	        ret = new Hobo( ret, null );

	    // Otherwise we can assume to use our single node as context
	    } else {
	        ret = new Hobo( selector, this._nodeList[ 0 ] );
	    }

	    return ret;
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 *
	 * @public
	 * @instance
	 * @method addClass
	 * @description Add one or more classNames to the nodes.
	 * @param {string} classes The space-separated classNames
	 *
	 */
	module.exports = function ( classes ) {
	    this._nodeList.forEach(function ( element ) {
	        var newClass = classes.split( " " ),
	            elsClass = element.className.split( " " );

	        newClass.forEach(function ( klass ) {
	            if ( elsClass.indexOf( klass ) === -1 ) {
	                elsClass.push( klass );
	            }
	        });

	        element.className = elsClass.join( " " );
	    });

	    return this;
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 *
	 * @public
	 * @instance
	 * @method removeClass
	 * @description Remove one or more classNames from the nodes.
	 * @param {string} classes The space-separated classNames
	 *
	 */
	module.exports = function ( classes ) {
	    this._nodeList.forEach(function ( element ) {
	        var oldClass = classes.split( " " ),
	            elsClass = element.className.split( " " );

	        oldClass.forEach(function ( klass ) {
	            if ( elsClass.indexOf( klass ) !== -1 ) {
	                elsClass.splice( elsClass.indexOf( klass ), 1 );
	            }
	        });

	        element.className = elsClass.join( " " );
	    });

	    return this;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Hobo = __webpack_require__( 1 );


	/**
	 *
	 * @public
	 * @method eq
	 * @description Get a Hobo instance for the node at an index.
	 * @returns {Hobo}
	 *
	 */
	module.exports = function ( i ) {
	    return i < this._length 
	            ? new Hobo(
	                this._nodeList[ i ],
	                this._context
	            ) 
	            : this;
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 *
	 * @public
	 * @method map
	 * @description Like Array map but for Hobo intances.
	 * @returns {this}
	 *
	 */
	module.exports = function ( fn ) {
	    this._nodeList.forEach(function ( node ) {
	        node = (fn( node ) || node);

	        return node;
	    });

	    return this;
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 *
	 * @public
	 * @method attr
	 * @description ...
	 * @returns {}
	 *
	 */
	module.exports = function ( i ) {
	    
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 *
	 * @public
	 * @method index
	 * @description Get the nodes index compared to its siblings.
	 * @returns {number}
	 *
	 */
	module.exports = function () {
	    return Array.prototype.indexOf.call(
	        this._nodeList[ 0 ].parentNode.children,
	        this._nodeList[ 0 ]
	    );
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Hobo = __webpack_require__( 1 );


	/**
	 *
	 * @public
	 * @method parent
	 * @description Get a Hobo instance of the parent node of this instance.
	 * @returns {Hobo}
	 *
	 */
	module.exports = function () {
	    return new Hobo(
	        this._nodeList[ 0 ].parentNode,
	        null
	    );
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Hobo = __webpack_require__( 1 ),
	    matchElement = __webpack_require__( 2 );


	/**
	 *
	 * @public
	 * @method parent
	 * @description Get a Hobo instance of the parent node of this instance.
	 * @returns {Hobo}
	 *
	 */
	module.exports = function ( selector ) {
	    var filtered = [];

	    this._nodeList.forEach(function ( node ) {
	        if ( matchElement( node, selector ) ) {
	            filtered.push( node );
	        }
	    });

	    return new Hobo( filtered, null );
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 *
	 * @public
	 * @method append
	 * @description ...
	 * @returns {}
	 *
	 */
	module.exports = function ( i ) {
	    
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 *
	 * @public
	 * @method remove
	 * @description ...
	 * @returns {}
	 *
	 */
	module.exports = function ( i ) {
	    
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 *
	 * @public
	 * @method detach
	 * @description ...
	 * @returns {}
	 *
	 */
	module.exports = function ( i ) {
	    
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 *
	 * @public
	 * @method trigger
	 * @description ...
	 * @returns {}
	 *
	 */
	module.exports = function ( i ) {
	    
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 *
	 * @public
	 * @method prepend
	 * @description ...
	 * @returns {}
	 *
	 */
	module.exports = function ( i ) {
	    
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	/**
	 *
	 * @public
	 * @method closest
	 * @description ...
	 * @returns {}
	 *
	 */
	module.exports = function ( i ) {
	    
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	/**
	 *
	 * @public
	 * @method appendTo
	 * @description ...
	 * @returns {}
	 *
	 */
	module.exports = function ( i ) {
	    
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	/**
	 *
	 * @public
	 * @method children
	 * @description ...
	 * @returns {}
	 *
	 */
	module.exports = function ( i ) {
	    
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	/**
	 *
	 * @public
	 * @method prependTo
	 * @description ...
	 * @returns {}
	 *
	 */
	module.exports = function ( i ) {
	    
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	/**
	 *
	 * @public
	 * @method toggleClass
	 * @description ...
	 * @returns {}
	 *
	 */
	module.exports = function ( i ) {
	    
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 *
	 * @public
	 * @method insertAfter
	 * @description ...
	 * @returns {}
	 *
	 */
	module.exports = function ( i ) {
	    
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	/**
	 *
	 * @public
	 * @method insertBefore
	 * @description ...
	 * @returns {}
	 *
	 */
	module.exports = function ( i ) {
	    
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__( 3 );


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

/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 *
	 * @public
	 * @method promise
	 * @description Wrapper method returns a native Promise.
	 * @param {function} executor The function passed to the Promise constructor
	 * @returns {Promise}
	 *
	 */
	module.exports = function ( executor ) {
	    return new Promise( executor );
	};

/***/ }
/******/ ]);