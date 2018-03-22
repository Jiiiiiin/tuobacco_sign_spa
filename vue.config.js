'use strict'

module.exports = {
    devServer: {
        proxy: {
            '/': {
                target: 'http://yun2.tuobacco.com/',
                // target: 'http://192.168.1.109:8081',
                changeOrigin: true,
                // pathRewrite: {
                //     '^/pweb': '/pweb'
                // }
            }
        }
    },
    chainWebpack: config => {
        config.module
            .rule('js')
            .include
            .add(/vue-viewplus/)
    },
    // 在生产版本中使用babel＆TS的thread-loader
    // 如果机器拥有多个核心，则默认启用
    parallel: require('os').cpus().length > 1
}