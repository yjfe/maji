<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-22 10:28:25
 * @LastEditTime: 2020-11-30 16:15:09
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-dialog title="新建页面" :visible.sync="visible" width="760px">
    <el-form :model="form" ref="form" label-width="100px">
      <ElFormItem prop="projectId" label="选择项目：" :rules="{ required: true, message: '请输入项目名称', trigger: 'blur' }">
        <el-select
          filterable
          v-model="form.projectId"
          placeholder="请选择项目">
          <el-option
            v-for="item in projectEnum"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </ElFormItem>
      <ElFormItem prop="type" label="选择页面类型：" >
        <el-radio 
          class="AddPageDialog-radio"
          v-model="form.type" 
          v-for="(item, index) in pageType" 
          :key="index" 
          :label="item.type" 
          border>
          <span>{{item.title}}</span>
          <div class="type-label">
            <p>{{item.remark}}</p>
            <img :src="item.img"/>
          </div>
        </el-radio>
      </ElFormItem>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" native-type="submit" @click.native.prevent="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import formImG from './images/form.png'
import detailImG from './images/detail.png'
import listImG from './images/list.png'

export default {
  name: 'AddPageDialog',
  props: {
    projectEnum: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      visible: false,
      form: {},
      loading: false,
      pageType: [
        {
          title: '表单',
          type: 'form',
          img: formImG,
          remark: '展示表格数据，支持查询'
        },
        {
          title: '列表',
          type: 'list',
          img: listImG,
          remark: '需要录入内容，并提交'
        },
        {
          title: '详情',
          type: 'detail',
          img: detailImG,
          remark: '字段、图表等纯展示内容'
        }
      ]
    }
  },
  methods: {
    open() {
      this.form = {
        type: 'form'
      }
      this.visible = true
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const { type, projectId } = this.form
          const routes = this.$router.resolve({ path: `/lego/edit/${type}`, query: { projectId } })
          window.open(encodeURI(routes.href), '_blank')
          this.visible = false
        }
      })
    },
    /**
     * @method: 下拉框触发搜索
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-06-20 16:32:45
     */
    remoteMethod(query) {
      if (query !== '') {
        this.queryProjectList()
      } else {
        this.options = []
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '~styles/var.less';
.AddPageDialog-radio{
  height: auto;
  .type-label{
    display: block;
    p{
      color: @color-black-base
    }
  }
}
</style>
