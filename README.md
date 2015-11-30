hobo
====

> All the things you want without all the cruft.



## Installation

```shell
npm install properjs-hobo --save-dev
```


## Usage
```javascript
var hobo = require( "properjs-hobo" );

// Hobo gives you a chainable method wrapper
hobo( ".js-element" )
    // Events
    .on( "click", ( e ) => {
        // Handle stuff
    })
    .on( "click", ".js-delegate-selector", ( e ) => {
        // Handle stuff
    })
    .off( "click", handlerFunction )

    // Data
    .data()
    .data( "key" )
    .data( "key", "value" )
    .data({
        key: "value",
        and: [1, 2, 3]
    })

    // ClassNames
    .addClass( "new-class" )
    .removeClass( "old-class" )

    // Querying
    .find( ".js-child-elements" );

// Hobo gives you utility methods for XHR and Promise.
// Hobo loves promises, so the ajax method returns one.
hobo.ajax({
    // String url
    url: "/some/endpoint",

    // Object hash to pass to endpoint
    data: {},

    // This can be "html" or "json"
    dataType: "json",

    // The request method type, "POST" etc...
    method: "GET"

}).then(function ( value ) {
    // Success with response

}).catch(function ( reason ) {
    // Failure with reason Error
})


hobo.promise(function ( resolve, reject ) {
    // Handle promise here
});
```



## Hobo Methods
- on()
- off()
- find()
- data()
- addClass()
- removeClass()



## Hobo Utility Methods
- ajax()
- promise()



## Hobo Consideration Methods
These are methods that can prove to be extremely useful when using jQuery, so there are considerations to supporting some of them within Hobo.

- eq()
- map()
- index()
- parent()
- filter()
- append()
- remove()
- detach()
- trigger()
- prepend()
- closest()
- appendTo()
- children()
- prependTo()
- toggleClass()
- insertAfter()
- insertBefore()