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