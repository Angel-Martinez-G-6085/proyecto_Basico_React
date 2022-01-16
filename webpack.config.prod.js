const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    app: path.resolve(__dirname, './index.js'),
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
        test: /\.(js|jsx)/,
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
      inject: 'body',
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/styles.[contenthash].css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new MinimizerWebpackPlugin(),
      new TerserPlugin(),
      new CleanWebpackPlugin(),
    ],
  },
};
