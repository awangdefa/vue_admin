<template>
  <el-form :model="formInline" class="form">
    <el-row>
      <el-col :span="16"
        ><el-button type="primary" @click="onSubmit">新增</el-button></el-col
      >

      <el-col :span="8" class="a">
        <el-input
          v-model="formInline.user"
          placeholder="请输入"
          class="input-search"
        ></el-input>
        <el-button type="primary" @click="onSubmit" class="btn-search"
          >查询</el-button
        >
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: "user-form",
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      }
    };
  },
  methods: {}
};
</script>

<style scoped>
.input-search {
  padding-left: 100px;
  padding-right: 100px;
}
.a {
  display: flex;
}
</style>
