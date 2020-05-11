import request from "@/api/config.js";

export function getTestData() {
  return request({
    method: "get",
    url: "/ok/ok"
  });
}

export function login(username, password) {
  return request({
    method: "post",
    url: "/ok/user/login",
    data: {
      username,
      password
    }
  });
}

export function getUserInfo(token) {
  return request({
    method: "get",
    url: `/ok/user/info/${token}`
  });
}

export function logout(token) {
  return request({
    method: "post",
    url: `/ok/user/logout`,
    data: {
      token
    }
  });
}

// 获取会员列表数据
export function getList() {
  return request({
    method: "get",
    url: `/ok/member/list`
  });
}

// 分页查询,
// page当前页码, size 每页显示条数, searchMap 条件
// 后台要通过 page 和 size 统计本次请求响应的数据
export function search(page, size, searchMap) {
  return request({
    url: `/ok/member/list/search/${page}/${size}`,
    method: "post",
    data: searchMap
  });
}
