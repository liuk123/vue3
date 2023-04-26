// 要打包的模块
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VirtualModulesPlugin = require('webpack-virtual-modules')
const fs = require('fs')
const path = require('path')

// 获取所有模块
const getModulesCount = () => fs.readdirSync('./src-modules/').length

// 获取编译模块
const modules = ['demo', 'chartmap']
// 返回模块虚拟
let buildDynamicModules = []
if (modules) { // 开发环境
  buildDynamicModules = modules.map((module, index) => {
    // eslint-disable-next-line no-console
    console.log(`编译模块(${index + 1})：${module}\n`)
    fs.access(path.join(`./src-modules/${module}/index.ts`), function (err) {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(`\n\n注意：${module} 模块不存在!\n`)
        process.exit(0)
      }
    })
    return `require.context("@modules/${module}", false, /index\\.ts$/)`
  })
} else {
  // eslint-disable-next-line no-console
  console.log(`全部模块，总共：${getModulesCount()} 个，建议采用模块化按需编译方式！\n`)
  buildDynamicModules.push('require.context("@modules", true, /^\\.\\/[a-zA-Z]+\\/index\\.ts$/)')
}

// 创建虚拟模块文件（hack）
const virtualModules = new VirtualModulesPlugin({
  'node_modules/vue-dynamic-modules.js': `module.exports = [${buildDynamicModules.join(',')}];`
})
const isPro = process.env.NODE_ENV === 'production'
console.log(isPro)

// function resolve (dir) {
//   return path.resolve(process.cwd(), dir)
// }
const serverProxy = require('./dev.server.proxy.js')

module.exports = {
  runtimeCompiler: true,
  lintOnSave: 'error',
  devServer: {
    port: 4201,
    // host: 'localhost',
    proxy: serverProxy,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  publicPath: isPro ? './' : '/',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  configureWebpack: {
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 1,
            chunks: 'initial' // only package third parties that are initially dependent
          }
        }
      }
    },
    module: {
      rules: [
        // {
        //   test: /\.(jpe?g|png|gif)$/i,
        //   use: [
        //     {
        //       loader: 'url-loader',
        //       options: {
        //         limit:10240,
        //         name:"[name].[ext]",
        //         esModule: false
        //       }
        //     }
        //   ]}
      ]
    },
    resolve: {
      alias: {
        '@modules': path.resolve(process.cwd(), 'src-modules'),
        '@': path.resolve(process.cwd(), 'src'),
        // Rx: path.join(__dirname, 'node_modules', 'rxjs')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        // PubSub: 'pubsub-js',
        // dayjs: 'dayjs',
        // $: 'jquery',
      }),
      virtualModules
    ]
  },

  pluginOptions: {
  },
  chainWebpack: config => {
    const miniCssExtractPlugin = new MiniCssExtractPlugin(
      {
        ignoreOrder: true,
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css'
      }
    )
    config.plugin('extract-css').use(miniCssExtractPlugin)
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // if (process.env.use_analyzer) {
    //   config
    //     .plugin('webpack-bundle-analyzer')
    //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    // }
    if (isPro) {
      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          bypassOnDebug: true
        })
        .end().use('url-loader').loader('url-loader').tap(options => {
          options.name = 'img/[hash].[ext]'
          options.fallback.options.name = 'img/[hash].[ext]'
          options.esModule = false
          return options
        })
    }
    // config.module.rule('svg').uses.clear()
  }
}
