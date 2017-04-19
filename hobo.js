/*!
 *
 *
 * Hobo
 * A very small, modular DOM utility for modern web apps.
 * @hobo-dist npm run build
 *
 * @links
 * https://developer.mozilla.org/en-US/docs/Web/API/Node
 * https://developer.mozilla.org/en-US/docs/Web/API/Element
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 * https://github.com/jakearchibald/es6-promise
 * http://www.html5rocks.com/en/tutorials/es6/promises/
 *
 *
 */
(function ( factory ) {

    if ( typeof exports === "object" && typeof module !== "undefined" ) {
        module.exports = factory();

    } else if ( typeof window !== "undefined" ) {
        window.hobo = factory();
    }

})(function () {

    var Hobo = require( "./lib/Hobo" ),
        utils = require( "./lib/utils" );


    // Core Hobo methods:
    Hobo.prototype.on = require( "./lib/core/on" );
    Hobo.prototype.off = require( "./lib/core/off" );
    Hobo.prototype.data = require( "./lib/core/data" );
    Hobo.prototype.find = require( "./lib/core/find" );
    Hobo.prototype.addClass = require( "./lib/core/addClass" );
    Hobo.prototype.removeClass = require( "./lib/core/removeClass" );


    // Extended Hobo methods:
    // @hobo-ext


    /**
     *
     * @global
     * @public
     * @method hobo
     * @description Wrapper for `Hobo` instances.
     * @param {string} selector The parameter passed to `querySelectorAll`
     * @param {element} context The Element used to call `querySelectorAll`
     * @returns {Hobo}
     *
     */
    hobo = function ( selector, context ) {
        return new Hobo( selector, context );
    };


    // Attach Hobo utilities to `wrapper` method
    hobo.ajax = require( "./lib/core/ajax" );


    return hobo;

});
