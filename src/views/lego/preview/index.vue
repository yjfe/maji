<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-09-03 19:16:49
 * @LastEditTime: 2020-12-09 16:13:27
 * @LastEditors: Please set LastEditors
 -->
<template>
  <layout class="frame">
    <x-header slot="header">
      <template slot="right">
        <HeaderTips />
      </template>
    </x-header>
    <sidebar 
      slot="sidebar" 
      class="frame-sidebar" 
      ref="frame-sidebar" 
      :menuList="menuList" 
      title="麻鸡搭建系统" 
      @select="handleChangeEnv">
      <div class="auth-text">
        <span>按钮权限校验：</span>
        <el-switch
          inactive-color="#ff4949"
          v-model="isCheckAuth"
          @change="handleChangeEnv()">
        </el-switch>
      </div>
      <template v-if="id !== 'cache'">
        <el-button type="primary" icon="el-icon-document-copy" @click="handleCopyUrl">{{layoutGrid ? ' 复制链接' : ''}}</el-button>
        <el-button type="primary" 
          v-if="status === 1 || status === 4" 
          icon="el-icon-check"
          @click="handleTestSuccess">{{layoutGrid ? ' 测试通过' : ''}}</el-button>
        <el-button type="primary" 
          v-if="status === 1 || status === 2" 
          icon="el-icon-close" 
          @click="handleTestError">{{layoutGrid ? ' 测试不通过' : ''}}</el-button>
      </template>
    </sidebar>
    <XBody slot="body" class="frame-body">
      <wrapper :class="classes">
        <div class="frame-container" ref="frame-container">
          <iframe reff="iframeBox" :src="previewSrc" class="iframe-box" />
        </div>
      </wrapper>
    </XBody>
    <div slot="footer"></div>
  </layout>
</template>
<script>
import { mapGetters } from 'vuex'
import Layout from '@/components/Layout'
import XBody from '@/components/XBody'
import Wrapper from '@/components/Wrapper'
import XHeader from '@/components/XHeader'
import { copyText } from '@/utils'
import * as pageApi from '@/views/pageManage/service'
import HeaderTips from '@/components/HeaderTips'
import { formatUrl } from '@/views/lego/utils'
import * as api from '../service'
import Sidebar from './components/Sidebar'
import menuList from './menu'

