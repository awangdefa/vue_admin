import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 全局配置
import "@/assets/scss/reset.scss";
import "element-ui/lib/theme-chalk/index.css";
import http from "@/api/config";
import "./mock";

// 引入第三方包

import ElementUI from "element-ui";

// 权限拦截
import "@/api/authority.js";

Vue.config.productionTip = process.env.NODE_ENV === "production";
console.log(process.env.VUE_APP_SERVICE_URL); // 开发环境 development, 生产环境 production

Vue.use(ElementUI);
Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
