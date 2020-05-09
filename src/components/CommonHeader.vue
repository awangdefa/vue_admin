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
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="currentMenuItem.path" v-if="currentMenuItem"
          >{{ currentMenuItem.label }}
        </el-breadcrumb-item>
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
    </div>
  </header>
</template>

<script>
import { logout } from "@/api/restApi.js";
import { mapState } from "vuex";
export default {
  name: "common-header",
  computed: {
    ...mapState({
      currentMenuItem: state => state.tab.currentMenuItem
    })
  },
  data: () => ({
    userImg: require("@/assets/images/userImg.gif")
  }),
  methods: {
    collapseMenu() {
      this.$store.commit("collapseMenu");
    },
    handleCommand(command) {
      switch (command) {
        case "a":
          this.$message("点击了修改密码");
          break;
        case "b":
          logout(localStorage.getItem("vue-admin-userToken")).then(response => {
            console.log(response);
            if (response.data.flag) {
              // 退出成功，清除本地数据
              localStorage.removeItem("vue-admin-userToken");
              localStorage.removeItem("vue-admin-userInfo");
              this.$message({
                message: response.data.message,
                type: "success",
                duration: 500
              });
              this.$router.push("/login");
            } else {
              this.$message({
                message: response.data.message,
                type: "warning",
                duration: 500
              });
            }
          });
          break;
        default:
          break;
      }
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
