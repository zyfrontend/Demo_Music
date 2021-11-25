module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        views: '@/views',
        plugins: '@/plugins'
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        // target: 'https://www.codeman.store',
        target: 'http://www.zyfullstack.top:3000/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
