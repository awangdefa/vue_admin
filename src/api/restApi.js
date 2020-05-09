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
