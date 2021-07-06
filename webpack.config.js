const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');

const isDevelopment = process.env.NODE_ENV === 'development';
const publicPath = '/';

module.exports = {
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
    },
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
    filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
    chunkFilename: isDevelopment ? '[id].js' : '[id].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
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
        type: 'asset',
      },
    ],
  },
  plugins: [
    new DotenvPlugin(),
    new ESLintPlugin(),
    new StyleLintPlugin({
      files: 'src/**/*.scss',
    }),
    new CopyPlugin({
      patterns: [
        {
          context: 'public',
          from: '**/*',
          globOptions: {
            ignore: ['index.html', 'index.*.html'],
          },
        },
      ],
    }),
    new webpack.DefinePlugin({
      'process.env.BASE_URL': JSON.stringify(publicPath),
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[contenthash].css',
    }),
    new HtmlWebPackPlugin({
      template: './index.html',
    }),
  ],
  devServer: {
    port: process.env.PORT || 8080,
    host: '0.0.0.0',
    historyApiFallback: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    hot: true,
    proxy: {
      '/api': {
        target: 'http://advert.sandbox.ubic.tech',
        changeOrigin: true,
      },
    },
  },
};
