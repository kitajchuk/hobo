var matchElement = require( "properjs-matchelement" ),
    utils = require( "../utils" );


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