const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import '@/assets/scss/default.scss';
          @import '@/assets/scss/commons.scss';
        `
      }
    }
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule.delete('type');
    svgRule.delete('generator');
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('svg-vue3-loader')
      .loader('svg-vue3-loader');
  },
  //publicPath: '/interactive-comment-section',
  outputDir: 'docs'
})
