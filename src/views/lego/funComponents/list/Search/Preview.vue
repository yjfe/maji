<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-12-08 11:00:10
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form class="lego-search" ref="search" :label-width="`${item.styles ? (item.styles.labelWidth || 100) : 100}px`" :model="idModule" >
    <el-row>
      <el-col :span="schema.col" v-for="(schema, index) in firstForm" :key="index">
        <FreeComponentsId v-if="schema.module && schema.module.length > 13" :moduleId="schema.module" :key="schema.module" :parentData="search"/>
        <div class="default-text" v-else>请选择组件</div>
      </el-col>
      <template v-if="leaveForm.length > 0 && showMore">
        <el-col :span="schema.col" v-for="(schema, index) in leaveForm" :key="`leave${index}`">
          <FreeComponentsId v-if="schema.module && schema.module.length > 13" :moduleId="schema.module" :key="schema.module" :parentData="search"/>
          <div class="default-text" v-else>请选择组件</div>
        </el-col>
      </template>
      <div class="search-more">
        <div class="search-more-toggle" 
            v-if="leaveForm.length > 0"
            :class="{'is-open':showMore}"
            @click="showMore = !showMore"
            v-text="showMore?'收起':'展开'"></div>
        <el-button type="primary" native-type="submit" @click.native.prevent="handleSearch()">搜索</el-button>
        <el-button @click="handleReset">重置</el-button>
        <slot />
      </div>
    </el-row>
  </el-form>
</template>
<script>
import { mapState } from 'vuex'
import FreeComponentsId from '@/views/lego/components/FreeComponentsId'
import { useCodeEvent } from '@/views/lego/utils'

export default {
  name: 'SearchPreview',
  components: {
    FreeComponentsId
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    query: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    ...mapState({
      idModule: state => state.manage.idModule
    }),
    firstForm() {
      return this.item.layout.filter((item, index) => index < this.firstFormNum)
    },
    leaveForm() {
      return this.item.layout.filter((item, index) => index >= this.firstFormNum)
    }
  },
  data() {
    return {
      firstFormNum: 6,
      showMore: false,
      search: {},
      firstData: null,
      isLock: false
    }
  },
  mounted() {
    // 代码组件 - 自定义生命周期 - 初始化 created
    useCodeEvent(this.item, 'componentCreated', this)(this.query, this.item, this.$store.getters['manage/idModule'])
    this.$root.$on(`SearchSubmit${this.item.isDialog || ''}`, this.handleSearch)
  },
  beforeDestroy() {
    // 代码组件 - 自定义生命周期 - 销毁前 created
    useCodeEvent(this.item, 'componentWillDestroy', this)(this.item, this.$store.getters['manage/idModule'])
    this.$root.$off(`SearchSubmit${this.item.isDialog || ''}`)
  },
  methods: {
    /**
     * @description: 点击搜索
     * @param {type} 
     * @return: 
     */
    handleSearch(reset = false) {
      if (!this.firstData) {
        Object.assign(this.search, this.query)
      }
      // 节流
      if (this.isLock) return
      this.isLock = true
      setTimeout(() => {
        this.isLock = false
      }, 100)
      // 表单验证
      this.$refs.search.validate((valid) => {
        if (valid) {
          // 处理额外参数
          const formData = Object.assign({}, this.query, this.search)
          Object.keys(formData).forEach((key) => {
            const value = formData[key]
            if (value === undefined || value === '') {
              delete formData[key]
            }
          })
          console.log(this.search, formData)
          // 保留额外的参数 执行搜索
          this.emitSearch(formData, reset)
        }
      })
    },
    /**
     * @method: 触发emit的搜索
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-10-17 14:44:13
     */
    emitSearch(formData, reset = false) {
      // 当第一次进入，存储初始化的搜索条件
      if (!this.firstData) {
        this.firstData = JSON.stringify(formData)
      }
      // 判断是全局搜索还是指定组件
      if (this.item.searchScope === 1) {
        // 给全局处理数据
        this.$root.$emit(`pageGetData${this.item.isDialog || ''}`, { query: formData, type: 'changeQuery', reset })
        // 发给指定组件执行搜索
        this.$nextTick(() => {
          this.item.searchTarget.forEach((item) => {
            this.$root.$emit(`${item}Search${this.item.isDialog || ''}`, { query: formData, type: 'search', reset })
          })
        })
      } else {
        // 发起给页面总接口搜索
        this.$root.$emit(`pageGetData${this.item.isDialog || ''}`, { query: formData, type: 'search', reset })
      }
    },
    /**
     * @description: 重置搜索条件
     * @param {type} 
     * @return: 
     */
    handleReset() {
      const data = JSON.parse(this.firstData)
      Object.keys(this.search).forEach((key) => {
        const value = this.search[key]
        if (Array.isArray(value)) {
          this.$set(this.search, key, data[key] || [])
        } else if (data[key] === 0) {
          this.$set(this.search, key, 0)
        } else {
          this.$set(this.search, key, data[key] || undefined)
        }
      })
      this.handleSearch(true)
    }
  }
}
</script>
<style lang="less">
@import '~styles/var.less';

.fun-title{
  .desc{
    margin-left: 10px;
  }
}
.lego-search{
  border-bottom: 1px solid @border-color-hover;
  margin-bottom: 15px;
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
    max-height: 33px;
    overflow: hidden;
  }
  .el-form-item__content{
    padding-right: 10px;
    & > .el-input,
    & > .el-input-number,
    & > .el-select,
    & > .el-textarea,
    & .el-cascader,
    & > .el-range-editor{
      width: 100% !important;
    }
  }
}
.preview-box.isEdit{
  .lego-search{
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
      max-height: 37px;
      overflow: hidden;
    }
  }
}
</style>
