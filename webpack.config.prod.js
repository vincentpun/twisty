const baseConfig = require('./webpack.config');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    app: ['./src/index.tsx', './styles/index.scss'],
  },

  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist'),
  },

  devtool: 'source-map',

  resolve: {
    alias: {
      src: path.join(__dirname, 'src'),
      '~': path.join(__dirname, 'node_modules'),
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8888,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              plugins: ['react-hot-loader/babel'],
            },
          },
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: path.join(__dirname, 'tsconfig.json'),
            }
          },
        ],
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                require('autoprefixer')(),
              ],
            }
          },
          'sass-loader',
        ],
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': 'production',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      showErrors: true,
      path: path.join(__dirname, 'dist'),
      hash: true
    }),
    new DotenvPlugin({
      safe: true,
    }),
  ],

  optimization: {
    minimizer: [
      new UglifyJSPlugin(),
    ]
  },
}
