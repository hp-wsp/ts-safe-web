module.exports = {
	// 基本路径
	publicPath: './',
	// 输出文件目录
	outputDir: 'dist',
	productionSourceMap:false,
	// webpack-dev-server 相关配置http://192.168.1.185:8085  http://47.103.114.48:8085
	devServer: {
		port: 8080,
		open: true,
		proxy: 'http://safe.tuoshecx.com/api'
	},
	configureWebpack: (config) => {
		config.externals = {
			'BaiduMap':'BMap'
		}
	}
}
