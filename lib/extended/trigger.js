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
    var self = this,
        evo,
        id;

    this.forEach(function ( node ) {
        for ( id in self._events[ event ] ) {
            if ( self._events[ event ].hasOwnProperty( id ) ) {
                evo = self._events[ event ][ id ];

                // Match the nodes
                if ( evo.node === node ) {
                    evo = document.createEvent( "Events" );

                    evo.initEvent( event, true, false );

                    node.dispatchEvent( evo );
                }
            }
        }
    });

    return this;
};