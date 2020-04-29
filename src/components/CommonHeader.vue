<template>
  <header>
    <div class="l-content">
      <el-button type="primary" icon="el-icon-menu" size="mini"></el-button>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <!-- 下拉菜单 -->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link"
          ><img :src="userImg" class="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">个人中心</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
export default {
  name: "common-header",
  data: () => ({
    userImg: require("@/assets/images/userImg.gif")
  })
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
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  color: white;
}
</style>
