const path = require('path')
const pages = require('./src/pages')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  views: path.join(__dirname, './src/views'),
  govukJs: path.join(__dirname, 'node_modules/govuk-frontend/govuk/all.js'),
  govukAssets: path.join(__dirname, 'node_modules/govuk-frontend/govuk/assets'),
  assets: 'assets/'
}

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    main: `${PATHS.src}/index.ts`,
    // govuk: PATHS.govukJs
  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: 'postcss.config.js' } }
          }, {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: 'src/js/postcss.config.js' } }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ]
  },
  devServer: {
    overlay: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`
    }),
    ...pages.generatePages(path.resolve(__dirname, PATHS.views)),
    new CopyPlugin({
      patterns: [
        { from: `${PATHS.govukAssets}/images`, to: `${PATHS.dist}/${PATHS.assets}/images` },
        { from: `${PATHS.govukAssets}/fonts`, to: `${PATHS.dist}/${PATHS.assets}/fonts` },
        { from: PATHS.govukJs, to: `${PATHS.dist}/${PATHS.assets}/js/govuk.js` },
      ],
    }),
  ],
}