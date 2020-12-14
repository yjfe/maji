<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-22 10:28:25
 * @LastEditTime: 2020-10-15 10:06:15
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-dialog title="新建页面" :visible.sync="visible" :close-on-click-modal="false">
    <el-form :model="form" ref="form" label-width="120px">
      <ElFormItem prop="project" label="选择项目：" :rules="{ required: true, message: '请输入项目名称', trigger: 'blur' }">
        <el-select
          v-model="form.project"
          filterable
          remote
          reserve-keyword
          placeholder="请输入项目名"
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option
            v-for="item in projectList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </ElFormItem>
      <ElFormItem prop="type" label="选择页面类型：" >
        <el-radio v-model="form.type" v-for="(item, index) in pageType" :key="index" :label="item.type" border>{{item.title}}</el-radio>
      </ElFormItem>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" native-type="submit" @click.native.prevent="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import * as api from './service'
import ElFormItem from './form-item.vue'

export default {
  name: 'AddPageDialog',
  components: {
    ElFormItem
  },
  data() {
    return {
      visible: false,
      form: {},
      projectList: [],
      loading: false,
      pageType: [
        {
          title: '表单',
          type: 'form'
        },
        {
          title: '列表',
          type: 'list'
        },
        {
          title: '详情',
          type: 'detail'
        }
      ]
    }
  },
  methods: {
    open() {
      this.form = {
        type: 'form'
      }
      this.queryProjectList()
      this.visible = true
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // const { type, project } = this.form
          // const routes = this.$router.resolve({ path: `/lego/edit/${type}`, query: { project } })
          // window.open(routes.href, '_blank')
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
    },
    /**
     * @method: 
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-06-25 10:44:21
     */  
    queryProjectList(query = '') {
      this.loading = true
      api.getProjectList({ title: query }, { errorMsg: '', cache: 3600 }).then((res) => {
        this.projectList = res.data.list
        this.loading = false
      })
    }
  }
}
</script>
