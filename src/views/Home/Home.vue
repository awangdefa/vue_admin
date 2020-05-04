<template>
  <el-row :gutter="20" class="home">
    <!-- 左侧 -->
    <el-col :span="8" class="left">
      <!-- 用户信息 -->
      <el-row>
        <el-card shadow="hover" class="user">
          用户信息
        </el-card>
      </el-row>
      <!-- 课程信息 -->
      <el-row>
        <el-card shadow="hover" class="lesson">
          课程信息
        </el-card>
      </el-row>
    </el-col>

    <!-- 右侧 -->
    <el-col :span="16" class="right">
      <!-- 订单数据 -->
      <el-row class="num-data">
        <el-card
          shadow="hover"
          v-for="item in 6"
          :key="item"
          class="num-data-card"
        >
          <i class="icon"></i>
          <div class="detail">
            <p class="num">$888</p>
            <p class="text">今日支付订单</p>
          </div>
        </el-card>
      </el-row>
      <!-- echart1 -->
      <el-row class="echart1">
        <el-card shadow="hover" class="echart1-card">
          echart1
        </el-card>
      </el-row>
      <!-- echart23 -->
      <el-row class="echart23">
        <el-col :span="12">
          <el-card shadow="hover" class="echart2-card">
            echart2
          </el-card></el-col
        >
        <el-col :span="12">
          <el-card shadow="hover" class="echart3-card">
            echart3
          </el-card></el-col
        >
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  mounted() {
    this.$http.get("/home/getData").then(res => {
      console.log(res.data);
    });
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
      }
    }
    .echart1-card {
      height: 280px;
    }
    .echart2-card {
      height: 280px;
    }
    .echart3-card {
      height: 280px;
    }
  }
  .left {
    .user {
      height: 290px;
    }
    .lesson {
      height: 458px;
    }
  }
}
</style>
