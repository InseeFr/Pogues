var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var postcssGradientFixer = require('postcss-gradientfixer') 

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080/', //inline mode for
                                                        //webpack-dev-server
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './src/js/main.js'
  ],
  module: {
    loaders: [
      //{ test: /\.css$/, loader: 'style-loader!css-loader?sourceMap' },
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader?sourceMap' },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        //loaders: ['react-hot', 'babel']
        loader: ['babel'],
        query: {
          'presets': ['react', 'es2015'],
          'plugins': ['transform-object-rest-spread', 'import-asserts']
        }
      }
    ]
  },
  postcss: function () {
    return [precss, autoprefixer({ browsers: ['> 5%'] }), postcssGradientFixer]
  },  
  resolve: {
    extensions: ['', '.js']
  },
  output: {
    path: __dirname + '/dist',
    filename: './js/pogues.js'
  }
}