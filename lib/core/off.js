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
    var type,
        evo,
        id;

    this.forEach((function ( node ) {
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
        } else if ( event ) {
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

        // Remove all handlers for all event types
        } else {
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
        }

    }).bind( this ));

    return this;
};