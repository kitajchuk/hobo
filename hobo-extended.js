/*!
 *
 *
 * @hobo
 * @author: kitajchuk
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

    var HoboExtended = require( "./lib/HoboExtended" ),
        utils = require( "./lib/utils" ),
        ajax = require( "./lib/ajax" ),
        promise = require( "./lib/promise" ),


        /**
         *
         * @public
         * @method hobo
         * @description Wrapper for `Hobo` instances.
         * @param {string} selector The parameter passed to `querySelectorAll`
         * @param {element} context The Element used to call `querySelectorAll`
         *
         */
        hobo = function ( selector, context ) {
            return new HoboExtended( selector, context );
        };


    /**
     *
     * @public
     * @method ajax
     * @description Perform standar XHR with a native Promise.
     * @param {object} config The jQuery-like ajax config object
     *                        url       =>   string
     *                        data      =>   object
     *                        dataType  =>   string
     *                        method    =>   string
     * @returns {Promise}
     *
     */
    hobo.ajax = ajax;


    /**
     *
     * @public
     * @method promise
     * @description Wrapper method returns a native Promise.
     * @param {function} executor The function passed to the Promise constructor
     * @returns {Promise}
     *
     */
    hobo.promise = promise;


    return hobo;

});