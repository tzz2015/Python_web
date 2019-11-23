<template>
  <div>
    <el-upload
      v-if="limit!==1"
      ref="mainUpload"
      :action="uploadPath"
      :multiple="multiple"
      :limit="plimit"
      :file-list="pfileList"
      :accept="accept"
      :list-type="listType"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :on-preview="handlePreview"
      :before-upload="handleBeforeUpload">
      <el-button size="small" type="primary" v-bind:id="idName">{{ pbtnTitle }}</el-button>
      <div slot="tip" class="el-upload__tip">{{ ptips }}</div>
    </el-upload>
    <el-upload
      v-if="limit===1"
      class="avatar-uploader"
      :action="uploadPath"
      :show-file-list="false"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :on-preview="handlePreview"
      :file-list="pfileList"
      :before-upload="handleBeforeUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <div v-else class="avatar-uploader-icon">
        <i class="el-icon-plus"></i>
      </div>
      <div slot="tip" class="el-upload__tip">{{ ptips }}</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import UrlUtils from '@/util/UrlUtils'
import imageConversion from 'image-conversion'
export default {
  created () {
    this.pbtnTitle = this.pbtnTitle ? this.pbtnTitle : '点击上传'
    this.plimit = this.plimit > 0 ? this.plimit : 1
    this.updateFileList()
    console.log(process.env.API_HOST)
  },
  name: 'upload-file',
  props: {
    value: Array,
    // 限制上传的数量
    limit: Number,
    // 显示的文件列表
    fileList: Array,
    // 上传按钮标题
    btnTitle: String,
    // 是否多选
    multiple: Boolean,
    // 上传提示
    tips: String,
    // 接受的文件类型
    accept: String,
    // 回调方法
    changeCallback: Function,
    // 回调的tag
    callbackTag: {},
    // 列表样式
    listType: String,
    idName: String
  },
  data () {
    return {
      uploadPath: process.env.API_HOST + '/upload_file',
      randomLength: 10,
      didUploadFileList: [],
      pbtnTitle: this.btnTitle,
      ptips: this.tips,
      pfileList: [],
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {
    plimit: {
      get () {
        if (this.limit) {
          return this.limit
        } else {
          return 1
        }
      },
      set (newVal) {
      }
    }
  },
  watch: {
    fileList (val) {
      this.updateFileList()
    }
  },
  methods: {
    handleExceed (files, fileList) {
      this.$message({
        message: '你选择了' + files.length + '张图片，此处限制最多传' + this.plimit + '张',
        type: 'warning'
      })
    },
    handleSuccess (response, file, fileList) {
      if (this.limit === 1 && fileList.length > 1) {
        fileList = [fileList[fileList.length - 1]]
        this.didUploadFileList = []
      }
      this.didUploadFileList.push(response)
      this.updateValue(fileList)
      this.imageUrl = response.data
    },
    handleRemove (file, fileList) {
      this.didUploadFileList = this.didUploadFileList.filter(obj => {
        return obj !== file.response
      })
      this.updateValue(fileList)
    },
    handlePreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleBeforeUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 20
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 20MB!')
        return false
      }
      if (this.accept.match('jpg') && file.type !== 'image/jpeg' && file.type !== 'image/png') {
        this.$message({message: '图片格式只支持jpg或png', type: 'error'})
        return false
      }
      if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
        let isLt2M = file.size / 1024 / 1024 < 5 // 判定图片大小是否小于10MB
        if (!isLt2M) {
          return new Promise((resolve, reject) => {
            imageConversion.compressAccurately(file, 2000).then(res => { // console.log(res)
              resolve(res)
            })
          })
        }
      }
    },
    updateValue (list) {
      var files = ''
      if (this.changeCallback) {
        if (list.length) {
          list = list.map(val => {
            if (val.response) {
              return val.response.data
            } else {
              return val
            }
          })
          files = list.map(item => {
            return item
          }).join(',')
        }
        this.changeCallback(list, this.callbackTag, files)
      }
    },
    updateFileList () {
      if (this.fileList) {
        this.pfileList = this.fileList.map(currentValue => {
          var name = UrlUtils.parseURL(currentValue).file
          if (name.length > 11) {
            name = name.substring(11)
          }
          return {name: name, url: currentValue}
        })
      } else {
        this.pfileList = []
      }
      var files = ''
      if (this.pfileList) {
        // 单张图片
        if (this.limit === 1 && this.pfileList.length > 0) {
          this.imageUrl = this.pfileList[0].url
        }
        files = this.pfileList
          .map(item => {
            return item.url
          })
          .join(',')
      }
      if (this.changeCallback) {
        this.changeCallback(this.pfileList, this.callbackTag, files)
      }
    }
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
  }

  .avatar {
    width: 148px;
    height: 148px;
    object-fit: cover;
  }
</style>
