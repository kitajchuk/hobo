const path = require( "path" );
const root = path.resolve( __dirname );
const nodeModules = "node_modules";
const webpack = require( "webpack" );



module.exports = {
    // devtool: "source-map",


    plugins: [],


    resolve: {
        modules: [root, nodeModules]
    },


    entry: {
        "hobo.build.dist": path.resolve( __dirname, "dist", "hobo.build.js" ),
        "hobo.dist": path.resolve( __dirname, "hobo.js" )
    },


    output: {
        path: path.resolve( __dirname, "dist" ),
        filename: "[name].js"
    },


    module: {
        rules: [
            { test: /(hobo|hobo.build)\.js$/, use: ["expose-loader?hobo"] },
        ]
    }
};
