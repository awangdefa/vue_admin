<template>
  <!-- 主菜单 -->
  <el-menu
    default-active="/"
    class="el-menu-vertical-demo"
    background-color="#409eff"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
  >
    <!-- 标题 -->
    <h3 v-show="!isCollapse">后台管理系统</h3>
    <h3 v-show="isCollapse">后台</h3>
    <!-- 项目 -->
    <el-menu-item
      :index="item.path"
      v-for="item in noChildren"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <!-- 多级菜单 -->
    <el-submenu
      index="item.path"
      v-for="(item, index) in hasChildren"
      :key="index"
    >
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{ item.label }}</span>
      </template>
      <!-- 菜单项目组 -->
      <el-menu-item-group>
        <!-- 项目 -->
        <el-menu-item
          :index="subItem.path"
          v-for="(subItem, subIndex) in item.children"
          :key="subIndex"
          @click="clickMenu(subItem)"
        >
          <i :class="'el-icon-' + item.icon"></i>
          {{ subItem.label }}</el-menu-item
        >
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "common-aside",
  computed: {
    noChildren() {
      return this.asideMenu.filter(item => !item.children);
    },
    hasChildren() {
      return this.asideMenu.filter(item => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    }
  },
  data: () => ({
    asideMenu: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home"
      },
      {
        path: "/video",
        name: "video",
        label: "视频管理",
        icon: "video-play"
      },
      {
        path: "/user",
        name: "user",
        label: "用户管理",
        icon: "user"
      },

      {
        label: "其他",
        name: "other",
        icon: "user",
        children: [
          {
            path: "/page1",
            name: "page1",
            label: "页面1",
            icon: "setting"
          },
          {
            path: "/page2",
            name: "page2",
            label: "页面2",
            icon: "setting"
          }
        ]
      }
    ]
  }),
  methods: {
    clickMenu(item) {
      this.$router.push({ name: item.name });
      this.$store.commit("selectMenu", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 56px;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
