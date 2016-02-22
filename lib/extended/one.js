var matchElement = require( "properjs-matchelement" ),
    utils = require( "../utils" );


/**
 *
 * @instance
 * @memberof Hobo
 * @method one
 * @description Bind a standard DOM Event only ONE time.
 * @param {string} event 
 * @param {string} selector 
 * @param {function} callback
 * @returns {Hobo}
 *
 */
module.exports = function ( event, selector, callback ) {
    var self = this;

    if ( !callback ) {
        callback = selector;
        selector = this._selector;
    }

    return this.on( event, selector, function once ( e ) {
        // Apply `this` - which is the Element context
        callback.call( this, e );

        self.off( event, once );
    });
};