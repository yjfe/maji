<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2018-10-29 16:30:28
 * @LastEditTime: 2020-11-30 10:32:40
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="upload-container">
    <el-button
      class="upload-container-button"
      :style="{ background: color, borderColor: color }"
      icon="el-icon-upload"
      size="mini"
      type="primary"
      @click="dialogVisible = true"
    >
      资源上传
    </el-button>
    <el-dialog :visible.sync="dialogVisible" title="上传资源" @close="handleClose">
      <el-form label-width="90px">
        <el-form-item label="资源类型：">
          <el-radio-group v-model="type">
            <el-radio label="img" v-if="addImg">图片</el-radio>
            <el-radio label="video" v-if="addVideo">视频</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="图片上传：" v-if="type === 'img' && addImg">
          <ImgGroupUpload
            v-bind="imgProps"
            :action="imgAction"
            v-model="imgList"
            :withCredentials="true"
          />
        </el-form-item>
        <template v-else-if="type === 'video' && addVideo">
          <el-form-item label="视频上传：">
            <VideoUpload v-bind="VideoProps" :qiniuAction="videoAction" v-model="videoFile.value" />
          </el-form-item>
          <el-form-item label="宽度：">
            <el-input-number
              :min="0"
              :max="800"
              :controls="false"
              :precision="0"
              :step="1"
              v-model.number="videoFile.width"
            />
            px
          </el-form-item>
          <el-form-item label="高度：">
            <el-input-number
              :min="0"
              :max="800"
              :controls="false"
              :precision="0"
              :step="1"
              v-model.number="videoFile.height"
            />
            px
          </el-form-item>
        </template>
      </el-form>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import ImgGroupUpload from '@/components/ImgGroupUpload'
import VideoUpload from '@/components/VideoUpload'

export default {
  componentName: 'UploadResource',
  components: { ImgGroupUpload, VideoUpload },
  props: {
    color: {
      type: String,
      default: '#1890ff'
    },
    addImg: {
      type: Boolean,
      default: true
    },
    addVideo: {
      type: Boolean,
      default: true
    },
    imgProps: {
      type: Object,
      default() {
        return {}
      }
    },
    VideoProps: {
      type: Object,
      default() {
        return {}
      }
    },
    imgAction: {
      type: String,
      default: ''
    },
    videoAction: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      type: 'img',
      dialogVisible: false,
      imgList: [],
      videoFile: {
        height: 240,
        width: 320
      }
    }
  },
  mounted() {
    this.type = this.addImg ? 'img' : 'video'
  },
  methods: {
    handleSubmit() {
      let value
      switch (this.type) {
        case 'img':
          value = this.imgList
          break
        case 'video':
          value = this.videoFile
          break
        default:
          break
      }
      this.$emit('successCBK', {
        type: this.type,
        value
      })
      this.handleClose()
    },
    handleClose() {
      this.imgList = []
      this.videoFile = {
        height: 240,
        width: 320
      }
      this.dialogVisible = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="less" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
