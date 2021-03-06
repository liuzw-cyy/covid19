module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://apis.juhe.cn',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  },
  publicPath: '/'
}
