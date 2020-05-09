<template>
  <div ref="echartContainer"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "echarts",
  props: {
    charData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: []
        };
      }
    },
    isAxisChart: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    charData: {
      handler() {
        this.initChart();
      },
      deep: true
    },
    isCollapse() {
      setTimeout(() => {
        this.resizeChart();
      }, 300);
    }
  },
  computed: {
    options() {
      // 根据是否有轴 把有轴和无轴的选项值给options
      return this.isAxisChart ? this.axisOption : this.normalOption;
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    }
  },
  data() {
    return {
      echartContainer: null,
      axisOption: {
        legend: {
          textStyle: {
            color: "#333"
          }
        },
        grid: {
          left: "20%"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3"
            }
          },
          axisLabel: {
            color: "#333"
          }
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3"
              }
            }
          }
        ],
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
          "#e5cf0d",
          "#97b552",
          "#95706d",
          "#dc69aa",
          "#07a2a4",
          "#9a7fd1",
          "#588dd5",
          "#f5994e",
          "#c05050",
          "#59678c",
          "#c9ab00",
          "#7eb00a",
          "#6f5553",
          "#c14089"
        ],
        series: []
      },
      normalOption: {
        tooltip: {
          trigger: "item"
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf"
        ],
        series: []
      }
    };
  },
  methods: {
    initChart() {
      this.initChartData();
      // 判断容器的存在并初始化容器
      if (this.echartContainer) {
        this.echartContainer.setOption(this.options);
      } else {
        this.echartContainer = echarts.init(this.$refs.echartContainer);
      }
    },
    initChartData() {
      // 判断轴的存在并根据后台数据赋值
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.charData.xData;
        this.axisOption.series = this.charData.series;
        // console.log(this.axisOption, "123123");
      } else {
        this.normalOption.series = this.charData.series;
      }
    },
    resizeChart() {
      // 对图表尺寸重新计算
      this.echartContainer ? this.echartContainer.resize() : "";
    }
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", this.resizeChart);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeChart);
  }
};
</script>

<style></style>
