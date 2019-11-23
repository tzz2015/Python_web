<template>
  <el-card>
    <el-form :model="alumInfo" :rules="rules" ref="alumInfo" label-width="100px" class="demo-ruleForm">
      <el-form-item label="背景图片" prop="bg_url">
        <UF :limit="1" list-type="picture-card"
            :fileList="alumInfo.bg_url ? [alumInfo.bg_url] : []"
            accept=".png,.jpg,.jpeg" :changeCallback="handleFileChange"
            callbackTag="bg_url" tips="图片尺寸750*1334显示最佳"
            style="float:left;margin-left: 20px"
        ></UF>
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
      alumInfo: '',
      rules: {
        bg_url: [
          {required: true, message: '请上传背景图片', trigger: 'change'}
        ]
      }
    }
  },
  created () {
    this.alumInfo = this.$route.query.alumInfo
    console.log(this.alumInfo)
  },
  methods: {
    // 图片返回
    handleFileChange (list, name, url) {
      console.log(list)
      console.log(name)
      console.log(url)
    }
  }
}
</script>

<style scoped>

</style>
