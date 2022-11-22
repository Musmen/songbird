const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  target: 'web',
  entry: './app/app.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: './script.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.mp3/,
        type: 'asset',
      },
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({ template: './app/index.html' }),
    new CopyWebpackPlugin({
      patterns: [{ from: './app/assets/favicon/', to: './assets/favicon/' }],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
  },
};

module.exports = config;
