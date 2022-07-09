const path = require("path")
var webpack = require("webpack");
module.exports = {
    entry: "./src/hangman.js",
    mode: "development",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new webpack.ProvidePlugin({
             $: "./jquery-3.3.1",
             jQuery: "./jquery-3.3.1"
         })
     ],
}