import Mock from "mockjs";
import homeApi from "./home";

// 设置200-600ms延时请求数据
Mock.setup({
  timeout: "200-600"
});

// 首页相关
Mock.mock(/\/home\/getData/, "get", homeApi.getHomeData());
