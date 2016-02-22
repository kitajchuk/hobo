/**
 *
 * @instance
 * @memberof Hobo
 * @method trigger
 * @description Dispatch a simulated event.
 * @param {string} event The event to dispatch
 * @returns {Hobo}
 *
 */
module.exports = function ( event ) {
    this.forEach((function ( node ) {
        for ( var id in this._events ) {
            if ( this._events[ id ].type === event ) {
                var eventObj = document.createEvent( "Events" );

                eventObj.initEvent( event, true, false );

                node.dispatchEvent( eventObj );
            }
        }

    }).bind( this ));

    return this;
};