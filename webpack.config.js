const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
// const DotenvPlugin = require('dotenv-webpack');

const isDevelopment = process.env.NODE_ENV === 'development';
const publicPath = '/';

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  entry: {
    app: './src',
  },
  output: {
    path: path.resolve('dist'),
    publicPath,
    filename: isDevelopment ? '[name].js' : '[name].[hash].js',
    chunkFilename: isDevelopment ? '[id].js' : '[id].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'eslint-loader' },
        ],
      },

      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },

      {
        test: /\.module\.s?css$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: isDevelopment
                  ? '[path][name]__[local]'
                  : '[hash:base64]',
              },
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: [/\.module\.s?css$/],
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },

      {
        test: /\.(png|jpg|svg)$/i,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    // new DotenvPlugin(),
    new StyleLintPlugin({
      files: 'src/**/*.scss',
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: 'public',
    //       globOptions: {
    //         ignore: ['index.html', 'index.*.html'],
    //       },
    //     },
    //   ],
    // }),
    new webpack.DefinePlugin({
      'process.env.BASE_URL': JSON.stringify(publicPath),
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
    }),
    new HtmlWebPackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    host: '127.0.0.1',
    historyApiFallback: true,
    overlay: true,
    hot: true,
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'http://sandbox.ubic.tech/',
      },
    },
  },
};
