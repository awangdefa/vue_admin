<template>
  <div>
    <!-- 表单 -->
    <el-form ref="searchForm" :inline="true" :model="searchMap">
      <el-form-item prop="cardNum">
        <el-input v-model="searchMap.cardNum" placeholder="会员卡号"></el-input>
      </el-form-item>

      <el-form-item prop="cardName">
        <el-input
          v-model="searchMap.cardName"
          placeholder="会员名称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select v-model="searchMap.payType" placeholder="支付类型">
          <el-option
            v-for="option in payTypeOptions"
            :key="option.type"
            :label="option.name"
            :value="option.type"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="birthDay">
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="searchMap.birthDay"
          type="date"
          placeholder="出生日期"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
      </el-form-item>

      <!-- 新增用户 -->
      <el-button type="primary" @click="dialogFormVisible = true"
        >新增</el-button
      >

      <el-dialog title="增加用户" :visible.sync="dialogFormVisible" width="30%">
        <el-form
          ref="addUserInfoForm"
          :model="addUserInfoForm"
          label-width="80px"
          label-position="right"
          style="width:400px"
        >
          <el-form-item label="会员卡号" prop="cardNum" autocomplete="off">
            <el-input v-model="addUserInfoForm.cardNum" />
          </el-form-item>
          <el-form-item label="会员姓名" prop="name">
            <el-input v-model="addUserInfoForm.name" />
          </el-form-item>
          <el-form-item label="会员生日" prop="birthday">
            <el-date-picker
              v-model="addUserInfoForm.birthday"
              type="date"
              placeholder="请点击选择"
            />
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="addUserInfoForm.phone" />
          </el-form-item>
          <el-form-item label="开卡金额" prop="money">
            <el-input v-model="addUserInfoForm.money" />
          </el-form-item>
          <el-form-item label="可用积分">
            <el-input v-model="addUserInfoForm.integral"></el-input>
          </el-form-item>
          <el-form-item label="支付类型" prop="payType">
            <el-select
              v-model="addUserInfoForm.payType"
              class="filter-item"
              placeholder="请点击选择"
            >
              <el-option
                v-for="option in payTypeOptions"
                :key="option.type"
                :label="option.name"
                :value="option.type"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="会员地址">
            <el-input
              v-model="addUserInfoForm.address"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入地址"
            />
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>

      <el-form-item class="resetBtn">
        <el-button @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="list" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"></el-table-column>
      <el-table-column prop="name" label="会员姓名"></el-table-column>
      <el-table-column prop="birthday" label="会员生日"></el-table-column>
      <el-table-column
        prop="phone"
        label="手机号码"
        width="110"
      ></el-table-column>
      <el-table-column prop="integral" label="可用积分"></el-table-column>
      <el-table-column prop="money" label="开卡金额"></el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template slot-scope="scope">
          <span>{{ scope.row.payType | payTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="会员地址"
        width="180"
      ></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="handleDele(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[50, 20, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { search } from "@/api/restApi.js";

// 支付类型
const payTypeOptions = [
  { type: "1", name: "现金" },
  { type: "2", name: "微信" },
  { type: "3", name: "支付宝" },
  { type: "4", name: "银行卡" }
];

export default {
  name: "user-manage",
  data() {
    return {
      list: [],
      // 总记录数
      total: 0,
      // 当前页码
      currentPage: 1,
      // 每页显示10条数据
      pageSize: 10,
      // 查询条件
      searchMap: { cardNum: "", cardName: "", payType: "", birthDay: "" },
      // 支付类型
      payTypeOptions: [
        { type: "1", name: "现金" },
        { type: "2", name: "微信" },
        { type: "3", name: "支付宝" },
        { type: "4", name: "银行卡" }
      ],
      // 提交的数据
      addUserInfoForm: {
        cardNum: "",
        name: "",
        birthday: "",
        phone: "",
        money: 0,
        integral: 0,
        payType: "",
        address: ""
      },
      dialogTableVisible: false,
      dialogFormVisible: false
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      search(this.currentPage, this.pageSize, this.searchMap).then(response => {
        this.list = response.data.data.rows;
        this.total = response.data.data.total;
        console.log(response.data.data);
      });
    },
    handleEdit(id) {
      console.log(id);
    },
    handleDele(id) {
      console.log(id);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  filters: {
    // 过滤器中不能引用this实例
    payTypeFilter(type) {
      const result = payTypeOptions.find(item => item.type === type);
      return result ? result.name : null;
    }
  }
};
</script>

<style lang="scss" scoped>
.resetBtn {
  margin-left: 10px;
}
</style>
