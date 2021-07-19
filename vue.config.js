// vue.config.js file to be place in the root of your repository

module.exports = {
	devServer: {
		proxy: 'http://192.168.1.155:7200'
	},
	publicPath: process.env.NODE_ENV === 'production'
	  ? '/infograph/'
	  : '/'
      }