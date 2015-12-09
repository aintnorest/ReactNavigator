import webpack           from 'webpack';
import config            from '../config';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const paths = config.get('utils_paths');

console.log("WEHERE IS THIS GO: ",paths.project(config.get('dir_dist')));

const webpackConfig = {
  name    : 'client',
 // target  : 'web',
  entry   : {
    app : [
      paths.project(config.get('dir_src'))
    ],
    vendor : config.get('vendor_dependencies')
  },
  output : {
    filename   : '[name].js',
    path       : paths.project(config.get('dir_dist'))
    //publicPath : '/'
  },
  plugins : [
    new webpack.DefinePlugin(config.get('globals')),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      template : paths.src('index.html'),
      hash     : true,
      filename : 'index.html',
      inject   : 'body'
  }),
  new HtmlWebpackPlugin({
    template : paths.src('index.html'),
    hash     : true,
    filename : 'index.jsp',
    inject   : 'body'
  })
  ],
  resolve : {
    extensions : ["", ".web.js", ".js", ".jsx"],
    alias      : config.get('utils_aliases')
  },
  module : {
    loaders : [
      {
        test : /\.(js|jsx)$/,
        exclude : /node_modules/,
        loader  : 'babel',
        query   : {
          stage    : 0,
          optional : ['runtime'],
        }
      },
      {
        test    : /\.scss$/,
        loaders : [
          'style/useable',
          'css-loader',
          'autoprefixer?{browsers:["ie >= 10","last 2 Chrome versions","iOS >= 7"]}',
          'sass-loader?includePaths[]=' + paths.src('styles')
        ]
      },
      {
          test: /.*\.(gif|png|jpe?g|svg)$/i,
          loader: 'file?hash=sha512&digest=hex&name=[hash].[ext]'
      },
      { test: /\.woff(\?.*)?$/,     loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?.*)?$/,    loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2" },
      { test: /\.ttf(\?.*)?$/,      loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?.*)?$/,      loader: "file-loader?prefix=fonts/&name=[path][name].[ext]" },
      { test: /\.svg(\?.*)?$/,      loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml" }
    ]
  }
};

// NOTE: this is a temporary workaround. I don't know how to get Karma
// to include the vendor bundle that webpack creates, so to get around that
// we remove the bundle splitting when webpack is used with Karma.
const commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin(
  'vendor', '[name].js'
);
commonChunkPlugin.__KARMA_IGNORE__ = true;
webpackConfig.plugins.push(commonChunkPlugin);

export default webpackConfig;
