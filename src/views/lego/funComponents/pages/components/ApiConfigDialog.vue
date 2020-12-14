<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-08-26 11:19:35
 * @LastEditTime: 2020-11-30 19:20:19
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form-item prop="envApi" label="环境变量：" >
    <el-button @click="handleClick">编辑环境变量</el-button>
    <el-dialog title="编辑表格操作栏" :visible.sync="visible" width="1200px" v-if="visible" :close-on-click-modal="false">
      <el-form :model="form" ref="form" label-width="80px">
        <el-form-item label="操作按钮：">
          <el-button @click="handleAdd">新增操作按钮</el-button>
          <el-table
            class="group-table"
            :data="list"
            border>
            <el-table-column
              prop="name"
              label="识别名"
              width="200">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" placeholder="识别名称" />
              </template>
            </el-table-column>
            <el-table-column
              prop="tx"
              label="测试环境">
              <template slot-scope="scope">
                <el-input v-model="scope.row.tx" placeholder="请输入接口地址" />
              </template>
            </el-table-column>
            <el-table-column
              prop="online"
              label="线上环境">
              <template slot-scope="scope">
                <el-input v-model="scope.row.online" placeholder="请输入接口地址" />
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="50">
              <template slot-scope="scope">
                <el-button type="text" @click="handleRemove(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" native-type="submit" @click.native.prevent="submit">确 定</el-button>
      </div>
    </el-dialog>
  </el-form-item>
</template>
<script>

export default {
  name: 'ApiConfigDialog',
  components: { 
  },
  props: {
    envApi: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      visible: false,
      list: [],
      loading: false,
      form: {}
    }
  },
  methods: {
    handleClick() {
      if (JSON.stringify(this.envApi) === '{}') {
        this.open([
          {
            name: 'generate',
            tx: '//txstest.com/generate',
            online: '//online.com/generate'
          }
        ])
      } else {
        // 对象转数组
        const arr = []
        const data = this.envApi
        Object.keys(data).forEach(item => arr.push({
          name: item,
          tx: data[item].tx,
          online: data[item].online
        }))
        this.open(arr)
      }
    },
    open(data) {
      this.list = data
      this.visible = true
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.visible = false
          // 数组转对象
          const data = {}
          this.list.forEach(item => Object.assign(data, {
            [item.name]: {
              tx: item.tx,
              online: item.online
            }
          }))
          this.$emit('update:envApi', data)
        }
      })
    },
    handleAdd() {
      this.list.push({ 
        ...{ 
          name: '',
          tx: '//txstest.com',
          online: ''
        } 
      })
    },
    handleRemove(index) {
      this.list.splice(index, 1)
    }
  }
}
</script>
