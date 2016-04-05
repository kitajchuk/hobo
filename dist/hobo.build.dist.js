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
	 * @method hobo
	 * @author kitajchuk
	 * @hobo-dist npm run build -- is eq not one next prev attr last first index parent filter detach append remove trigger prepend closest children removeAttr toggleClass
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
	        utils = __webpack_require__( 2 );


	    // Core Hobo methods:
	    Hobo.prototype.on = __webpack_require__( 3 );
	    Hobo.prototype.off = __webpack_require__( 5 );
	    Hobo.prototype.data = __webpack_require__( 6 );
	    Hobo.prototype.find = __webpack_require__( 7 );
	    Hobo.prototype.addClass = __webpack_require__( 8 );
	    Hobo.prototype.removeClass = __webpack_require__( 9 );


	    // Extended Hobo methods:
	    Hobo.prototype.is = __webpack_require__( 10 );
	    Hobo.prototype.eq = __webpack_require__( 11 );
	    Hobo.prototype.not = __webpack_require__( 12 );
	    Hobo.prototype.one = __webpack_require__( 13 );
	    Hobo.prototype.next = __webpack_require__( 14 );
	    Hobo.prototype.prev = __webpack_require__( 15 );
	    Hobo.prototype.attr = __webpack_require__( 16 );
	    Hobo.prototype.last = __webpack_require__( 17 );
	    Hobo.prototype.first = __webpack_require__( 18 );
	    Hobo.prototype.index = __webpack_require__( 19 );
	    Hobo.prototype.parent = __webpack_require__( 20 );
	    Hobo.prototype.filter = __webpack_require__( 21 );
	    Hobo.prototype.detach = __webpack_require__( 22 );
	    Hobo.prototype.append = __webpack_require__( 23 );
	    Hobo.prototype.remove = __webpack_require__( 24 );
	    Hobo.prototype.trigger = __webpack_require__( 25 );
	    Hobo.prototype.prepend = __webpack_require__( 26 );
	    Hobo.prototype.closest = __webpack_require__( 27 );
	    Hobo.prototype.children = __webpack_require__( 28 );
	    Hobo.prototype.removeAttr = __webpack_require__( 29 );
	    Hobo.prototype.toggleClass = __webpack_require__( 30 );


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
	    hobo.ajax = __webpack_require__( 31 );


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
	var utils = __webpack_require__( 2 ),
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

