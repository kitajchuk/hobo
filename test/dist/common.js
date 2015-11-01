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

	var hobo = __webpack_require__( 1 );
	var elems = hobo( ".js-element" );
	var foo = hobo( "#foo", document.body );
	var bar = foo.find( ".bar" );



	//console.log( elems );
	//console.log( foo );
	//console.log( bar );



	window.hobo = hobo;
	window.elems = elems;
	window.foo = foo;



	hobo.ajax({
	    url: "endpoint.json",
	    dataType: "json"

	}).then(function ( value ) {
	    console.log( "then", value );

	}).catch(function ( reason ) {
	    console.log( "catch", reason );
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 *
	 * 
	 *
	 * @hobo
	 * @author: kitajchuk
	 *
	 * @links
	 * https://www.npmjs.com/package/es6-promise
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

	    var version = "0.1.0",


	    makeArray = function ( nodes ) {
	        return [].slice.call( nodes );
	    },


	    makeId = function () {
	        return ("hobo" + ( version + Math.random() ).replace( /\D/g, "" ));
	    },


	    mapDataset = function ( node ) {
	        if ( !node.hoboData ) {
	            node.hoboData = {};
	        }

	        for ( var i in node.dataset ) {
	            node.hoboData[ i ] = node.dataset[ i ];
	        }
	    },


	    storeData = function ( data, node ) {
	        for ( var i in data ) {
	            node.hoboData[ i ] = data[ i ];
	        }
	    },


	    mergeData = function ( data, node ) {
	        for ( var i in node.hoboData ) {
	            if ( !data[ i ] ) {
	                data[ i ] = node.hoboData[ i ];
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
	    },


	    /**
	     *
	     * @constructor Hobo
	     *
	     */
	    Hobo = function ( selector, context ) {
	        this._context = (context || document);
	        this._nodeList = makeArray( this._context.querySelectorAll( selector ) )
	        this._length = this._nodeList.length;
	        this._hoboId = makeId();
	        this._nodeList.forEach( mapDataset.bind( this ) );
	    },


	    hobo;


	    Hobo.prototype.on = function ( event, delegate, handler ) {
	        return this;
	    };


	    Hobo.prototype.off = function ( event, handler ) {
	        return this;
	    };


	    Hobo.prototype.find = function ( selector ) {
	        return new Hobo( selector, this._context );
	    };


	    Hobo.prototype.data = function ( key, value ) {
	        // Any `non-unique` data keys resolve to the first unique occurrence
	        // Exactly how jQuery handles `.data( ... )` on multi-node collections

	        var ret = this,
	            obj = null;

	        // Storing data from an Object
	        if ( typeof key === "object" ) {
	            obj = key;

	            this._nodeList.forEach( storeData.bind( this, obj ) );

	        // Storing data as a `key:value` pair
	        } else if ( value ) {
	            obj = {};
	            obj[ key ] = value;

	            this._nodeList.forEach( storeData.bind( this, obj ) );

	        // Accessing data by `key`
	        } else if ( key ) {
	            this._nodeList.forEach((function ( node ) {
	                if ( obj !== null ) {
	                    return;
	                }

	                for ( var i in node.hoboData ) {
	                    if ( i === key ) {
	                        obj = node.hoboData[ i ];
	                        break;
	                    }
	                }

	            }).bind( this ));

	            ret = obj;

	        // Accessing all data
	        // Merges all `unique` data for a `_nodeList`
	        } else {
	            obj = {};

	            this._nodeList.forEach( mergeData.bind( this, obj ) );

	            ret = obj;
	        }

	        return ret;
	    };


	    Hobo.prototype.addClass = function ( classes ) {
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
	    };


	    Hobo.prototype.removeClass = function ( classes ) {
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
	    };


	    /**
	     *
	     * @method hobo
	     * @description Wrapper for Hobo instances. Avoids `new Hobo( ... )` in your code
	     *
	     */
	    hobo = function ( selector, context ) {
	        return new Hobo( selector, context );
	    };


	    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
	    hobo.ajax = function ( config ) {
	        // dataType can be `html` or `json`

	        var xhr = new XMLHttpRequest(),
	            url = config.url || window.location.href,
	            data = serializeData( config.data || {} ),
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


	    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
	    hobo.promise = function ( executor ) {
	        return new Promise( executor );
	    };


	    return hobo;

	});

/***/ }
/******/ ]);