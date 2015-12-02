/*!
 *
 * 
 * @Hobo
 * @author: kitajchuk
 *
 *
 */
var matchElement = require( "properjs-matchelement" ),

    utils = require( "./utils" ),


    /**
     *
     * @private
     * @class Hobo
     * @classdesc All the things you want without all the cruft.
     * @param {string} selector The parameter passed to `querySelectorAll`
     *                          Optionally you can pass the nodelist Array too.
     *                          This is really just for the use of hobo().find().
     * @param {element} context The Element used to call `querySelectorAll`
     * @param {array} nodelist An already formed array of nodes
     *
     */
    Hobo = function ( selector, context, nodelist ) {
        // Hobo instance properties
        this._context = (context && context.nodeType && context.nodeType === 1 ? context : document);
        this._nodeList = (Array.isArray( nodelist ) ? nodelist : utils.makeArray( this._context.querySelectorAll( selector ) ));
        this._selector = selector;

        // Hobo initialization steps
        // This performs an initial mapping of each node's DOMStringMap to its `hoboDataMap`
        this._nodeList.forEach( utils.mapDataset.bind( this ) );

        // Hobo version?
        this._version = utils.version;

        // Hobo events store
        this._events = {};

        // Hobo length?
        this._length = this._nodeList.length;
    };


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
Hobo.prototype.find = function ( selector ) {
    var ret = this;

    // If we are `finding` within a multi-node collection...
    // Here its probably faster to grab the nodes within each Node
    // and then just let the context be the document for the new instance. 
    if ( this._nodeList.length > 1 ) {
        ret = [];

        this._nodeList.forEach(function ( node ) {
            ret = ret.concat( utils.makeArray( node.querySelectorAll( selector ) ) );
        });

        ret = new Hobo( selector, null, ret );

    // Otherwise we can assume to use our single node as context
    } else {
        ret = new Hobo( selector, this._nodeList[ 0 ] );
    }

    return ret;
};


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
Hobo.prototype.data = function ( key, value ) {
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


/**
 *
 * @public
 * @instance
 * @method addClass
 * @description Add one or more classNames to the nodes.
 * @param {string} classes The space-separated classNames
 *
 */
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

    return this;
};


/**
 *
 * @public
 * @instance
 * @method removeClass
 * @description Remove one or more classNames from the nodes.
 * @param {string} classes The space-separated classNames
 *
 */
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

    return this;
};


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
Hobo.prototype.on = function ( event, selector, callback ) {
    // Normalize `selector` for event delegation
    // Normalize `callback` in case no delegate selector was passed
    if ( !callback ) {
        callback = selector;
        selector = this._selector;
    }

    // Normalize event handler with a small wrapper function
    var handler = function ( e ) {
        var ctx = matchElement( e.target, selector );

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
Hobo.prototype.off = function ( event, callback ) {
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


module.exports = Hobo;