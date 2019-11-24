<template>
  <el-card>
    <div slot="header">
      <span>编辑相册</span>
    </div>
    <el-form :model="alumInfo" :rules="rules" ref="alumInfo" label-width="100px" class="demo-ruleForm">
      <el-form-item label="背景图片" prop="bg_url">
        <UF :limit="1" list-type="picture-card"
            :fileList="alumInfo.bg_url ? [alumInfo.bg_url] : []"
            accept=".png,.jpg,.jpeg,.gif" :changeCallback="handleFileChange"
            callbackTag="bg_url" tips="图片尺寸750*1334显示最佳"
            class="imageFloat"
        ></UF>
      </el-form-item>
      <el-form-item label="背景音乐" prop="music_url">
        <UF :limit="1" list-type="fileList"
            :fileList="alumInfo.music_url ? [alumInfo.music_url] : []"
            accept=".mp3" :changeCallback="handleFileChange"
            callbackTag="music_url" tips="请务必上传音频文件"
            imageType="false"
            class="imageFloat"
        ></UF>
      </el-form-item>
      <el-form-item label="相册图片" prop="image_urls">
          <div style="float:left">内部魔方图片，图片尺寸为正方形图片显示效果最佳</div>
          <div class="ver_upload">
            <UF :limit="1" list-type="picture-card"
                :fileList="alumInfo.image_urls[0] ? [alumInfo.image_urls[0]] : []"
                accept=".png,.jpg,.jpeg,.gif" :changeCallback="handleFileChange"
                callbackTag="image_0" tips="前" class="ver_upload_UF"
            ></UF>
            <UF :limit="1" list-type="picture-card"
                :fileList="alumInfo.image_urls[1] ? [alumInfo.image_urls[1]] : []"
                accept=".png,.jpg,.jpeg,.gif" :changeCallback="handleFileChange"
                callbackTag="image_1" tips="后" class="ver_upload_UF"
            ></UF>
            <UF :limit="1" list-type="picture-card"
                :fileList="alumInfo.image_urls[2] ? [alumInfo.image_urls[2]] : []"
                accept=".png,.jpg,.jpeg,.gif" :changeCallback="handleFileChange"
                callbackTag="image_2" tips="下" class="ver_upload_UF"
            ></UF>
            <UF :limit="1" list-type="picture-card"
                :fileList="alumInfo.image_urls[3] ? [alumInfo.image_urls[3]] : []"
                accept=".png,.jpg,.jpeg,.gif" :changeCallback="handleFileChange"
                callbackTag="image_3" tips="左" class="ver_upload_UF"
            ></UF>
            <UF :limit="1" list-type="picture-card"
                :fileList="alumInfo.image_urls[4] ? [alumInfo.image_urls[4]] : []"
                accept=".png,.jpg,.jpeg,.gif" :changeCallback="handleFileChange"
                callbackTag="image_4" tips="右" class="ver_upload_UF"
            ></UF>
          </div>
        <div style="float:left">外部魔方图片，图片尺寸为正方形图片显示效果最佳</div>
        <div class="ver_upload">
          <UF :limit="1" list-type="picture-card"
              :fileList="alumInfo.image_urls[5] ? [alumInfo.image_urls[5]] : []"
              accept=".png,.jpg,.jpeg,.gif" :changeCallback="handleFileChange"
              callbackTag="image_5" tips="前" class="ver_upload_UF"
          ></UF>
          <UF :limit="1" list-type="picture-card"
              :fileList="alumInfo.image_urls[6] ? [alumInfo.image_urls[6]] : []"
              accept=".png,.jpg,.jpeg,.gif" :changeCallback="handleFileChange"
              callbackTag="image_6" tips="后" class="ver_upload_UF"
          ></UF>
          <UF :limit="1" list-type="picture-card"
              :fileList="alumInfo.image_urls[7] ? [alumInfo.image_urls[7]] : []"
              accept=".png,.jpg,.jpeg,.gif" :changeCallback="handleFileChange"
              callbackTag="image_7" tips="下" class="ver_upload_UF"
          ></UF>
          <UF :limit="1" list-type="picture-card"
              :fileList="alumInfo.image_urls[8] ? [alumInfo.image_urls[8]] : []"
              accept=".png,.jpg,.jpeg,.gif" :changeCallback="handleFileChange"
              callbackTag="image_8" tips="上" class="ver_upload_UF"
          ></UF>
          <UF :limit="1" list-type="picture-card"
              :fileList="alumInfo.image_urls[9] ? [alumInfo.image_urls[9]] : []"
              accept=".png,.jpg,.jpeg,.gif" :changeCallback="handleFileChange"
              callbackTag="image_9" tips="左" class="ver_upload_UF"
          ></UF>
          <UF :limit="1" list-type="picture-card"
              :fileList="alumInfo.image_urls[10] ? [alumInfo.image_urls[10]] : []"
              accept=".png,.jpg,.jpeg,.gif" :changeCallback="handleFileChange"
              callbackTag="image_10" tips="右" class="ver_upload_UF"
          ></UF>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 50%" @click="submitForm('alumInfo')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import UF from '@/components/plugin/UploadFile.vue'

