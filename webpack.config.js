var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var postcssGradientFixer = require('postcss-gradientfixer') 

module.exports = {
  entry: [
    //inline mode for webpack-dev-server
    'webpack-dev-server/client?http://localhost:8080/', 
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './src/js/main.js'
  ],
  module: {
    loaders: [
      //css will be transformed according to the postcss configuration (see
      //below), and embedded in a `link` tag in the `html` `head` section.
      { 
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader?sourceMap' },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ['babel'],
        query: {
          //we can use ES2015 features and JSX
          'presets': ['react', 'es2015'],
          'plugins': [
            //We can use the spread operator to easily update objects in and
            //immutable way.
            'transform-object-rest-spread',
            //It will throw an error (shown in the console) if what you try
            //import does not exist in the orginal module. It can catch a lot of
            //typos for us (only useful during development)
            'import-asserts'
          ]
        }
      }
    ]
  },
  //process css files to avoid the need of prefixing special css rules and
  //improving cross browser compatibility
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