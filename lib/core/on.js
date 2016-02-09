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
    // Normalize `selector` for event delegation
    // Normalize `callback` in case no delegate selector was passed
    if ( !callback ) {
        callback = selector;
        selector = this._selector;
    }

    // Normalize event handler with a small wrapper function
    var handler = function ( e ) {
        var ctx = matchElement( e.target, selector, true );

        // Only apply handler if ctx is not null
        if ( ctx ) {
            callback.call( ctx, e );
        }
    };

    // Each handler gets a unique ID ref
    handler.hoboId = utils.makeId();

    // Each handler/callback pair gets stored in an `events` index
    this._events[ handler.hoboId ] = {
        type: event,
        handler: handler,
        callback: callback
    };

    this._context.addEventListener( event, handler, false );

    return this;
};