'use strict';

var path = require('path');
var webpack = require('webpack');

var plugins = [
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.optimize.UglifyJsPlugin()
];

module.exports = {
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
		]
	},
	plugins: plugins,
	resolve: {
		modulesDirectories: [
			"node_modules"
		],
		extensions: ["", ".js"]
	},
	output: {
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js"
    }
};