export default {
  name: 'EditAlum',
  components: {
    UF
  },
  data () {
    return {
      alumInfo: {
        bg_url: '',
        music_url: '',
        image_urls: []
      },
      rules: {
        bg_url: [
          {required: true, message: '请上传背景图片', trigger: 'change'}
        ],
        music_url: [
          {required: true, message: '请上传背景音乐', trigger: 'change'}
        ],
        image_urls: [
          {required: true, message: '请上相册照片', trigger: 'change'}
        ]
      }
    }
  },
  created () {
    console.log(this.$route.query.alumInfo)
    if (this.$route.query.alumInfo !== undefined) {
      this.alumInfo = this.$route.query.alumInfo
    }
  },
  methods: {
    // 图片返回
    handleFileChange (list, name, url) {
      if (name === 'bg_url') {
        this.alumInfo.bg_url = url
      } else if (name === 'music_url') {
        this.alumInfo.music_url = url
      } else if (name === 'image_0') {
        this.alumInfo.image_urls[0] = url
      } else if (name === 'image_1') {
        this.alumInfo.image_urls[1] = url
      } else if (name === 'image_2') {
        this.alumInfo.image_urls[2] = url
      } else if (name === 'image_3') {
        this.alumInfo.image_urls[3] = url
      } else if (name === 'image_4') {
        this.alumInfo.image_urls[4] = url
      } else if (name === 'image_5') {
        this.alumInfo.image_urls[5] = url
      } else if (name === 'image_6') {
        this.alumInfo.image_urls[6] = url
      } else if (name === 'image_7') {
        this.alumInfo.image_urls[7] = url
      } else if (name === 'image_8') {
        this.alumInfo.image_urls[8] = url
      } else if (name === 'image_9') {
        this.alumInfo.image_urls[9] = url
      } else if (name === 'image_10') {
        this.alumInfo.image_urls[10] = url
      } else if (name === 'image_11') {
        this.alumInfo.image_urls[11] = url
      }
    },
    submitForm (formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const list = []
          _this.alumInfo.image_urls.forEach(item => {
            if (item !== '') {
              list.push(item)
            }
          })
          if (list.length < 11) {
            this.$message.error('请上传完整的11张相册图片')
          } else {
            _this.uploadAlum()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 上传相册信息
    uploadAlum () {
      let params = Object.assign({}, this.alumInfo)
      params.image_urls = this.alumInfo.image_urls.map(item => {
        return item
      })
        .join(',')
      const that = this
      this.$requestUtils.post(this, '/edit_alum', params)
        .then(res => {
          if (res) {
            if (res.data !== null || res.data !== undefined) {
              that.$router.replace('/admin/AlumList')
            }
          }
        })
    }
  }
}
</script>

<style scoped>
  /*靠左排列*/
  .imageFloat {
    float: left;
    margin-left: 20px;
  }

  /*上传组合横向排列*/
  .ver_upload {
    float: left;margin-top: 20px;display:flex;flex-wrap: wrap;
  }
  .ver_upload_UF{
    margin-right: 10px;
  }

</style>
