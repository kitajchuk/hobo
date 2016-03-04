hobo.js
=======

> A very small, modular DOM utility for modern web apps.



## About
Hobo core is only 6k minified and just 10k minified with all extended methods built in!



## Usage

### Core
If you only want to use core you can simply `npm install` and import hobo into your application.
```shell
npm install properjs-hobo --save-dev
```

### Custom Builds
You can create custom hobo builds with any of the available extended methods.

#### Clone
```shell
git clone git@github.com:ProperJS/hobo.git hobo
```

#### Build
```shell
cd hobo

npm install

# This will include these methods
npm run build -- "eq not filter detach append"
```

#### Import
```javascript
import $ from "hobo/dist/hobo.build";
```



## Methods

### Core
The small, powerful core methods that get the job done.
- on() - supports `mouseenter` and `mouseleave`
- off()
- find()
- data()
- ajax() - supports `xhr` and `jsonp`
- addClass()
- removeClass()

### Core - Native Array
These are swiped from the Array prototype for zero overhead.
- map()
- push()
- forEach() - alias available as `each()`

### Extended
These are methods that can make hobo even more powerful.
- is()
- eq()
- not()
- one()
- next()
- prev()
- attr()
- last()
- first()
- index()
- parent()
- filter()
- detach()
- append()
- remove()
- trigger()
- prepend()
- closest()
- children()
- removeAttr()
- toggleClass()



## API
If you are familiar with libraries like jQuery then hobo will be real easy.
```javascript
import $ from "properjs-hobo";


// Hobo gives you a chainable method wrapper
$( ".js-element" )
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
$.ajax({
    // String url
    url: "/some/endpoint",

    // Object hash to pass to endpoint
    data: {},

    // This can be "html" or "json"
    dataType: "json",

    // The request method type, "POST" etc...
    method: "GET",

    // This is how you would utilize JSONP
    // dataType: "jsonp"

    // This sets the JSONP callback function name, the default is "callback"
    // jsonp: "someCallbackName"

}).then(function ( response ) {
    // Success with response

}).catch(function ( error ) {
    // Failure with error
});
```



## Testing / Support
Hobo is not fully tested - but its built for all modern browsers. A couple of things, though. Hobo uses Native Promises - so IE will need a polyfill. Hobo also uses Native DomStringMap to check initial node data - so low grade IE won't work here either.

- http://caniuse.com/#search=Promises
- http://caniuse.com/#search=DomStringMap

Submit an [Issue](https://github.com/ProperJS/hobo/issues) or [Pull Request](https://github.com/ProperJS/hobo/pulls) if you find any bugs.