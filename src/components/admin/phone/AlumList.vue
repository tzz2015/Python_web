<template>
  <div>
    <el-card v-show="isShowSearchBar()">
      <div slot="header">
        <span>筛选查询</span>
      </div>
      请输入：
      <el-input v-model="search_pram.username" placeholder="用户名|微信名|相册key" size="small" clearable
                class="search_input"></el-input>
      <el-button type="primary" size="small" style="margin-top: 4px" round @click="doSearch">查询</el-button>
    </el-card>
    <el-card style="margin-top: 20px">
      <div slot="header">
        <span>相册列表</span>
        <span style="float: right">
           <el-button type="success" size="small" round
                      @click="addAlum">新增相册</el-button>
      </span>
      </div>
      <div>
        <el-table
          ref="orderTable"
          border
          :data="alum_list"
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
            prop="key"
            label="相册key"
            width="150">
          </el-table-column>
          <el-table-column
            v-if="isShowSearchBar()"
            label="打赏状态"
            width="120">
            <template slot-scope="scope">
              <a v-if="scope.row.payInfo.pay_status===0">已打赏</a>
              <a v-else-if="scope.row.payInfo.pay_status===2">待审核</a>
              <a v-else>未打赏</a>
            </template>
          </el-table-column>
          <el-table-column
            label="背景图片"
            width="180">
            <template slot-scope="scope">
              <a :href="scope.row.bg_url" target="_blank"><img :src="scope.row.bg_url" class="bg_image"></a>
            </template>
          </el-table-column>
          <el-table-column
            label="背景音乐"
            width="180">
            <template slot-scope="scope">
              <audio :src="scope.row.music_url" controls style="width:150px;"></audio>
            </template>
          </el-table-column>
          <el-table-column
            label="相片集合"
            width="180">
            <template slot-scope="scope">
              <a :href="scope.row.image_urls[0]" target="_blank"><img :src="scope.row.image_urls[0]"
                                                                      class="bg_image"></a>
              <el-button type="text" small @click="showAllPhoto(scope.row.image_urls)">查看全部</el-button>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
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
    <el-dialog
      title="列表展示"
      :visible.sync="photosDialogVisible"
      width="30%"
      :before-close="handleClose">
      <div class="demo-image__lazy">
        <el-image v-for="url in curr_image_urls" :key="url" :src="url" lazy></el-image>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
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
      alum_list: [],
      // 数据总数
      total: 1,
      // 相片集合弹窗
      photosDialogVisible: false,
      // 当前图片集合
      curr_image_urls: []
    }
  },
  created () {
    this.doSearch()
  },
  methods: {
    // 搜索列表
    doSearch () {
      this.$requestUtils.post(this, '/alum_list', this.search_pram)
        .then(res => {
          if (res) {
            if (res.data !== null || res.data !== undefined) {
              this.total = res.data.total
              this.alum_list = res.data.list
              this.alum_list.forEach(item => {
                if (item.image_urls !== null) {
                  item.image_urls = item.image_urls.split(',')
                }
              })
            }
          }
        })
    },
    // 通过审核
    pass (row) {
      const params = {
        key: row.alum.key,
        pay_status: 2
      }
      const that = this
      this.$requestUtils.post(this, '/update_alum_order', params)
        .then(res => {
          if (res) {
            if (res.data !== null || res.data !== undefined) {
              that.doSearch()
            }
          }
        })
    },
    // 选择当前页码
    handleCurrentChange (val) {
      this.search_pram.page = val
      console.log(`当前页: ${val}`)
      this.doSearch()
    },
    // 是否显示搜索
    isShowSearchBar () {
      return this.$store.state.user_type !== 2
    },
    // 新增相册
    addAlum () {
      this.$comUtils.showSuccessMessage(this, '新增')
    },
    // 关闭相册展示dialog
    handleClose (done) {
      this.photosDialogVisible = false
    },
    // 展示全部
    showAllPhoto (urls) {
      this.curr_image_urls = urls
      this.photosDialogVisible = true
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

  .bg_image {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }

</style>
