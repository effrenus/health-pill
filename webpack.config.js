'use strict';

var path = require('path');
var webpack = require('webpack');
var BowerWebpackPlugin = require('bower-webpack-plugin');
var bowerPath = path.join(__dirname, 'bower_components');
var nodePath = path.join(__dirname, 'node_modules');

var plugins = [
	new BowerWebpackPlugin(),
	new webpack.ProvidePlugin({
		React: 'react'
	})
];

module.exports = {
	module: {
		noParse: [
			/\.min\.js/,
			bowerPath
		],
		loaders: [{test: /\.js$/, exclude: bowerPath, loader: 'babel-loader'}]
	},
	// plugins: plugins,
	output: {
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js"
    }
};