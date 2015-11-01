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
    .on( "click", ( e ) => {
        // Events
    })
    .data( "foo", "bar" )
    .addClass( "is-active" );

// Hobo lets you pass an {object} to data
hobo( ".js-element" ).data({
    foo: "bar",
    baz: "bot"
});

// Hobo, like jQuery, lets you access data as well
var foo = hobo( ".js-element" ).data( "foo" );

// All your datas are belong to Hobo
var datas = hobo( ".js-element" ).data();

// Hobo gives you utility methods for XHR and Promise
// Hobo loves promises, so the ajax method returns one
hobo.ajax({
    url,
    data,
    dataType,
    method,
    
})
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
- promise()?



## jQuery "Privilege" Methods
- eq()
- index()
- parent()
- closest()
- map()
- filter()
- toggleClass()
- append()
- remove()
- detach()
- prepend()
- prependTo()
- appendTo()
- children()
- insertAfter()
- insertBefore()
- trigger()