export default {
  state: {
    menu: [],
    currentMenuItem: null,
    tabList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home"
      }
    ]
  },
  mutations: {
    /*点击左侧菜单触发*/
    selectMenu(state, value) {
      // 排除"首页"
      if (value.name !== "home") {
        state.currentMenuItem = value;
        // 多次点击tabList去重 result 为索引
        const result = state.tabList.findIndex(
          item => item.name === value.name
        );
        result === -1 && state.tabList.push(value);
      } else {
        state.currentMenuItem = null;
      }
    },

    closeTag(state, value) {
      const result = state.tabList.findIndex(item => item.name === value.name);
      state.tabList.splice(result, 1);
    }
  },
  actions: {}
};
