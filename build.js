var fs = require( "fs" );
var path = require( "path" );
var coreR = "// @hobo-ext";
var buildR = "@hobo-dist npm run build";
var hoboF = String( fs.readFileSync( path.join( __dirname, "hobo.js" ) ) );
var child_process = require( "child_process" );
var Build = function ( modules ) {
    if ( !modules.length ) {
        console.log( "[Build]", "No modules specified -- generating hobo core." );
        child_process.exec( "rm -rf dist/hobo-ext.js", [], function ( error, stout, sterr ) {});
        child_process.exec( "rm -rf dist/hobo-ext.min.js", [], function ( error, stout, sterr ) {});
        child_process.exec( "rm -rf build", [], function ( error, stout, sterr ) {});
        process.exit( 0 );
    }

    var hoboExt = [];

    modules.forEach(function ( module ) {
        if ( hoboExt.length ) {
            hoboExt.push( '    Hobo.prototype.' + module + ' = require( "./lib/extended/' + module + '" );' );

        } else {
            hoboExt.push( 'Hobo.prototype.' + module + ' = require( "./lib/extended/' + module + '" );' );
        }
    });

    hoboF = hoboF.replace( coreR, hoboExt.join( "\n" ) );
    hoboF = hoboF.replace( buildR, (buildR + " -- " + modules.join( " " )) );

    if ( !fs.existsSync( path.join( __dirname, "build" ) ) ) {
        fs.mkdirSync( path.join( __dirname, "build" ) );
    }

    fs.writeFileSync( path.join( __dirname, "build", "hobo-ext.js" ), hoboF );

    child_process.exec( "npm run dist", [], function ( error, stout, sterr ) {
        if ( error ) {
            console.log( "[Build Error]", error );
            process.exit( 1 );
        }
    });
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