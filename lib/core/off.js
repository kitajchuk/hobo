/**
 *
 * @instance
 * @memberof Hobo
 * @method off
 * @description Un-Bind a standard DOM Event.
 * @param {string} event The event type
 * @param {function} callback The supplied callback
 * @returns {Hobo}
 *
 */
module.exports = function ( event, callback ) {
    var self = this,
        type,
        evo,
        id;

    this.forEach(function ( node ) {
        // Remove a single handler for an event type
        if ( callback ) {
            for ( id in self._events[ event ] ) {
                if ( self._events[ event ].hasOwnProperty( id ) ) {
                    evo = self._events[ event ][ id ];

                    // Match the nodes, Match the callback
                    if ( evo.node === node && evo.callback === callback ) {
                        node.removeEventListener( evo.type, evo.handler, false );

                        delete self._events[ event ][ id ];
                    }
                }
            }

        // Remove all handlers for an event type
        } else if ( event ) {
            for ( id in self._events[ event ] ) {
                if ( self._events[ event ].hasOwnProperty( id ) ) {
                    evo = self._events[ event ][ id ];

                    // Match the nodes
                    if ( evo.node === node ) {
                        node.removeEventListener( evo.type, evo.handler, false );

                        delete self._events[ event ][ id ];
                    }
                }
            }

        // Remove all handlers for all event types
        } else {
            for ( type in self._events ) {
                if ( self._events.hasOwnProperty( type ) ) {
                    for ( id in self._events[ type ] ) {
                        if ( self._events[ type ].hasOwnProperty( id ) ) {
                            evo = self._events[ type ][ id ];

                            // Match the nodes
                            if ( evo.node === node ) {
                                node.removeEventListener( evo.type, evo.handler, false );

                                delete self._events[ type ][ id ];
                            }
                        }
                    }
                }
            }
        }
    });

    return this;
};