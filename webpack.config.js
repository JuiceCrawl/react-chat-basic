var webpack = require('webpack')
// var path = require('path')

module.exports = {

  entry:{
    app: './public/src/app.js'
  },
  output:{
    filename: './public/build/bundle.js',
    sourceMapfilename: './build/bundle.map'
  },
  devtool: '#source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modues)/,
        loader: 'babel',
        query:{
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}