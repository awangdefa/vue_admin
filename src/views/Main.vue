<template>
  <el-container style="height:100%">
    <el-aside width="auto"><common-aside></common-aside></el-aside>
    <el-container>
      <el-header style="height:56px"><common-header></common-header></el-header>
      <common-tab></common-tab>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonHeader from "@/components/CommonHeader";
import CommonAside from "@/components/CommonAside";
import CommonTab from "@/components/CommonTab";
export default {
  components: {
    [CommonHeader.name]: CommonHeader,
    [CommonAside.name]: CommonAside,
    [CommonTab.name]: CommonTab
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #409eff;
}
</style>
