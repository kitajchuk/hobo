window.hobo = require( "../hobo-extended" );



window.els = hobo( ".js-element", document.body );
window.foo = hobo( "#foo" );
window.bar = foo.find( ".bar" );
window.bars = els.find( ".bar" );
window.fooHandler = function ( e ) {
    console.log( "foo", e );
};
window.barHandler = function ( e ) {
    console.log( "bar", e );
};



console.log( "els", els );
console.log( "foo", foo );
console.log( "bar", bar );
console.log( "bars", bars );



window.foo.on( "click", window.fooHandler );
window.foo.on( "click", ".bar", window.barHandler );



hobo.ajax({
    url: "endpoint.json",
    dataType: "json"

}).then(function ( value ) {
    console.log( "then", value );

}).catch(function ( reason ) {
    console.log( "catch", reason );
});