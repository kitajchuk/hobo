hobo
====

> A very small, modular DOM utility for modern web apps.



## Installation

```shell
npm install properjs-hobo --save-dev
```


## Usage
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
    method: "GET"

}).then(function ( value ) {
    // Success with response

}).catch(function ( reason ) {
    // Failure with reason Error
})


$.promise(function ( resolve, reject ) {
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

## Native Array Methods
- map()
- push()
- forEach() - alias available as each()



## Hobo Custom Builds
These are methods that can make Hobo more powerful. Hobo takes an additive approach, whereas something like jQuery is subtractive for custom builds. Hobo presents the bare minimum - then you can add extra methods that suit your style.


### Generate a custom build

#### Clone Hobo
```shell
git clone git@github.com:ProperJS/hobo.git hobo
```

#### Build Hobo
```shell
cd hobo

# This will include these methods
npm run build -- "eq not filter detach append"
```

#### Import Hobo
The custom build you can import directly into your project is generated at `dist/hobo.js`.

```javascript
import $ from "hobo/dist/hobo";
```



### Hobo Custom Build Methods
The linked methods are currently available. All others are still empty and under consideration.

- [is()](https://github.com/ProperJS/hobo/blob/master/lib/extended/is.js)
- [eq()](https://github.com/ProperJS/hobo/blob/master/lib/extended/eq.js)
- [not()](https://github.com/ProperJS/hobo/blob/master/lib/extended/not.js)
- [one()](https://github.com/ProperJS/hobo/blob/master/lib/extended/one.js)
- [next()](https://github.com/ProperJS/hobo/blob/master/lib/extended/next.js)
- [prev()](https://github.com/ProperJS/hobo/blob/master/lib/extended/prev.js)
- [attr()](https://github.com/ProperJS/hobo/blob/master/lib/extended/attr.js)
- [last()](https://github.com/ProperJS/hobo/blob/master/lib/extended/last.js)
- [first()](https://github.com/ProperJS/hobo/blob/master/lib/extended/first.js)
- [index()](https://github.com/ProperJS/hobo/blob/master/lib/extended/index.js)
- [parent()](https://github.com/ProperJS/hobo/blob/master/lib/extended/parent.js)
- [filter()](https://github.com/ProperJS/hobo/blob/master/lib/extended/filter.js)
- [detach()](https://github.com/ProperJS/hobo/blob/master/lib/extended/detach.js)
- [append()](https://github.com/ProperJS/hobo/blob/master/lib/extended/append.js)
- [remove()](https://github.com/ProperJS/hobo/blob/master/lib/extended/remove.js)
- [trigger()](https://github.com/ProperJS/hobo/blob/master/lib/extended/trigger.js)
- [prepend()](https://github.com/ProperJS/hobo/blob/master/lib/extended/prepend.js)
- [closest()](https://github.com/ProperJS/hobo/blob/master/lib/extended/closest.js)
- [children()](https://github.com/ProperJS/hobo/blob/master/lib/extended/children.js)
- [removeAttr()](https://github.com/ProperJS/hobo/blob/master/lib/extended/removeAttr.js)
- [toggleClass()](https://github.com/ProperJS/hobo/blob/master/lib/extended/toggleClass.js)
- insertAfter()
- insertBefore()



## Testing / Support
Hobo is not fully tested - but its built for all modern browsers. A couple of things, though. Hobo uses Native Promises - so IE will need a polyfill. Hobo also uses Native DomStringMap to check initial node data - so low grade IE won't work here either.

- http://caniuse.com/#search=Promises
- http://caniuse.com/#search=DomStringMap

Submit an [Issue](https://github.com/ProperJS/hobo/issues) or [Pull Request](https://github.com/ProperJS/hobo/pulls) if you find any bugs.