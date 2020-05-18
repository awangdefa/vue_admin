<template>
  <header>
    <div class="l-content">
      <el-button
        @click="collapseMenu"
        type="primary"
        icon="el-icon-menu"
        size="mini"
        plain
      ></el-button>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator=" ">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <!-- <el-breadcrumb-item v-show="shouye" :to="currentMenuItem.path" v-if="currentMenuItem"
          >{{ currentMenuItem.label }}
        </el-breadcrumb-item> -->
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <!-- 下拉菜单 -->
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link"
          ><img :src="userImg" class="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-edit" command="a"
            >修改密码</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-s-fold" command="b"
            >退出系统</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>

      <!-- 修改密码的弹窗 -->
      <el-dialog
        title="修改密码"
        :visible.sync="dialogFormVisible"
        width="400px"
      >
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          style="width:300px"
        >
          <el-form-item label="原密码" prop="oldPass">
            <el-input
              type="password"
              v-model="ruleForm.oldPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="新密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
            <el-button @click="$refs['ruleForm'].resetFields()">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </header>
</template>

<script>
import { logout, checkPassword, updatePassword } from "@/api/restApi.js";
import { mapState } from "vuex";
export default {
  name: "common-header",
  computed: {
    ...mapState({
      currentMenuItem: state => state.tab.currentMenuItem
    })
  },
  data() {
    // 在return上声明
    const validateOldPass = (rule, value, callback) => {
      checkPassword(this.user.id, value).then(response => {
        const {
          data: { flag, message }
        } = response;

        if (flag) {
          // 验证通过
          callback();
        } else {
          callback(new Error(message));
        }
      });
    };
    const validateCheckPass = (rule, value, callback) => {
      if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };

    return {
      // shouye: true,
      user: JSON.parse(localStorage.getItem("vue-admin-userInfo")),
      userImg: require("@/assets/images/userImg.gif"),
      dialogFormVisible: false,
      ruleForm: { oldPass: "", pass: "", checkPass: "" },
      rules: {
        oldPass: [
          {
            required: true,
            message: "原密码不能为空",
            trigger: "blur"
          },
          {
            validator: validateOldPass,
            trigger: "blur"
          }
        ],
        pass: [
          {
            required: true,
            message: "新密码不能为空",
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            required: true,
            message: "确认密码不能为空",
            trigger: "blur"
          },
          {
            validator: validateCheckPass,
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    collapseMenu() {
      this.$store.commit("collapseMenu");
    },
    handleCommand(command) {
      switch (command) {
        case "a":
          // 修改密码
          this.handlePwd();
          break;
        case "b":
          // 退出系统
          this.handleLogout();
          break;
        default:
          break;
      }
    },
    // 退出系统
    handleLogout() {
      logout(localStorage.getItem("vue-admin-userToken")).then(response => {
        console.log(response);
        if (response.data.flag) {
          // 退出成功，清除本地数据
          localStorage.removeItem("vue-admin-userToken");
          localStorage.removeItem("vue-admin-userInfo");
          this.$message({
            message: response.data.message,
            type: "success"
          });
          this.$router.push("/login");
        } else {
          this.$message({
            message: response.data.message,
            type: "warning"
          });
        }
      });
    },
    // 打开修改密码的窗口
    handlePwd() {
      this.dialogFormVisible = true;
    },
    // 修改密码
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log("校验成功");
          updatePassword(this.user.id, this.ruleForm.checkPass).then(resp => {
            const {
              data: { flag, message }
            } = resp;
            this.$message({
              message,
              type: flag ? "success" : "warning"
            });

            if (flag) {
              // 退出系统回到登录页
              this.handleLogout();
              // 关闭窗口
              this.dialogFormVisible = false;
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}

.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}

.r-content {
  .userImg {
    width: 40px;
    height: 40px;
    border-radius: 8px;
  }
}
</style>

<style lang="scss">
.el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: white;
  font-weight: 1000;
}
.el-breadcrumb__inner a:hover,
.el-breadcrumb__inner.is-link:hover {
  color: white;
  cursor: pointer;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  font-weight: 400;
  color: white;
  cursor: pointer;
}
</style>
