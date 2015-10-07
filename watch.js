'use strict';
//
var webpack = require("webpack");
var fs = require('fs-extra');
var path = require("path");
var notifier = require('node-notifier');
var browserSync = require('browser-sync');
var browserReady = false;
var chokidar = require('chokidar');
var env = require('get-env')();
console.log("IS the environment",env);
//LOGGER
var log = console.log.bind(console);
//HELPER FUNCTIONS
function buildDeploy(){
	if(!browserReady) return;
    browserSync.reload();
}
function getFileName(fPath){
	var choppedUp = fPath.split("/");
	return choppedUp[choppedUp.length - 1];
}
//WATCHERS
var dist = "./dist";
var src = "./src";
var watcher = chokidar.watch(src);
watcher
	.on('add', function(file) { 
		log('File ', file, " has been added \n");
		if (file.match(/assets/g)) {
			var fLoc = dist + "/assets/" + getFileName(file);
			fs.exists(fLoc, function(exists) {
				if(!exists){
					fs.copy(file, fLoc, function(err) {
						if (err) return log("Asset Failed to copy: ",err);
				  		log("Asset Coppied: ",file);
				  		buildDeploy();
					});
				}
			});
		}
	})
	.on('error', function(error) { log('Error with the watcher: ', error, '\n'); })
	.on('raw', function(event, wPath, details) {
		console.log("Does this trigger at all on image add");
		if (wPath.match(/index.html/)) {
			fs.copy(src + "/index.html", dist + "/index.html", function(err) {
			  	log('Copy Index.html');
			  	console.log("ERROR: ",err);
			  	buildDeploy();
			});
		}
 	}
);
//BROWSER SYNC INIT
browserSync({
	notify: true,
	server: { baseDir: "dist"}
});
browserReady = true;
//WEBPACK COMPILER
var compiler = webpack({
	entry: { 
		app: "./src/js/main",
	},
	node: {
	  	fs: "empty",
	  	NODE_ENV:"production",
	},
    devtool: "source-map",
    output: {
        path: dist,
        filename: "js/main.min.js",
    },
    plugins: (env === "dev") ? [] : [
    	new webpack.optimize.UglifyJsPlugin({minimize: true}),
    	new webpack.DefinePlugin({
      		'process.env': {
        		'NODE_ENV': '"production"'
      		}
    	})
  	],
    resolve: {
    	extensions: ['', '.js', '.jsx']
  	},
    module: {
	  	loaders: [ 
	  		{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader?optional=runtime" },
	  		{ test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader?optional=runtime' },
	  		{ test: /\.scss$/, loaders: [
				    "style/useable",
				    "css-loader",
				    "autoprefixer-loader?browsers=last 2 version",
				    "sass-loader"
			  	]
			},
			{ test: /\.otf$/,    loader: "file-loader?prefix=assets/" },
			{ test: /\.png$/,    loader: "file-loader?prefix=assets/" },
			{ test: /\.jpg$/,    loader: "file-loader?prefix=assets/" },
			{ test: /\.woff$/,   loader: "url-loader?prefix=font/&limit=5000" },
			{ test: /\.eot$/,    loader: "file-loader?prefix=assets/" },
			{ test: /\.ttf$/,    loader: "file-loader?prefix=assets/" },
			{ test: /\.ttf$/,    loader: "url-loader" },
			{ test: /\.svg$/,    loader: "file-loader?prefix=assets/" },
    	]
	}
});
compiler.watch(200, function(err, stats) {
	if(stats.compilation.errors.length > 0) {
		log("Webpack Build Failed: \n",stats.compilation.errors);
		notifier.notify({
		  	title: 'Webpack Build Failed: ', message: stats.compilation.errors.length + " errors", icon: __dirname + '/fail.png',
		}, function (err, response) { });
	} else {
		log("Webpack Build Success");
		notifier.notify({
		  	title:  "WebPack Build Success!!!", message: "No problems", icon: __dirname + '/success.png',
		}, function (err, response) { });
	}
    buildDeploy();
});
