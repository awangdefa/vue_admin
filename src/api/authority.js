import router from "@/router/index.js";
import { getUserInfo } from "@/api/restApi.js";

router.beforeEach((to, from, next) => {
  // 获取token
  const token = localStorage.getItem("vue-admin-userToken");
  if (!token) {
    // 无token
    if (to.path != "/login") {
      // 非登录页面只能访问登录页面
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    // 获取到token
    if (to.path === "/login") {
      next();
    } else {
      // 非登录页面先查看是否有用户信息
      const userInfo = localStorage.getItem("vue-admin-userInfo");
      if (userInfo) {
        // 直接去目标路由
        next();
      } else {
        // 请求用户信息
        getUserInfo(token).then(response => {
          const resp = response.data;
          if (resp.flag) {
            // 有用户信息，则进入非登录页面，否则返回登录页面
            localStorage.setItem(
              "vue-admin-userToken",
              JSON.stringify(resp.data)
            );
            next();
          } else {
            // 未获取到用户信息，重新登录
            next({ path: "/login" });
          }
        });
      }
    }
  }
});
