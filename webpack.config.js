const path = require( "path" );
const root = path.resolve( __dirname );
const nodeModules = "node_modules";
const webpack = require( "webpack" );
const BrowserSyncPlugin = require( "browser-sync-webpack-plugin" );



module.exports = {
    // devtool: "source-map",


    plugins: [
        new BrowserSyncPlugin({
            open: true,
            host: "localhost",
            port: 3000,
            server: {
                baseDir: ["test"]
                //baseDir: ["docs"],
                //directory: true
            }
        })
    ],


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
