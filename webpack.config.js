const path = require("path");
const webpack = require("webpack");
const fs = require('fs');
const yaml = require('js-yaml');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')


const { BROWSERSYNC } = loadConfig();

// Check if file exists synchronously
function checkFileExists(filepath) {
  let flag = true;
  try {
    fs.accessSync(filepath, fs.F_OK);
  } catch(e) {
    flag = false;
  }
  return flag;
}

// Load default or custom YML config file
function loadConfig() {
  console.log('Loading config file...');

  if (checkFileExists('config.yml')) {
    // config.yml exists, load it
    console.log( 'config.yml exists, loading config.yml');
    let ymlFile = fs.readFileSync('config.yml', 'utf8');
    return yaml.load(ymlFile);

  } else if(checkFileExists('config-default.yml')) {
    // config-default.yml exists, load it
    console.log('config.yml does not exist, loading config-default.yml' );
    let ymlFile = fs.readFileSync('config-default.yml', 'utf8');
    return yaml.load(ymlFile);

  } else {
    // Exit if config.yml & config-default.yml do not exist
    console.log('Exiting process, no config file exists.');
    console.log('Error Code:', err.code);
    process.exit(1);
  }
}

console.log('sync');
console.log(BROWSERSYNC);

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: [
      './src/assets/js/app.js',
      './src/assets/scss/app.scss',
    ],
  },
  output: {
		path: path.resolve(__dirname, 'dist/assets'),
		filename: 'js/[name].js',
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
            options: {
							name: 'css/[name].css',
						}
					},
					{
						loader: 'extract-loader'
					},
					{
						loader: 'css-loader?-url'
					},
					{
						loader: 'postcss-loader',
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
        {from:'src/assets/images',to:'images'}
    ]),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }), // optimize images
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 3000,
      proxy: BROWSERSYNC.url
      // server: { baseDir: ['public'] }
    })
  ]
};
