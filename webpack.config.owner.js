"use strict";

const ExtractTextPlugin = require("extract-text-webpack-plugin");
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: "./dev/owner/app/app_start.js",
    output: {
        path: __dirname + "/public/owner/",
        filename: "finalApp.bundle.js"
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.common.js",
            "vue-resource$": "vue-resource/dist/vue-resource.common.js",
            "vue-router$": "vue-router/dist/vue-router.common.js"
        }
    },
    node: {
        fs: "empty"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    loaders: {
                        less: "vue-style-loader!css-loader!less-loader"
                    }
                }
            },

            {
                test: /\.(css||less)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "less-loader"]
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: "file-loader",
                options: {
                    name: "assets/images/[name].[ext]?[hash]"
                }
            },
            {
                test: /\.(svg|woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader",
                options: {
                    name: "assets/fonts/[name].[ext]?[hash]"
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("finalStyles.css"),
        //new UglifyJSPlugin()
    ]
};