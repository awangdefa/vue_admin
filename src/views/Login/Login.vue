<template>
  <div class="login-container">
    <el-form
      ref="loginform"
      :rules="rules"
      :model="loginform"
      label-width="80px"
      class="login-form"
    >
      <h2 class="login-title">后台管理系统</h2>
      <el-form-item label="帐号" prop="username">
        <el-input v-model="loginform.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginform.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginform')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login, getUserInfo } from "@/api/restApi.js";
export default {
  data() {
    return {
      loginform: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "帐号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 校验成功提交表单
          this.$message({
            message: "登录成功",
            type: "success"
          });

          login(this.loginform.username, this.loginform.password).then(
            response => {
              const userToken = response.data;
              // console.log(userToken,'userToken');
              if (response.data.flag) {
                // 通过
                getUserInfo(response.data.data.token).then(response => {
                  const userInfo = response.data.data;
                  // console.log(userInfo,'userInfo');
                  localStorage.setItem(
                    "vue-admin-userInfo",
                    JSON.stringify(userInfo)
                  );
                  localStorage.setItem(
                    "vue-admin-userToken",
                    JSON.stringify(userToken)
                  );
                  this.$router.push("/");
                });
              } else {
                // 未通过
                // this.$message.error("登录失败");
              }
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {}
};
</script>

<style scoped>
.login-form {
  width: 350px;
  /* 上下间隙 160px, 左右自动居中 */
  margin: 160px auto;
  background-color: rgb(255, 255, 255, 0.8);
  padding: 28px;
  border-radius: 20px;
}
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
.login-title {
  color: #303133;
  text-align: center;
}
h2 {
  margin-bottom: 10px;
}
</style>
