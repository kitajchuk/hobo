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