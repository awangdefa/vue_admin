<template>
  <el-row :gutter="20" class="home">
    <!-- 左侧 -->
    <el-col :span="8" class="left">
      <!-- 用户信息 -->
      <el-row>
        <el-card shadow="hover" class="user">
          <div class="user-info">
            <img :src="userImg" />
            <div class="user-info-more">
              <p class="user-info-name">Admin</p>
              <p class="user-info-access">管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间：<span>2020-08-08</span></p>
            <p>上次登录地点：<span>长沙</span></p>
          </div>
        </el-card>
      </el-row>
      <!-- 课程信息 -->
      <el-row>
        <el-card shadow="hover" class="lesson">
          <el-table :data="tableData">
            <!-- :prop tableData的K -->
            <el-table-column
              show-overflow-tooltip
              v-for="(v, k) in tableLabel"
              :key="k"
              :prop="k"
              :label="v"
            ></el-table-column>
          </el-table>
        </el-card>
      </el-row>
    </el-col>

    <!-- 右侧 -->
    <el-col :span="16" class="right">
      <!-- 订单数据 -->
      <el-row class="num-data">
        <el-card
          shadow="hover"
          v-for="item in numData"
          :key="item.value"
          class="num-data-card"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">${{ item.value }}</p>
            <p class="text">{{ item.name }}</p>
          </div>
        </el-card>
      </el-row>
      <!-- echart1 -->
      <el-row class="echart1">
        <el-card
          shadow="hover"
          class="echart1-card"
          :body-style="{ padding: '0px' }"
        >
          <echarts :charData="echartData.order" style="height:260px;"></echarts>
        </el-card>
      </el-row>
      <!-- echart23 -->
      <el-row class="echart23">
        <el-col :span="12">
          <el-card
            shadow="hover"
            class="echart2-card"
            :body-style="{ padding: '0px' }"
          >
            <echarts
              :charData="echartData.user"
              style="height:260px;"
            ></echarts> </el-card
        ></el-col>
        <el-col :span="12">
          <el-card
            shadow="hover"
            class="echart3-card"
            :body-style="{ padding: '0px' }"
          >
            <echarts
              :charData="echartData.video"
              style="height:260px;"
              :isAxisChart="false"
            ></echarts> </el-card
        ></el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import echarts from "@/components/ECharts";
export default {
  components: {
    [echarts.name]: echarts
  },
  data() {
    return {
      userImg: require("@/assets/images/userImg.gif"),
      numData: [
        {
          name: "今日支付订单",
          value: 111,
          icon: "success",
          color: "lightcoral"
        },
        {
          name: "今日收藏订单",
          value: 222,
          icon: "paperclip",
          color: "orange"
        },
        {
          name: "今日分享订单",
          value: 333,
          icon: "position",
          color: "lightblue"
        },
        {
          name: "今日支付订单",
          value: 1111,
          icon: "success",
          color: "lightcoral"
        },
        {
          name: "今日收藏订单",
          value: 2222,
          icon: "paperclip",
          color: "orange"
        },
        {
          name: "今日分享订单",
          value: 3333,
          icon: "position",
          color: "lightblue"
        }
      ],
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总共购买"
      },
      echartData: {
        order: {
          xData: [],
          series: []
        },
        user: { xData: [], series: [] },
        video: { series: [] }
      }
    };
  },
  methods: {
    getHomeData() {
      this.$http.get("/home/getData").then(res => {
        res = res.data.data;
        this.tableData = res.tableData;
        this.echartData.order.xData = res.orderData.date;

        // 处理折线图数据
        const keyArray = Object.keys(res.orderData.data[0]);
        keyArray.forEach(key => {
          this.echartData.order.series.push({
            name: key === "wechat" ? "小程序" : key,
            data: res.orderData.data.map(item => item[key]),
            type: "line"
          });
        });
        // 用户柱状图
        this.echartData.user.xData = res.userData.map(item => item.date);
        this.echartData.user.series.push({
          name: "新增用户",
          data: res.userData.map(item => item.new),
          type: "bar"
        });
        this.echartData.user.series.push({
          name: "活跃用户",
          data: res.userData.map(item => item.new),
          type: "bar"
        });
        // 饼图
        this.echartData.video.series.push({
          data: res.videoData,
          type: "pie"
        });
        // console.log(this.echartData.order);
      });
    }
  },
  // 此时dom还没被渲染
  created() {
    this.getHomeData();
  }
};
</script>

<style lang="scss" scoped>
.home {
  .right {
    .num-data {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .num-data-card {
        width: 33.3%;
        margin-bottom: 20px;
        /deep/.el-card__body {
          display: flex;
          padding: 0px;
          .icon {
            font-size: 30px;
            width: 80px;
            height: 80px;
            line-height: 80px;
            text-align: center;
            color: white;
          }
          .detail {
            margin-left: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .num {
              font-size: 30px;
              margin-bottom: 10px;
            }
            .text {
              font-size: 14px;
              text-align: center;
              color: #999;
            }
          }
        }
      }
    }
    .echart1-card {
      height: 260px;
    }
    .echart2-card {
      height: 260px;
    }
    .echart3-card {
      height: 260px;
    }
  }

  .left {
    .user {
      height: 290px;
      .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
        img {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          margin-right: 40px;
        }
        // &表示父class名称 .user-info
        &-more {
          .user-info-name {
            font-size: 32px;
            margin-bottom: 10px;
          }
          .user-info-access {
            color: gray;
          }
        }
      }

      .login-info {
        display: flex;
        line-height: 28px;
        flex-direction: column;
        p {
          font-size: 14px;
          color: #999;
          span {
            color: #666;
            margin-left: 60px;
          }
        }
      }
    }
    .lesson {
      height: 434px;
    }
  }
}
</style>
