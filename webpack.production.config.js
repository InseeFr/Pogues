var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var postcssGradientFixer = require('postcss-gradientfixer') 

module.exports = {
  entry: [
    './src/js/main.js'
  ],
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ['babel'],
        query: {
          'presets': ['react', 'es2015'],
          'plugins': [
            'transform-object-rest-spread'
          ]
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
    path: __dirname + '/dist/js',
    publicPath: 'js', // it depends on what we set as content-base option with 
                      // the CLI
    filename: 'pogues.js'
  }
}