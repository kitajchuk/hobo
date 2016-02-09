/**
 *
 * @instance
 * @memberof Hobo
 * @method off
 * @description Un-Bind a standard DOM Event.
 * @param {string} event 
 * @param {function} callback
 * @returns {Hobo}
 *
 */
module.exports = function ( event, callback ) {
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