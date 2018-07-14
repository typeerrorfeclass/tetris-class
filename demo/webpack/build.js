var path = require('path')
var webpack = require('webpack')

var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
var UglifyJSPlugin = webpack.optimize.UglifyJsPlugin

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../.package'),
    filename: 'bundle.min.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },

      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader'
      },

      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!less-loader'
      },

      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },

  plugins: [
    new UglifyJSPlugin({
      mangle: {
        // Skip mangling these
        except: ['exports', 'require']
      },
      sourceMap: true
    }),

    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'BundleReportRelease.html',
      logLevel: 'info'
    })
  ]
}
