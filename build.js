var fs = require( "fs" );
var path = require( "path" );
var coreR = "// @hobo-ext";
var buildR = "@hobo-dist npm run build";
var hoboF = String( fs.readFileSync( path.join( __dirname, "hobo.js" ) ) );
var child_process = require( "child_process" );
var Build = function ( modules ) {
    if ( !modules.length ) {
        console.log( "> [Hobo]", "Specify modules to custom build or just use hobo core." );
        process.exit( 0 );
    }

    var hoboExt = [];

    hoboF = hoboF.replace( /\.\/lib/g, "../lib" );

    modules.forEach(function ( module ) {
        if ( hoboExt.length ) {
            hoboExt.push( '    Hobo.prototype.' + module + ' = require( "../lib/extended/' + module + '" );' );

        } else {
            hoboExt.push( 'Hobo.prototype.' + module + ' = require( "../lib/extended/' + module + '" );' );
        }
    });

    hoboF = hoboF.replace( coreR, hoboExt.join( "\n" ) );
    hoboF = hoboF.replace( buildR, (buildR + " -- " + modules.join( " " )) );

    if ( !fs.existsSync( path.join( __dirname, "dist" ) ) ) {
        fs.mkdirSync( path.join( __dirname, "dist" ) );
    }

    fs.writeFileSync( path.join( __dirname, "dist", "hobo.build.js" ), hoboF );

    console.log( "> [Hobo]", ("Generated custom build with -- " + modules.join( " " )) );
};


// npm run build -- "foo bar baz bot"
try {
    if ( process.argv.length < 3 ) {
        module.exports = new Build( [] );

    } else {
        module.exports = new Build( process.argv[ 2 ].split( " " ) );
    }

} catch ( error ) {
    console.log( "[Build Error]", error );
}
