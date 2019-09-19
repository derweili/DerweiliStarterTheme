const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default


module.exports = {
  entry: {
    "./dist/assets/css/app.css": "./src/assets/scss/app.scss",
    "./dist/assets/js/app": "./src/assets/js/app.js",
  },
  output: {
    path: path.resolve(__dirname),
    filename: "[name]"
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  },
  watch: "production" !== process.env.NODE_ENV,
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
				test: /\.scss$/,
				use: [
					{
						loader: 'file-loader',
					},
					{
						loader: 'extract-loader'
					},
					{
						loader: 'css-loader?-url'
					},
					{
						loader: 'postcss-loader',
            options: {
              plugins: [require("autoprefixer")]
            }
					},
					{
						loader: 'sass-loader'
					}
				]
			}
    ]
  },
  plugins: [
    new CopyWebpackPlugin([ // copy all images
        {from:'src/assets/images',to:'dist/assets/images'}
    ]),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }) // optimize images
  ]
};
