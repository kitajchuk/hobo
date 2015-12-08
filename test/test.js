window.hobo = require( "../hobo" );



// Test core

// Test core: constructor
window.els = hobo( ".js-element", document.body );
window.foo = hobo( "#foo" );

// Test core: find
window.bar = foo.find( ".bar" );
window.bars = els.find( ".bar" );

// Test core: addClass / removeClass
window.bars.addClass( "added-class" );
window.bars.removeClass( "bar" );

// Test core: data
window.foo.data( "bk", "sucks" );

// Test core: on / off
window.fooHandler = function ( e ) {
    console.log( "event:foo", e, window.foo.data() );

    window.foo.off( "click", window.fooHandler );
};
window.barHandler = function ( e ) {
    console.log( "event:bar", e );
};
window.foo.on( "click", window.fooHandler );
window.foo.on( "click", ".bar", window.barHandler );

// Test core: ajax / promise
hobo.ajax({
    url: "endpoint.json",
    dataType: "json"

}).then(function ( value ) {
    console.log( "ajax:then", value );

}).catch(function ( reason ) {
    console.log( "ajax:catch", reason );
});