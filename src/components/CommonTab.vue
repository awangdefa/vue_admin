<template>
  <div class="tabs">
    <el-tag
      size="small"
      :key="tag.name"
      v-for="tag in tags"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag.label }}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "common-tab",
  computed: {
    ...mapState({
      tags: state => state.tab.tabList
    })
  },
  data() {
    return {
      dynamicTags: ["标签一", "标签二", "标签三"],
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    ...mapMutations({
      closeTag: "closeTag"
    }),
    handleClose(tag) {
      this.closeTag(tag);
    }
  }
};
</script>

<style lang="scss" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
  }
}
</style>
