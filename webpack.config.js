const path = require('path')

module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		  filename: 'build.js',
	},
	devtool: 'inline-source-map',
	module: {
		rules: [{
			test: /\.(png|svg|jpg|gif)$/,
	  		use: [
	 			 'file-loader'
	  		]
	   	}]
	}
}
