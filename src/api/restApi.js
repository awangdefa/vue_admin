import request from "@/api/config.js";

const restApi = {
  getTestData() {
    const result = request({
      method: "get",
      url: "/ok/ok"
    });
    return result;
  }
};

export default restApi;
