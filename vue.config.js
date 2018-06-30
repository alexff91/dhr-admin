module.exports = {
  baseUrl: '/',
  outputDir: 'dist',
  lintOnSave: true,
  chainWebpack: config => {},
  configureWebpack: config => {},
  productionSourceMap: true,
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {},
    modules: false
  },
  parallel: require('os').cpus().length > 1,
  pwa: {},

  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 9797,
    https: false,
    hotOnly: false,
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
    proxy: null, // string | Object
    before: app => {}
  },

  // options for 3rd party plugins
  pluginOptions: {
    // ...
  }
};
