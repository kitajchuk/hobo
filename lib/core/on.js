var matchElement = require( "properjs-matchelement" ),
    utils = require( "../utils" );


/**
 *
 * @instance
 * @memberof Hobo
 * @method on
 * @description Bind a standard DOM Event. Honor delegation as a primary.
 * @param {string} event 
 * @param {string} selector 
 * @param {function} callback
 * @returns {Hobo}
 *
 */
module.exports = function ( event, selector, callback ) {
    var nativeEvent = event;

    // Normalize `selector` for event delegation
    // Normalize `callback` in case no delegate selector was passed
    if ( !callback ) {
        callback = selector;
        selector = this._selector;
    }

    // Does this event type have an index yet
    if ( !this._events[ event ] ) {
        this._events[ event ] = {};
    }

    this.forEach((function ( node ) {
        // Unique ID for each node event
        var eventId = (utils.makeId() + "EVENT");

        // Normalize event handler with a small wrapper function
        var handler = function ( e ) {
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
            nativeEvent = "mouseover";

        } else if ( event === "mouseleave" ) {
            nativeEvent = "mouseout";
        }

        // Each handler/callback pair gets stored in an `events` index
        this._events[ event ][ eventId ] = {
            id: eventId,
            type: nativeEvent,
            node: node,
            handler: handler,
            callback: callback
        };

        node.addEventListener( nativeEvent, handler, false );

    // Bind @this hobo context
    }).bind( this ));

    return this;
};