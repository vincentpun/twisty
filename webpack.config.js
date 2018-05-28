const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
              configFileName: process.env.NODE_ENV === 'development' ? path.join(__dirname, 'tsconfig.dev.json') : path.join(__dirname, 'tsconfig.json'),
            }
          },
        ],
      },
      { test: /\.s?css$/, use: ['style-loader','css-loader', 'sass-loader'] },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      showErrors: true,
      path: path.join(__dirname, 'dist'),
      hash: true
    }),
  ]
}
