const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
require('dotenv').config();

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    app: path.resolve(__dirname, './index.js'),
  },
  devServer: {
    static: './dist',
    port: process.env.PORT,
    open: true,
  },
  output: {
    assetModuleFilename: 'assets/[name].[ext]',
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
    clean: true,
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@img': path.resolve(__dirname, './src/assets/images/'),
      '@comp': path.resolve(__dirname, './src/components/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: ['html-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[hash][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[hash][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Development',
      inject: 'body',
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contentHash].css',
    }),
  ],
};
