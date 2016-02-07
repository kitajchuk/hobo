hobo
====

> All the things you want without all the cruft.



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
- forEach()



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
The custom build file is generated at `dist/hobo-ext.js` as well as `dist/hobo-ext.min.js`. You can now import this version directly into your project.

```javascript
import $ from "hobo/dist/hobo-ext";
```



### Hobo Extended Methods
The linked methods are currently available. All others are still empty and under consideration.

- [eq()](https://github.com/ProperJS/hobo/blob/master/lib/extended/eq.js)
- [not()](https://github.com/ProperJS/hobo/blob/master/lib/extended/not.js)
- one()
- next()
- prev()
- [attr()](https://github.com/ProperJS/hobo/blob/master/lib/extended/attr.js)
- [index()](https://github.com/ProperJS/hobo/blob/master/lib/extended/index.js)
- [parent()](https://github.com/ProperJS/hobo/blob/master/lib/extended/parent.js)
- [filter()](https://github.com/ProperJS/hobo/blob/master/lib/extended/filter.js)
- [detach()](https://github.com/ProperJS/hobo/blob/master/lib/extended/detach.js)
- [append()](https://github.com/ProperJS/hobo/blob/master/lib/extended/append.js)
- remove()
- trigger()
- prepend()
- closest()
- appendTo()
- children()
- prependTo()
- removeAttr()
- toggleClass()
- insertAfter()
- insertBefore()



## Testing / Support
Hobo is not fully tested - but its built for all modern browsers. Submit an [Issue]() or [Pull Request]() if you find any bugs.