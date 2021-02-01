<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2021-01-28 09:53:30
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form-item :prop="propKey" :label="`${item.label}：`" :rules="item.validator.rules">
    <el-button 
      :disabled="isMax || ($attrs.isFormEdit && item.editDisabled)" 
      type="text" 
      @click="handleAdd()"><i class="el-icon-plus"></i> 新增规则</el-button>
    <el-row v-if="isEdit" :style="`max-width: ${item.maxWitch}px`">
      <!-- 预览的时候 -->
      <el-col :span="formItem.col" v-for="(formItem, index) in item.layout" :key="index">
        <FreeComponentsId 
          v-if="formItem.module" 
          :moduleId="formItem.module" 
          :key="formItem.module" />
        <div class="default-text" v-else>请选择组件</div>
      </el-col>
      <div class="form-group-remove"><i class="el-icon-close"></i></div>
    </el-row>
    <template v-else>
      <div v-for="(dataItem, index) in mValue" :key="index" 
        draggable="true" 
        @dragover="moveEnd = index" 
        @dragend="handleDragEnd"
        @dragstart="moveStart = index">
        <el-row 
          class="form-group-item" 
          :style="`max-width: ${item.maxWitch}px`">
          <el-col :span="formItem.col" v-for="(formItem, j) in item.layout" :key="`${index}${j}`">
            <FreeComponentsId 
              v-if="formItem.module" 
              :moduleId="formItem.module" 
              :key="formItem.module"
              :parentData="mValue[index]"
              :parentKey="`${propKey}[${index}]`"/>
            <div class="default-text" v-else>请选择组件</div>
          </el-col>
          <div class="form-group-remove" 
            v-if="mValue.length > minNum && !($attrs.isFormEdit && item.editDisabled) " 
            @click="handleRemove(index, dataItem)">
            <i class="el-icon-close"></i>
          </div>
        </el-row>
      </div>
    </template>
  </el-form-item>
</template>
<script>
import { mapGetters } from 'vuex'
// import { cloneDeep } from '@/utils'
import formMixin from '@/views/lego/utils/formMixin'
import FreeComponentsId from '@/views/lego/components/FreeComponentsId'
import { useCodeEvent } from '@/views/lego/utils'

export default {
  name: 'FormGroupPreview',
  mixins: [formMixin],
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
    ...mapGetters({
      isEdit: 'manage/isEdit',
      idModule: 'manage/idModule'
    }),
    isMax() {
      return this.item.max <= this.mValue.length
    }
  },
  data() {
    return {
      minNum: 1,
      moveEnd: null,
      moveStart: null,
      addIndex: 0 // 添加的标识索引，避免初始化添加重名问题
    }
  },
  created() {
    this.initData()
  },
  mounted() {
    // 代码组件 - 自定义生命周期 - 初始化 created
    useCodeEvent(this.item, 'componentCreated', this)(this.query, this.item, this.$store.getters['manage/idModule'])
  },
  beforeDestroy() {
    // 代码组件 - 自定义生命周期 - 销毁前 created
    useCodeEvent(this.item, 'componentWillDestroy', this)(this.item, this.$store.getters['manage/idModule'])
  },
  methods: {
    /**
     * @Date: 2019-10-29 16:03:35
     * @method: 初始化
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     */
    initData() {
      this.copyComponents = this.item.layout
      let i = 0
      this.minNum = this.item.min || 0
      while (i < this.minNum) {
        this.handleAdd()
        i++
      }
    },
    /**
     * @Date: 2019-10-29 16:03:42
     * @method: 添加按钮
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     */
    handleAdd(detail = {}) {
      if (this.isEdit) {
        return
      }
      this.mValue.push(detail)
    },
    /**
     * @Date: 2019-10-29 16:04:55
     * @method: 删除
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     */
    handleRemove(index) {
      if (this.isEdit) {
        return
      }
      this.mValue.splice(index, 1)
    },
    /**
     * @method: 拖拽结束
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     */
    handleDragEnd() {
      if (this.moveStart !== this.moveEnd) {
        // console.log(this.pageData)
        const li = this.parentData[this.propKey].splice(this.moveStart, 1)
        this.parentData[this.propKey].splice(this.moveEnd, 0, li[0])
      }
    }
  }
}
</script>
<style lang="less">
@import '~styles/var';
.form-group-item{
  background: #F4F6F8;
  border-radius: 4px;
  border-radius: 4px;
  margin-bottom: 10px;
  padding-top: 24px;
  padding-bottom: 6px;
  position: relative;
  padding-right: 20px;
}
.form-group-remove{
  position: absolute;
  right: -4px;
  top: -4px;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #303133;
  color: #ffffff;
  text-align: center;
  line-height: 16px;
  color: @color-white;
  &:hover{
    cursor: pointer;
    background: #f56c6c
  }
}
</style>
