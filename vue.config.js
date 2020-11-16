

module.exports = {
  // publicPath:
  // outputDir
  // assetsDir  放置生成的静态资源
  // indexPath  指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  //
  pages:{
    index:{
      entry:'src/main.ts',
      template:'public/index.html',
      filename: 'index.html',
      title: 'AliveNote',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  lintOnSave: false,

}
