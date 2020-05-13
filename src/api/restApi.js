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

// 添加dialog 新增会员接口
export function addUser(form) {
  return request({
    url: `/ok/member`,
    method: "post",
    data: form
  });
}

// 会员 ID 查询数据接口
export function getById(id) {
  return request({
    url: `/ok/member/${id}`,
    method: "get"
  });
}

// 会员数据更新
export function upDate(form) {
  return request({
    url: `/ok/member/${form.id}`,
    method: "put",
    data: form
  });
}

// 删除会员数据
export function delById(id) {
  return request({
    url: `/ok/member/${id}`,
    method: "delete"
  });
}