/***/ },
/* 2 */
/***/ function(module, exports) {

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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var matchElement = __webpack_require__( 4 ),
	    utils = __webpack_require__( 2 );


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

/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports) {

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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__( 2 );


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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Hobo = __webpack_require__( 1 ),
	    utils = __webpack_require__( 2 );


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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__( 2 );


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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__( 2 );


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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Hobo = __webpack_require__( 1 ),
	    matchElement = __webpack_require__( 4 );


	/**
	 *
	 * @instance
	 * @memberof Hobo
	 * @method is
	 * @param {string} selector The selector to match elements against
	 * @description Determine if a node set is this selector.
	 * @returns {boolean}
	 *
	 */
	module.exports = function ( selector ) {
	    return (matchElement( this[ 0 ], selector ) ? true : false);
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Hobo = __webpack_require__( 1 );


	/**
	 *
	 * @instance
	 * @memberof Hobo
	 * @method eq
	 * @param {number} i The indexOf the element
	 * @description Get the element at the index as a Hobo instance.
	 * @returns {Hobo}
	 *
	 */
	module.exports = function ( i ) {
	    return i < this.length 
	            ? new Hobo(
	                this[ i ],
	                this._context
	            ) 
	            : this;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var matchElement = __webpack_require__( 4 ),
	    Hobo = __webpack_require__( 1 );


	/**
	 *
	 * @instance
	 * @memberof Hobo
	 * @method not
	 * @param {string} selector The selector to filter out elements
	 * @description Filter out elements that are NOT this selector
	 * @returns {Hobo}
	 *
	 */
	module.exports = function ( selector ) {
	    var keepers = new Hobo( [], this._context );

	    // Hobo instance
	    if ( selector instanceof Hobo ) {
	        this.forEach(function ( node ) {
	            var pushNode = true;

	            selector.forEach(function ( elem ) {
	                if ( node === elem ) {
	                    pushNode = false;
	                }
	            });

	            if ( pushNode ) {
	                keepers.push( node );
	            }
	        });

	    } else {
	        this.forEach(function ( node, i ) {
	            if ( typeof selector === "function" ) {
	                if ( selector( i, node ) ) {
	                    keepers.push( node );
	                }

	            } else if ( !matchElement( node, selector ) ) {
	                keepers.push( node );
	            }
	        });
	    }

	    return keepers;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var matchElement = __webpack_require__( 4 ),
	    utils = __webpack_require__( 2 );


	/**
	 *
	 * @instance
	 * @memberof Hobo
	 * @method one
	 * @description Bind a standard DOM Event only ONE time.
	 * @param {string} event 
	 * @param {string} selector 
	 * @param {function} callback
	 * @returns {Hobo}
	 *
	 */
	module.exports = function ( event, selector, callback ) {
	    var self = this;

	    if ( !callback ) {
	        callback = selector;
	        selector = this._selector;
	    }

	    return this.on( event, selector, function once ( e ) {
	        // Apply `this` - which is the Element context
	        callback.call( this, e );

	        self.off( event, once );
	    });
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Hobo = __webpack_require__( 1 ),
	    matchElement = __webpack_require__( 4 );



	/**
	 *
	 * @instance
	 * @memberof Hobo
	 * @method next
	 * @param {string} selector Optional selector to match
	 * @description Get the next sibling, test against selector
	 * @returns {Hobo}
	 *
	 */
	module.exports = function ( selector ) {
	    var ret = [];

	    this.forEach(function ( node ) {
	        var nextNode = node.nextSibling;

	        while ( nextNode && nextNode.nodeType !== 1 ) {
	            nextNode = nextNode.nextSibling;
	        }

	        if ( nextNode && (!selector || (selector && matchElement( nextNode, selector ))) ) {
	            ret.push( nextNode );
	        }
	    });

	    return new Hobo( ret, this._context );
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Hobo = __webpack_require__( 1 ),
	    matchElement = __webpack_require__( 4 );



	/**
	 *
	 * @instance
	 * @memberof Hobo
	 * @method prev
	 * @param {string} selector Optional selector to match
	 * @description Get the previous sibling, test against selector
	 * @returns {Hobo}
	 *
	 */
	module.exports = function ( selector ) {
	    var ret = [];

	    this.forEach(function ( node ) {
	        var prevNode = node.previousSibling;

	        while ( prevNode && prevNode.nodeType !== 1 ) {
	            prevNode = nextNode.previousSibling;
	        }

	        if ( prevNode && (!selector || (selector && matchElement( prevNode, selector ))) ) {
	            ret.push( prevNode );
	        }
	    });

	    return new Hobo( ret, this._context );
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__( 2 );


	/**
	 *
	 * @instance
	 * @memberof Hobo
	 * @method addAttr
	 * @param {element} node The element to set attribute on
	 * @param {string} key The attribute
	 * @param {mixed} value The value to set
	 * @description Get or Set an attribute(s) on a DOM node
	 * @returns {string}
	 *
	 */
	var addAttr = function ( node, key, value ) {
	    node.setAttribute( key, value );

	    // Apply data()?
	    if ( utils.rData.test( key ) ) {
	        // storeData expects a {data object}
	        var obj = {};

	        obj[ key.replace( utils.rData, "" ) ] = value;

	        utils.storeData( obj, node );
	    }
	};


	/**
	 *
	 * @instance
	 * @memberof Hobo
	 * @method attr
	 * @param {string} key The attribute
	 * @param {mixed} value The value to set
	 * @description Get or Set an attribute(s) on a DOM node
	 * @returns {string}
	 *
	 */
	module.exports = function ( key, value ) {
	    var ret = this;

	    // Value can be an {object}
	    if ( typeof key === "object" ) {
	        for ( var i in key ) {
	            this.forEach(function ( node ) {
	                addAttr( node, i, key[ i ] );
	            });
	        }

	    // Value could possibly be "" or 0
	    } else if ( value !== undefined ) {
	        this.forEach(function ( node ) {
	            addAttr( node, key, value );
	        });

	    } else {
	        ret = this[ 0 ].getAttribute( key );
	    }

	    return ret;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var Hobo = __webpack_require__( 1 );


	/**
	 *
	 * @instance
	 * @memberof Hobo
	 * @method last
	 * @description Get hobo instance of the last element.
	 * @returns {Hobo}
	 *
	 */
	module.exports = function () {
	    return new Hobo( this[ (this.length - 1) ], this._context );
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var Hobo = __webpack_require__( 1 );


	/**
	 *
	 * @instance
	 * @memberof Hobo
	 * @method first
	 * @description Get hobo instance of the first element.
	 * @returns {Hobo}
	 *
	 */
	module.exports = function () {
	    return new Hobo( this[ 0 ], this._context );
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 *
	 * @instance
	 * @memberof Hobo
	 * @method index
	 * @description Get the nodes index compared to its DOM siblings.
	 *              Possibly this should be its index in the Hobo set?
	 * @returns {number}
	 *
	 */
	module.exports = function () {
	    return [].indexOf.call(
	        this[ 0 ].parentNode.children,
	        this[ 0 ]
	    );
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var Hobo = __webpack_require__( 1 ),
	    matchElement = __webpack_require__( 4 );


	/**
	 *
	 * @instance
	 * @memberof Hobo
	 * @method parent
	 * @param {string} selector Optional selector to match
	 * @description Get a Hobo instance of the parent node of this instance.
	 * @returns {Hobo}
	 *
	 */
	module.exports = function ( selector ) {
	    var parents = [];

	    this.forEach(function ( node ) {
	        if ( !selector || (selector && matchElement( node.parentNode, selector )) ) {
	            parents.push( node.parentNode );
	        }
	    });

	    return new Hobo( parents, null );
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var Hobo = __webpack_require__( 1 ),
	    matchElement = __webpack_require__( 4 );


	/**
	 *
	 * @instance
	 * @memberof Hobo
	 * @method filter
	 * @param {string} selector The selector to match elements against
	 * @description Filter out the elements that match the selector.
	 * @returns {Hobo}
	 *
	 */
	module.exports = function ( selector ) {
	    var filtered = [];

	    this.forEach(function ( node ) {
	        if ( matchElement( node, selector ) ) {
	            filtered.push( node );
	        }
	    });

	    return new Hobo( filtered, null );
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	/**
	 *
	 * @instance
	 * @memberof Hobo
	 * @method detach
	 * @description Detach the nodes from the DOM
	 *              This method does NOT remove events or data.
	 * @returns {Hobo}
	 *
	 */
	module.exports = function () {
	    this.forEach(function ( node ) {
	        if ( node.parentNode ) {
	            node.parentNode.removeChild( node );
	        }
	    });

	    return this;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var Hobo = __webpack_require__( 1 );


	/**
	 *
	 * @instance
	 * @memberof Hobo
	 * @method append
	 * @param {mixed} appendage What to append? Hobo, Element...
	 * @description Append the nodes to the DOM
	 * @returns {Hobo}
	 *
	 */
	module.exports = function ( appendage ) {
	    // Selector string, wrap in new Hobo instance
	    if ( typeof appendage === "string" ) {
	        appendage = new Hobo( appendage );
	    }

	    this.forEach(function ( node ) {
	        // Hobo instance OR Array OR Array-like object with forEach
	        if ( appendage instanceof Hobo || (appendage.length && typeof appendage.forEach === "function") ) {
	            appendage.forEach(function ( append ) {
	                if ( append.nodeType && append.nodeType === 1 ) {
	                    node.appendChild( append );
	                }
	            });

	        } else if ( appendage.nodeType ) {
	            node.appendChild( appendage );
	        }
	    });

	    return this;
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	/**
	 *
	 * @instance
	 * @memberof Hobo
	 * @method remove
	 * @description Remove the nodes from the DOM
	 *              This method will remove events and data.
	 * @returns {Hobo}
	 *
	 */
	module.exports = function () {
	    // Remove Events
	    this.off();

	    this.forEach(function ( node ) {
	        // Remove Data
	        // Could this cause issues ?
	        delete node.hoboDataMap;

	        if ( node.parentNode ) {
	            node.parentNode.removeChild( node );
	        }
	    });

	    return this;
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	/**
	 *
	 * @instance
	 * @memberof Hobo
	 * @method trigger
	 * @description Dispatch a simulated event.
	 * @param {string} event The event to dispatch
	 * @returns {Hobo}
	 *
	 */
	module.exports = function ( event ) {
	    var self = this,
	        evo,
	        id;

	    this.forEach(function ( node ) {
	        for ( id in self._events[ event ] ) {
	            if ( self._events[ event ].hasOwnProperty( id ) ) {
	                evo = self._events[ event ][ id ];

	                // Match the nodes
	                if ( evo.node === node ) {
	                    evo = document.createEvent( "Events" );

	                    evo.initEvent( event, true, false );

	                    node.dispatchEvent( evo );
	                }
	            }
	        }
	    });

	    return this;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var Hobo = __webpack_require__( 1 );


	/**
	 *
	 * @instance
	 * @memberof Hobo
	 * @method prepend
	 * @param {mixed} prependage What to prepend? Hobo, Element...
	 * @description Append the nodes to the DOM
	 * @returns {Hobo}
	 *
	 */
	module.exports = function ( prependage ) {
	    // Selector string, wrap in new Hobo instance
	    if ( typeof prependage === "string" ) {
	        prependage = new Hobo( prependage );
	    }

	    this.forEach(function ( node ) {
	        // Hobo instance OR Array OR Array-like object with forEach
	        if ( prependage instanceof Hobo || (prependage.length && typeof prependage.forEach === "function") ) {
	            prependage.forEach(function ( prepend ) {
	                if ( prepend.nodeType && prepend.nodeType === 1 ) {
	                    // https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
	                    // Context node inserts first element BEFORE second element
	                    node.insertBefore( prepend, node.firstChild );
	                }
	            });

	        } else if ( prependage.nodeType ) {
	            node.insertBefore( prependage, node.firstChild );
	        }
	    });

	    return this;
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var Hobo = __webpack_require__( 1 ),
	    matchElement = __webpack_require__( 4 );


	/**
	 *
	 * @instance
	 * @memberof Hobo
	 * @method closest
	 * @param {string} selector The selector to try and match
	 * @description Find the first ancestor element with this selector
	 * @returns {Hobo}
	 *
	 */
	module.exports = function ( selector ) {
	    var closest = [];

	    this.forEach(function ( node ) {
	        var match = matchElement( node, selector, true );

	        if ( match ) {
	            closest.push( match );
	        }
	    });

	    return new Hobo( closest, null );
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var Hobo = __webpack_require__( 1 ),
	    utils = __webpack_require__( 2 );



	/**
	 *
	 * @instance
	 * @memberof Hobo
	 * @method children
	 * @description Gather all child nodes that are NOT text nodes
	 * @returns {Hobo}
	 *
	 */
	module.exports = function () {
	    var children = [],
	        len,
	        i;

	    this.forEach(function ( node ) {
	        i = 0;
	        len = node.children.length;

	        for ( i; i < len; i++ ) {
	            children.push( node.children[ i ] );
	        }
	    });

	    return new Hobo( children, this._context );
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__( 2 );


	/**
	 *
	 * @instance
	 * @memberof Hobo
	 * @method removeAttr
	 * @description Remove the specified attribute from each node in the set.
	 * @returns {Hobo}
	 *
	 * @note This method needs to update data() in case we remove data-attr's
	 *
	 */
	module.exports = function ( attr ) {
	    this.forEach(function ( node ) {
	        node.removeAttribute( attr );

	        // Remove data()?
	        if ( utils.rData.test( attr ) ) {
	            utils.removeData( attr.replace( utils.rData, "" ), node );
	        }
	    });

	    return this;
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var Hobo = __webpack_require__( 1 ),
	    matchElement = __webpack_require__( 4 );


	/**
	 *
	 * @instance
	 * @memberof Hobo
	 * @method toggleClass
	 * @description Add or remove the specified classNames.
	 * @param {string} classes The space-separated classNames
	 * @returns {Hobo}
	 *
	 */
	module.exports = function ( classes ) {
	    classes = classes.split( " " );

	    this.forEach(function ( node ) {
	        classes.forEach(function ( klass ) {
	            if ( matchElement( node, ("." + klass) ) ) {
	                new Hobo( node, null ).removeClass( klass );

	            } else {
	                new Hobo( node, null ).addClass( klass );
	            }
	        });
	    });

	    return this;
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__( 2 );


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

/***/ }
/******/ ]);