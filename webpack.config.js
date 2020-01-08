const Path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {

  return {
    entry: {
      app: [
        "./src/app.js",
        "./src/scss/style.scss"
      ]
    },
    output: {
      filename: 'js/[name].js',
      path: Path.resolve(__dirname, 'dist')
    },
    devtool: argv.mode !== 'production'? 'source-map' : false,
    optimization: {
      minimizer: [
        new TerserJSPlugin({ sourceMap: true }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {

            map: argv.mode !== 'production' ? {
              inline: false // set to false if you want CSS source maps
            } : null
          }
        })],
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'css/[name].css',
        chunkFilename: '[id].css',
      }),
      new CopyPlugin([
        { context: 'src/', from: '**/*.html' },
        { from: 'images/*'}
      ])
    ],
    devServer: {
      port: 80,
      compress: true,
      hot: true,
      contentBase: Path.join(__dirname, 'src'),
      watchContentBase: true
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000, // How often check for changes (in milliseconds)
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: "babel-loader",
            }
          ]
        },
        {
          test: /\.s?css$/,
          exclude: [Path.resolve("/node_modules/")],
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it uses publicPath in webpackOptions.output
                publicPath: '../',
                hmr: process.env.NODE_ENV === 'development',
              },
            }, {
              loader: "css-loader",
              options: {
                sourceMap: true,
                url: false,
              }

            }, {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            }, {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                includePaths: [Path.resolve('src/scss')],
              }
            }
          ]
        },
      ]
    }
  }
};