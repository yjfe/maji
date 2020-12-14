<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-11-08 10:46:49
 * @LastEditors: Please set LastEditors
 -->
 <template>
  <div class="header lego-header">
    <el-row class="header-row">
      <el-col class="header-sub" :span="8">
        <div class="showMenu" :class="{'hide': $store.getters.layoutGrid}" @click="showMenu"><img src="./icon-menu.png"></div>
        <el-breadcrumb separator="/" class="header-breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item 
            :to="breadcrumb.length === index - 1 ? '' : { path: item.path }" v-for="(item, index) in breadcrumb" 
            :key="index">{{item.title}}</el-breadcrumb-item>
          <!-- <el-breadcrumb-item>{{menuName || ''}}</el-breadcrumb-item> -->
        </el-breadcrumb>
      </el-col>
      <el-col class="lego-header__btn" :span="8">
        <li>
          <el-button type="text" @click="handleJSON">编辑JSON</el-button>
        </li>
        <li>
          <el-button type="text" @click="handlePreview">预览</el-button>
        </li>
        <li>
          <el-button type="text" @click="handleSubmitDraft()">保存</el-button>
        </li>
        <li>
          <el-button type="text" @click="handleSubmit()">提交测试</el-button>
        </li>
      </el-col>
      <el-col class="header-sub flex" :span="8">
        <!-- 开发产品模式切换，暂时不需要了 -->
        <!-- <el-radio-group v-model="level" size="mini" @change="changeLevel" style="margin-top: 10px">
          <el-radio-button :label="1">产品模式</el-radio-button>
          <el-radio-button :label="3">开发模式</el-radio-button>
        </el-radio-group> -->
        <HeaderTips />
        <el-dropdown @command="userEdit" v-if="userName">
          <div class="el-dropdown-link">
            <!-- <e-avatar class="user-photo" :src="this.person_info.iconUrl" /> -->
            <span class="el-dropdown-trigger-text user-name small">{{userName}}</span>
          </div>
          <i class="el-icon-arrow-down" />
          <el-dropdown-menu slot="dropdown" class="user-dropdown-menu">
            <el-dropdown-item command="userexit">
              <i class="el-icon-back"></i> 退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <JsonDialog ref="JsonDialog"/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { checkFormValidate } from '@/views/lego/edit/validator'
import HeaderTips from '@/components/HeaderTips'
import manageJson from '@/views/lego/funComponents/manage.json'
import JsonDialog from './JsonDialog'

export default {
  name: 'EditHeader',
  components: { HeaderTips, JsonDialog },
  computed: {
    ...mapState({
      floorList: state => state.manage.floorList,
      idModule: state => state.manage.idModule,
      pagesModuleId: state => state.manage.pagesModuleId,
      userName: 'userName' // 登录人姓名
    })
  },
  data() {
    return {
      breadcrumb: [],
      notify: '',
      level: 3
    }
  },
  mounted() {
    const self = this
    window.addEventListener(
      'message',
      (e) => {
        if (e.data.act === 'breadcrumb') {
          self.breadcrumb = e.data.msg
        }
      },
      false
    )
    // 设置操作级别
    this.level = sessionStorage.getItem('level') || 3
  },
  methods: {
    /**
     * @method: 提交测试
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-09-16 14:21:03
     */
    handleSubmit() {
      checkFormValidate(this.idModule).then((res) => {
        // 关闭上次的提示框
        if (this.notify) {
          this.notify.close()
        }
        if (Object.keys(res).length > 0) {
          this.openMessage(res)
        } else {
          // 提交数据
          this.$emit('submit', 1)
        }
      })
    },
    /**
     * @method: 保存草稿
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-09-16 14:21:16
     */
    handleSubmitDraft() {
      this.$confirm('确认保存为草稿?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('submit', 5)
      })
    },
    /**
     * @description: 预览
     * @param {type} 
     * @return: 
     */
    handlePreview() {
      // 缓存页面配置，组件信息
      window.sessionStorage.legoPreview = JSON.stringify({
        floorList: this.floorList,
        idModule: this.idModule,
        pagesModuleId: this.pagesModuleId
      })
      const { href } = this.$router.resolve({
        path: '/lego/preview/cache'
      })
      window.open(encodeURI(href), '_blank')
    },
    userEdit(command) {
      if (command === 'userexit') {
        this.$confirm('确定退出登录, 是否继续?', '温馨提示', {
          type: 'warning'
        }).then(() => {
          this.$router.push({ path: '/login' })
          // indexApi.userExit({}, {successMsg: '登出成功'}).then((res) => {
          //   url = url + '/login'
          //   location.href = url
          // })
        })
      }
    },
    showMenu() {
      const show = this.$store.getters.layoutGrid
      this.$store.dispatch('setLayoutGrid', !show)
    },
    /**
     * @method: 打开校验提示框
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-06-26 15:33:52
     */
    openMessage(data) {
      const h = this.$createElement
      const element = []
      const dataArr = Object.keys(data)
      dataArr.forEach((key) => {
        const { type, message } = data[key]
        const messageElement = []
        Object.keys(message).forEach((msgKey) => {
          const msgItem = message[msgKey][0]
          messageElement.push(h('p', { 
            attrs: { key },
            style: { cursor: 'pointer' },
            on: {
              click: this.handleSetActiveId
            }
          }, `${msgItem.field}： ${msgItem.message}`))
        })
        element.push(h('el-collapse-item', {}, [
          h('div', { 
            class: 'rules-validator-tips', 
            slot: 'title'
          }, `${manageJson.componentsInfo[type].name}：${key}`),
          ...messageElement
        ]))
      })
      this.notify = this.$notify.error({
        title: `校验错误 ${dataArr.length}个组件`,
        duration: 0,
        position: 'bottom-left',
        message: h('el-collapse', { 
          class: 'rules-validator-collapse', 
          styles: { width: '240px' },
          attrs: { accordion: true }
        }, element)
      })
    },
    /**
     * @method: 切换组件
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-06-26 16:05:11
     */
    handleSetActiveId(e) {
      const id = e.target.getAttribute('key')
      this.$store.dispatch('manage/setActiveId', id)
      this.$store.dispatch('manage/setActiveIndex', null)
      this.$root.$emit('startValidator')
    },
    /**
     * @description: 直接生成json
     * @param {type} 
     * @return: 
     */
    handleJSON() {
      this.$refs.JsonDialog.open({
        floorList: this.floorList,
        idModule: this.idModule,
        pagesModuleId: this.pagesModuleId
      })
    },
    changeLevel(e) {
      this.$store.dispatch('manage/setLevel', e)
    }
  }
}
</script>
<style lang="less" scoped>
@import '~styles/var';
@import '~components/XHeader/src/index';
.lego-header{
  &__btn{
    text-align: center;
    li{
      display: inline-block;
      padding: 0 20px;
      margin: 10px 0;
      height: 30px;
      border-right: 1px solid @border-color-base;
      &:last-child{
        border-right: 0
      }
    }
  }
}
</style>
<style lang="less">
.rules-validator-tips{
  width: 240px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rules-validator-collapse{
  max-height: 300px;
  overflow-y: auto;
}
</style>
