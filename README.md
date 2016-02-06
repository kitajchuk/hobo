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
These are methods that can make jQuery powerful. They are not included in hobo core. Use `hobo-extended.js` to include these.

- [eq()](https://github.com/ProperJS/hobo/blob/master/lib/extended/eq.js)
- [map()](https://github.com/ProperJS/hobo/blob/master/lib/extended/map.js)
- [attr()](https://github.com/ProperJS/hobo/blob/master/lib/extended/attr.js)
- [index()](https://github.com/ProperJS/hobo/blob/master/lib/extended/index.js)
- [parent()](https://github.com/ProperJS/hobo/blob/master/lib/extended/parent.js)
- [filter()](https://github.com/ProperJS/hobo/blob/master/lib/extended/filter.js)
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
- next()
- prev()
- one()