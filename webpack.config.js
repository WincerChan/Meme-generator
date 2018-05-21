'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        app: "./app.js",
    },
    output: {
        path: path.resolve(__dirname, "public/dist"),
        // filename: "bundle.js"
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: ExtractTextPlugin.extract('css-loader')
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react']
                }
            }
        ]
    },
    plugins: [
        // new ExtractTextPlugin('style.css'),
        new MiniCssExtractPlugin({
            name: "vendor"
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: 'all'
                }
            }
        }
    }
};