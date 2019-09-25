<template>
  <div>
    <el-card>
      <div slot="header">
        <span>一级菜单列表</span>
        <span style="float: right">
           <el-button type="success" size="small" round @click="showEditMenu({})">新增一级菜单</el-button>
      </span>
      </div>
      <div>
        <el-table
          stripe
          :data="menuTypeList"
          style="width: 100%">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="type_name"
            label="菜单名称">
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
                @click="showEditMenu(scope.row)"
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
    <el-dialog
      width="35%"
      center
      :title='dialogTitle'
      :visible.sync="dialogVisible">
      <el-form :model="menuTypeInfo" :rules="rules" ref="menuTypeInfo" label-width="80px" style="margin-right: 50px">
        <el-form-item label="菜单名称" prop="menu_name" size="small">
          <el-input v-model="menuTypeInfo.type_name" size="small" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="备注" size="small">
          <el-input v-model="menuTypeInfo.remark" size="small" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="postEditMenu()" size="small">确 定</el-button>
       </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MenuList',
  data () {
    return {
      menuTypeList: [],
      dialogVisible: false,
      dialogTitle: '编辑菜单',
      menuTypeInfo: {},
      rules: {
        type_name: [
          {required: true, message: '请输入菜单名称', trigger: 'blur'}
        ]
      }

    }
  },
  created () {
    this.getMenuTypeList()
  },
  methods: {
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
      this.$confirm('删除一级菜单，所关联的二级菜单也会删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$requestUtils.post(this, '/delete_menu_type', row)
          .then(res => {
            // this.getMenuTypeList()
            this.$comUtils.showSuccessMessage(this, '删除成功')
            location.reload()
          })
      })
    },
    showEditMenu (row) {
      this.menuTypeInfo = row
      this.dialogVisible = true
    },
    // 提交编辑菜单
    postEditMenu () {
      this.$refs.menuTypeInfo.validate((valid) => {
        if (valid) {
          this.dialogVisible = false
          this.$requestUtils.post(this, '/create_menu_type', this.menuTypeInfo)
            .then(res => {
              // this.getMenuTypeList()
              this.$comUtils.showSuccessMessage(this, '编辑成功')
              location.reload()
            })
        }
      })
    }

  }
}
</script>

<style>
</style>
