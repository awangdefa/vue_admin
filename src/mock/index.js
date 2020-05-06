import Mock from "mockjs";
import homeApi from "./home";
import userApi from "./user";

// 设置200-600ms延时请求数据
Mock.setup({
  timeout: "200-600"
});

// 首页相关
Mock.mock(/\/home\/getData/, "get", homeApi.getStatisticalData);

// 用户相关
Mock.mock(/\/user\/getUser/, "get", userApi.getUserList);
Mock.mock(/\/user\/del/, "get", userApi.deleteUser);
Mock.mock(/\/user\/batchremove/, "get", userApi.batchremove);
Mock.mock(/\/user\/add/, "post", userApi.createUser);
Mock.mock(/\/user\/edit/, "post", userApi.updateUser);