export default {
  computed: {
    ...mapGetters({
      layoutGrid: 'layoutGrid' // 是否栅格布局
    }),
    classes() {
      return this.layoutGrid ? 'layout-grid' : ''
    }
  },
  components: { 
    Layout, 
    XBody, 
    Wrapper, 
    Sidebar, 
    XHeader,
    HeaderTips
  },
  data() {
    return {
      menuList,
      status: '',
      previewSrc: '',
      id: null,
      v: null,
      pagesModule: {},
      isCheckAuth: true,
      pageEnum: {
        PagesForm: 'form',
        PagesList: 'list',
        PagesDetail: 'detail'
      }
    }
  },
  watch: {
    layoutGrid(value) {
      this.styles(value)
    }
  },
  created() {
    this.$store.dispatch('getUserInfo') // 获取用户信息
    this.id = this.$route.params.id
    this.v = this.$route.query.v
    window.isPreview = true // 设置环境变量
    this.getDetails()
  },
  mounted() {
    this.styles(this.layoutGrid)
    window.onresize = () => {
      this.styles(this.layoutGrid)
    }
    window.addEventListener('message', this.switchEvent, true)
  },
  destroyed() {
    window.isPreview = false // 设置环境变量
    window.removeEventListener('message', this.switchEvent, true)
  },
  methods: {
    styles(layout) {
      const height = window.innerHeight - 60
      const container = this.$refs['frame-container']
      if (layout && container) {
        container.style.minHeight = `${height - 300}px`
      }
    },
    /**
     * @description: 获取接口配置信息
     * @param {type} 
     * @return: 
     */
    getDetails() {
      if (this.id) {
        if (this.id === 'cache') {
          this.getCacheData()
        } else if (this.v) {
          this.getVersionData({ id: this.id, v: this.v })
        } else {
          // 最新发布版本
          this.getNewData({ id: this.id })
        }
      }
    },
    /**
     * @method: 获取缓存数据
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-05 14:38:26
     */
    getCacheData() {
      this.setDetails(window.sessionStorage.getItem('legoPreview'))
    },
    /**
     * @method: 获取最新发布内容
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-05 11:20:07
     */
    getNewData({ id }) {
      // const status = this.$route.query.pageStatus || 3
      api.getNewData({ pageManageId: id, status: 4 }).then((res) => {
        if (!res.data || !res.data.content) {
          this.$message.error('查询失败')
          return
        }
        this.setDetails(res.data.content, id)
        this.status = res.data.status
        this.v = res.data.id
      })
    },
    /**
     * @method: 获取版本内容
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-05 14:38:15
     */
    getVersionData({ id, v }) {
      api.getVersionData({ id: v }).then((res) => {
        if (!res.data || !res.data.content) {
          this.$message.error('查询失败')
          return
        }
        this.status = res.data.status
        this.setDetails(res.data.content, id)
      })
    },
    /**
     * @method: 解析数据
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-09-04 11:32:55
     */
    setDetails(jsonStr) {
      try {
        const { idModule, pagesModuleId } = JSON.parse(jsonStr)
        window.sessionStorage.legoPreview = jsonStr
        // 模块数据增加当前页面的id
        this.pagesModule = idModule[pagesModuleId]
        this.handleChangeEnv('tx')
      } catch (error) {
        console.error(error)
        console.error('获取数据异常')
      }
    },
    /**
     * @method: 菜单选择切换环境
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-09-04 10:28:05
     */
    handleChangeEnv(env) {
      window.previewEnv = env || window.previewEnv
      const { ...query } = this.$route.query
      this.previewSrc = formatUrl(`//${window.location.host}/generate/view/preview`, {
        ...query,
        env: window.previewEnv,
        isCheckAuth: this.isCheckAuth
      })
    },
    /**
     * @method: 测试通过
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-09-04 10:38:35
     */
    handleTestSuccess() {
      this.$confirm('请确认该页面测试通过件', '测试通过', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        pageApi.updateVersion({ pageVersionId: this.v, pageManageId: this.id, status: 2 }, { successMsg: '发布成功' }).then(() => {
          this.$router.push('/page/manage')
        })
      })
    },
    /**
     * @method: 测试不通过
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-09-04 10:38:38
     */
    handleTestError() {
      this.$prompt('请输入测试不通过备注原因', '测试不通过', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'textarea',
        inputPattern: /^.{10,200}$/,
        inputErrorMessage: '请输入10-200字符的备注说明'
      }).then(({ value }) => {
        pageApi.updateVersion({ 
          pageVersionId: this.v, 
          pageManageId: this.id, 
          status: 4, 
          remark: value 
        }, { successMsg: '发布成功' }).then(() => {
          this.$router.push('/page/manage')
        })
      })
    },
    /**
     * @method: 复制当前页面正式地址
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-09-06 17:23:23
     */
    handleCopyUrl() {
      const onlineUrl = this.id !== 'cache' ? `${window.location.origin}/generate/view/${this.id}` : ''
      copyText(onlineUrl)
    },
    switchEvent(e) {
      switch (e.data.act) {
        case 'setBreadcrumb':
          this.setBreadcrumb(e.data.msg)
          break
        case 'routerLink': 
          this.toRouterLink(e.data.msg)
          break
        case 'export':
          this.fileExport(e.data.msg)
          break
        case 'import':
          this.fileImport(e.data.msg)
          break
        default:
          break
      }
    },
    /**
     * @method: 设置面包屑
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-10-09 18:32:29
     */
    setBreadcrumb(data) {
      this.$setBreadcrumb(data)
    },
    /**
     * @method: 执行外部链接跳转
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-10-09 18:32:35
     */
    toRouterLink(data) {
      console.log('跳转地址：', data)
      // this.$router.push(data)
    },
    /**
     * @method: 自定义导出
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-10-09 18:33:25
     */
    fileExport(data) {
      console.log('导出数据', data)
      this.$message.success('自行解析下载')
    },
    fileImport(data) {
      const reader = new FileReader()
      reader.readAsDataURL(data.file)
      reader.onload = () => {  
        console.log('base64', reader.result)
      }  
      console.log('导入数据', data)
      this.$message.success('自行解析导入')
    }
  }
}
</script>

<style lang="less">
body {
  background: #ebf0f5;
}
.frame {
  display: flex;
  .layout--content{
    flex: 1;
  }
  &-body {
    &::after {
      content: '';
      clear: both;
      display: table;
    }
  }
  &-sidebar {
    max-width: 180px;
    transition: .4s;
    margin-right: 0px;
    overflow: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      background-color: #242d3b;
      border-radius: 0px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #6b7fa4;
      border-radius: 10px;
    }
    .auth-text{
      color: #fff;
      height: 40px;
      line-height: 40px;
      text-align: center
    }
  }
  &-container {
    overflow: hidden;
    overflow-y: auto;
    position: absolute;
    bottom: 0;
    top: 65px;
    left: 0;
    right: 0;
    margin-left: 64px;
    // margin-left: 180px;
    transition: .4s;
  }
  .frame-sidebar {
    display: block;
  }
  .layout-grid {
    .frame-sidebar {
    }
    .frame-container {
      margin-left: 180px;
    }
  }
  .content {
    padding: 60px;
    > .heading-1:first-child {
      margin-top: 0;
    }
  }
}
.router-link:hover {
  color: #3983e5 !important;
}
.iframe-box {
  width: 100%;
  min-height: calc(100vh - 68px);
  border: 0;
}
</style>
