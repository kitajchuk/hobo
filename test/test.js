var hobo = require( "../hobo" );
var elems = hobo( ".js-element" );
var foo = hobo( "#foo", document.body );
var bar = foo.find( ".bar" );



//console.log( elems );
//console.log( foo );
//console.log( bar );



window.hobo = hobo;
window.elems = elems;
window.foo = foo;



hobo.ajax({
    url: "endpoint.json",
    dataType: "json"

}).then(function ( value ) {
    console.log( "then", value );

}).catch(function ( reason ) {
    console.log( "catch", reason );
});