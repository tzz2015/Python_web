<template>
  <div>
    <el-card v-show="isShowSearchBar()">
      <div slot="header">
        <span>筛选查询</span>
      </div>
      请输入：
      <el-input v-model="search_pram.username" placeholder="用户名" size="small" clearable
                class="search_input"></el-input>
      <el-button type="primary" size="small" style="margin-top: 4px" round @click="doSearch">查询</el-button>
    </el-card>
    <el-card style="margin-top: 20px">
      <div slot="header">
        <span>相册列表</span>
        <span style="float: right">
           <el-button type="success" size="small" round
                      @click="addOrEditAlum('')">新增相册</el-button>
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
                                                                      class="photo_list"></a>
              <el-button type="text" small @click="showAllPhoto(scope.row.image_urls)">查看全部</el-button>
            </template>
          </el-table-column>
          <el-table-column
            :filters="[{text: '已打赏', value: 0}, {text: '待审核', value: 2}, {text: '未打赏', value: 1}]"
            :filter-method="filterHandler"
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
            align="center"
            fixed="right"
            width="160"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" small v-if="isShowEdit(scope.row)" @click="addOrEditAlum(scope.row)">编辑</el-button>
              <el-button type="text" small v-clipboard="alumHost+scope.row.key"
                         v-clipboard:success="clipboardSuccessHandler">复制链接
              </el-button>
              <el-button type="text" small v-if="isShowPayButton(scope.row)" @click="showPayDialog(scope.row)">打赏
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
    <el-dialog
      title="自愿打赏"
      :visible.sync="payDialogVisible"
      width="30%"
      :before-close="handleClose">
      <div>
        熬了不少夜晚写的，尊重一下劳动成果吧！
        <img src="../../../assets/image/WechatIMG25.png" style="width:200px;height:300px;margin-top: 20px"/>
        <el-input v-model="pay_pram.wachat_name" placeholder="请输入微信名,方便核对" size="small" clearable
                  class="search_input"></el-input>
        <el-button type="primary" size="small" style="margin-top: 4px" round @click="payMoreMoney">打赏</el-button>
      </div>
    </el-dialog>
    <div>
      <el-image-viewer
        v-if="photosDialogVisible"
        :on-close="handleClose"
        :url-list="curr_image_urls"></el-image-viewer>
    </div>
  </div>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'

export default {
  name: 'AlumOrder',
  components: {ElImageViewer},
  data () {
    return {
      // 搜索条件
      search_pram: {
        username: '',
        page: 1,
        page_size: 5
      },
      // 打赏参数
      pay_pram: {
        key: '',
        pay_status: 2,
        wachat_name: ''
      },
      // 相册订单
      alum_list: [],
      // 数据总数
      total: 1,
      // 相片集合弹窗
      photosDialogVisible: false,
      // 当前图片集合
      curr_image_urls: [],
      // 打赏弹窗
      payDialogVisible: false,
      // 3D相册地址
      alumHost: process.env.ALUM_HOST
    }
  },
  created () {
    this.doSearch()
    console.log('alum:' + process.env.ALUM_HOST)
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
    // 提交打赏
    payMoreMoney (row) {
      const that = this
      this.$requestUtils.post(this, '/update_alum_order', this.pay_pram)
        .then(res => {
          if (res) {
            if (res.data !== null || res.data !== undefined) {
              that.doSearch()
              that.payDialogVisible = false
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
      // return true
      return this.$store.state.user_type !== 2
    },
    // 是否显示打赏
    isShowPayButton (row) {
      return this.$store.state.id === row.user.id && row.payInfo.pay_status !== 0
    },
    // 是否显示编辑
    isShowEdit (row) {
      return this.$store.state.id === row.user.id
    },
    // 新增或者编辑相册
    addOrEditAlum (data) {
      if (data) {
        this.$router.replace({
          path: '/admin/EditAlum',
          query: {
            alumInfo: data
          }
        })
      } else {
        this.$router.replace({
          path: '/admin/EditAlum'
        })
      }
    },
    // 关闭相册展示dialog
    handleClose (done) {
      this.photosDialogVisible = false
      this.payDialogVisible = false
    },
    // 展示全部
    showAllPhoto (urls) {
      this.curr_image_urls = urls
      this.photosDialogVisible = true
    },
    // 打赏判断
    filterHandler (value, row, column) {
      return row.payInfo.pay_status === value
    },
    // 显示打赏弹窗
    showPayDialog (row) {
      this.pay_pram.key = row.key
      this.payDialogVisible = true
    },
    // Success event handler
    clipboardSuccessHandler ({value, event}) {
      console.log('success', value)
      this.$message.success('已复制,请在微信、QQ或者其他手机浏览器打开')
    },
    // Error event handler
    clipboardErrorHandler ({value, event}) {
      console.log('error', value)
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
    width: 120px;
    height: 180px;
    object-fit: cover;
  }

  .photo_list {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }

</style>
