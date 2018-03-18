'use strict'
const path = require('path')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    // configureWebpack: () => {
    //     module: {
    //         rules: [
    //             {
    //                 test: /\.js$/,
    //                 loader: 'babel-loader',
    //                 include: [resolve('src'), resolve('node_modules/vue-viewplus/src/')]
    //             }
    //
    //         ]
    //     }
    // },
    chainWebpack: config => {
        config.module
            .rule('js')
            .include
            .add(/vue-viewplus/)
    },
    // 在生产版本中使用babel＆TS的thread-loader
    // 如果机器拥有多个核心，则默认启用
    parallel: require('os').cpus().length > 1,
}