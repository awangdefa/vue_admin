module.exports = {
  devServer: {
    port: 3333,
    host: "localhost",
    https: false,
    open: true,
    proxy: {
      // 开发环境代理配置
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_SERVICE_URL,
        // 开启代理服务器
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: ""
        }
      }
    }
  },

  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/_variable.scss";`
      }
    }
  }
};
