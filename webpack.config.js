const dotenv = require('dotenv');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    host: '0.0.0.0',
    https: true,
    port: 2021,
  },
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.mjs'],
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|mjs)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.module\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.(css|less)$/,
        exclude: /\.module\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.videoOptions': JSON.stringify({
        m3u8List: process.env.M3U8_LIST,
        mp4List: process.env.MP4_LIST,
      }),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
    }),
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
