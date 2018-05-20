'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: "./app.js"
    },
    output: {
        path: path.resolve(__dirname, "public/dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract('css-loader')
        }]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
    ]
};