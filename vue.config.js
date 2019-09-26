const publicPath = './'
const runtimeCompiler = false

const chainWebpack = config => {

  config.module.rule('csv')
    .test(/\.csv$/)
    .use('csv-loader')
    .loader('csv-loader')
    .options({
      dynamicTyping: true,
      header: true,
      skipEmptyLines: true
    })
}

module.exports = {
  publicPath,
  runtimeCompiler,
  chainWebpack
}

