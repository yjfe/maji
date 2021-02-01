<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-22 10:28:25
 * @LastEditTime: 2021-02-01 10:59:27
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-dialog title="新建页面" :visible.sync="visible" width="760px">
    <el-form :model="form" ref="form" label-width="100px">
      <div class="export-box">
        <div :class="form.expert ? 'export-left' : ''">
          <ElFormItem prop="expert" label="专业模式：" >
            <el-switch v-model="form.expert"></el-switch>
          </ElFormItem>
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
        </div>
        <div class="export-right" v-if="form.expert" >
          <p>以json的形式快速创建页面字段</p>
          <div class="code-box">
            <CodeEditor 
              theme="vs-dark"
              :codes="jsonData" 
              language="json"
              @onCodeChange="handleUpdate"/>
          </div>
        </div>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" native-type="submit" @click.native.prevent="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import CodeEditor from '@/views/lego/components/CodeEditor'
import formImG from './images/form.png'
import detailImG from './images/detail.png'
import listImG from './images/list.png'

export default {
  name: 'AddPageDialog',
  components: { CodeEditor },
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
      jsonData: JSON.stringify([{
        key: 'key1',
        label: '名称1'
      }], null, '  '),
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
        type: 'form',
        expert: false
      }
      this.visible = true
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const { type, projectId, expert } = this.form
          if (expert) {
            try {
              JSON.parse(this.jsonData).forEach((item) => {
                if (!(item.key && item.label)) {
                  throw new Error('请补全字段信息')
                }
              })
            } catch (error) {
              this.$message.error(error.message)
              return
            }
            window.sessionStorage.setItem('quickCreate', this.jsonData)
          }
          const routes = this.$router.resolve({ 
            path: `/lego/edit/${type}`, 
            query: { 
              projectId,
              expert
            } 
          })
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
    },
    handleUpdate(code) {
      this.jsonData = code
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
.export-box{
  display: flex;
}

.export-left{
  width: 350px;
  .el-radio.is-bordered+.el-radio.is-bordered{
    margin-left: 0;
  }
}
.export-right{
  flex: 1;
  .code-box{
    height: 660px;
  }
}
</style>
