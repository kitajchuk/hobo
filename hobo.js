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

    if ( typeof exports === "object" && typeof module !== "undefined" ) {
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
        node[ this._hoboId ] = {};

        for ( var i in node.dataset ) {
            node[ this._hoboId ][ i ] = node.dataset[ i ];
        }
    },


    storeData = function ( data, node ) {
        for ( var i in data ) {
            node[ this._hoboId ][ i ] = data[ i ];
        }
    },


    mergeData = function ( data, node ) {
        for ( var i in node[ this._hoboId ] ) {
            if ( !data[ i ] ) {
                data[ i ] = node[ this._hoboId ][ i ];
            }
        }
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

                for ( var i in node[ this._hoboId ] ) {
                    if ( i === key ) {
                        obj = node[ this._hoboId ][ i ];
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


    hobo.ajax = function ( config ) {
        
    };


    hobo.promise = function () {
        
    };


    return hobo;

});