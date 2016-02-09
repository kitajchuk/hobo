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
    var id;

    // Remove a single handler for an event type
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

    // Remove all handlers for an event type
    } else if ( event ) {
        for ( id in this._events ) {
            // Make sure we stick to the event type
            if ( this._events[ id ].type === event ) {
                this._context.removeEventListener( event, this._events[ id ].handler, false );

                delete this._events[ id ];
            }
        }

    // Remove all handlers for all event types
    } else {
        for ( id in this._events ) {
            this._context.removeEventListener( event, this._events[ id ].handler, false );

            delete this._events[ id ];
        }
    }

    return this;
};