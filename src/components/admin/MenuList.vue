<template>
  <div>
    <el-card>
      <div slot="header">
        <span>菜单列表</span>
        <span style="float: right">
           <el-button type="success" size="small" round>新增菜单</el-button>
      </span>
      </div>
      <div>
        <el-table
          border
          :data="menuList"
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="menu_name"
            label="菜单名称">
          </el-table-column>
          <el-table-column
            prop="menu_path"
            label="菜单路径">
          </el-table-column>
          <el-table-column
            label="菜单分类">
            <template slot-scope="scope">
              <a>{{scope.row.menu_type.type_name}}</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small">
                编辑
              </el-button>
              <el-button
                @click="showDeleteDialog(scope.row)"
                type="text"
                size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'MenuList',
  data () {
    return {
      menuList: [],
      menuTypeList: [],
      dialogVisible: false

    }
  },
  created () {
    this.getMenuList()
    this.getMenuTypeList()
  },
  methods: {
    // 获取所有的菜单列表
    getMenuList () {
      this.$requestUtils.get(this, '/menu_list')
        .then(res => {
          if (res) {
            this.menuList = res.data
          }
        })
    },
    // 表格样式
    tableRowClassName ({row, rowIndex}) {
      if (rowIndex % 2 === 1) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
    },
    // 获取菜单类型
    getMenuTypeList () {
      this.$requestUtils.get(this, '/menu_type_list')
        .then(res => {
          if (res) {
            this.menuTypeList = res.data
          }
        })
    },
    // 删除菜单
    showDeleteDialog (row) {
      this.$confirm('你确定删除该菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$requestUtils.post(this, '/delete_menu', row)
          .then(res => {
            this.getMenuList()
            this.$comUtils.showSuccessMessage(this, '删除成功')
          })
      })
    }

  }
}
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
