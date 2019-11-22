<template>
  <div>
    <el-card>
      <div slot="header">
        <span>筛选查询</span>
      </div>
      请输入：
      <el-input v-model="search_pram.username" placeholder="用户名或者微信名" size="small" clearable
                class="search_input"></el-input>
      <el-button type="primary" size="small" style="margin-top: 4px" round @click="doSearch">查询</el-button>
    </el-card>
    <el-card style="margin-top: 20px">
      <div slot="header">
        <span>相册订单列表</span>
      </div>
      <div>
        <el-table
          ref="orderTable"
          border
          :data="order_list"
          style="width: 100%">
          <el-table-column
            type="index"
            width="70">
          </el-table-column>
          <el-table-column
            prop="user.username"
            label="用户名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="wachat_name"
            label="微信名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="alum.key"
            label="相册key">
          </el-table-column>
          <el-table-column
            label="支付状态"
            width="120">
            <template slot-scope="scope">
              <a v-if="scope.row.pay_status===0">已支付</a>
              <a v-else-if="scope.row.pay_status===2">待审核</a>
              <a v-else>未支付</a>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button
                :disabled="scope.row.pay_status!==2"
                @click="pass(scope.row)"
                type="text"
                size="small">
                通过
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div>
          <el-pagination class="pagination"
                         background
                         @current-change="handleCurrentChange"
                         layout="prev, pager, next"
                         :page-size="search_pram.page_size"
                         :total="total">
          </el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AlumOrder',
  data () {
    return {
      // 搜索条件
      search_pram: {
        username: '',
        page: 1,
        page_size: 5
      },
      // 相册订单
      order_list: [],
      // 数据总数
      total: 1
    }
  },
  created () {
    this.doSearch()
  },
  methods: {
    // 搜索列表
    doSearch () {
      this.$requestUtils.post(this, '/alum_order_list', this.search_pram)
        .then(res => {
          if (res) {
            if (res.data !== null || res.data !== undefined) {
              this.total = res.data.total
              this.order_list = res.data.list
            }
          }
        })
    },
    // 通过审核
    pass (row) {
    },
    // 选择当前页码
    handleCurrentChange (val) {
      this.search_pram.page = val
      console.log(`当前页: ${val}`)
      this.doSearch()
    }
  }
}
</script>

<style scoped>
  .search_input {
    width: 200px;
    margin-right: 10px;
  }
  .pagination {
    float: right;
    padding-top: 20px;
    padding-bottom: 20px;
  }

</style>
