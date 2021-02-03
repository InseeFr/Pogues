const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const PreloadWebpackPlugin = require('preload-webpack-plugin');
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')

const Visualizer = require('webpack-visualizer-plugin');

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;
const sourcePath = path.resolve(__dirname, 'src');
const buildDirectory = path.resolve(__dirname, 'dist');

let cssLoader;
let scssLoader;

const stats = {
  assets: true,
  children: false,
  chunks: false,
  hash: false,
  modules: false,
  publicPath: false,
  timings: true,
  version: false,
  warnings: true,
  colors: {
    green: '\u001b[32m',
  },
};

module.exports = function(env) {
  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';
  const environment = (env && env.environment) || 'prod';

  const plugins = [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name]-[contenthash:8].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      template: './index.ejs',
      inject: true,
      production: isProd,
      minify: isProd && {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    //new PreloadWebpackPlugin(),
    new CleanWebpackPlugin(),
  ];

  const devEntryPoint = [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${host}:${port}`,
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, './src/index.js'),
  ];

  const entryPoint = isProd
    ? path.resolve(__dirname, './src/index.js')
    : devEntryPoint;

  if (isProd) {
    plugins.push(
      new TerserPlugin({
        terserOptions: {
          compress: {
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true,
          },
        },
      }),
      new Visualizer({
        filename: '../docs/stats.html',
      }),
    );
  } else {
    plugins.push(
      // make hot reloading work
      new webpack.HotModuleReplacementPlugin(),
      // show module names instead of numbers in webpack stats
      new webpack.NamedModulesPlugin(),
      // don't spit out any errors in compiled assets
      new webpack.NoEmitOnErrorsPlugin(),
    );
  }

  if (isProd) {
    cssLoader = [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[hash:base64:5]',
          },
        },
      },
    ];

    scssLoader = [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: 'css-loader',
      },
      {
        loader: 'sass-loader',
        options: {
          sassOptions: {
            outputStyle: 'collapsed',
            sourceMap: true,
            includePaths: [sourcePath],
          },
        },
      },
    ];
  } else {
    cssLoader = [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[path][name]-[local]',
          },
        },
      },
    ];

    scssLoader = [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
      },
      {
        loader: 'sass-loader',
        options: {
          sassOptions: {
            outputStyle: 'expanded',
            sourceMap: false,
            includePaths: [sourcePath],
          },
        },
      },
    ];
  }
  return {
    devtool: isProd ? 'source-map' : 'cheap-module-source-map',
    context: sourcePath,
    mode: nodeEnv,
    entry: {
      main: entryPoint,
    },
    output: {
      path: buildDirectory,
      publicPath: '',
      filename: isProd ? '[name]-[chunkhash:8].js' : '[name]-[hash:8].js',
    },
    resolveLoader: {
      alias: {
        'react-dom': '@hot-loader/react-dom',
        'config-loader': path.resolve(
          __dirname,
          'build-config/environments/config-loader',
        ),
      },
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            enforce: true,
          },
        },
      },
    },
    resolve: {
      extensions: [
        '.webpack-loader.js',
        '.web-loader.js',
        '.loader.js',
        '.js',
        '.jsx',
      ],
      modules: ['node_modules', sourcePath],
      alias: {
        Config: path.resolve(
          __dirname,
          'build-config/environments/config.prod',
        ),
      },
    },
    plugins,
    performance: isProd && {
      maxAssetSize: 1300000,
      maxEntrypointSize: 1900000,
      hints: 'warning',
    },

    stats: stats,

    devServer: {
      contentBase: sourcePath,
      publicPath: '/',
      historyApiFallback: true,
      port: port,
      host: host,
      hot: !isProd,
      compress: isProd,
      stats: stats,
    },
    module: {
      rules: [
        {
          test: /\.(html|svg|jpe?g|png|eot|svg|ttf|woff2?)$/,
          exclude: /node_modules/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'static/[name]-[hash:8].[ext]',
            },
          },
        },
        {
          test: /\.css$/,
          use: cssLoader,
        },
        {
          test: /\.scss$/,
          use: scssLoader,
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /config\.prod\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'config-loader',
            options: {
              environment,
            },
          },
        },
      ],
    },
  };
};
