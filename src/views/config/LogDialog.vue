<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-06-18 16:48:45
 * @LastEditTime: 2019-07-15 11:03:41
 * @LastEditors: yamanashi12
 -->
<template>
  <el-dialog title="操作日志" :visible.sync="visible" v-if="visible">
    <el-table border :data="list">
      <el-table-column width="80" prop="author" label="操作人" />
      <el-table-column width="150" prop="modifyTime" label="操作时间" />
      <el-table-column prop="remark" label="操作内容" />
    </el-table>
    <pagination
      :history="false"
      :page-size="query.pageSize" 
      :total="query.total" 
      :current-page.sync="query.pageIndex" 
      :query.sync="query"
      @fetch="getList" />
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">确 定</el-button>
      <!-- <el-button type="primary" native-type="submit" @click.native.prevent="submit">确 定</el-button> -->
    </div>
  </el-dialog>
</template>
<script>
import * as api from './service'

export default {
  name: 'LogDialog',
  data() {
    return {
      visible: false,
      query: {
        pageSize: 10,
        pageIndex: 1
      },
      list: []
    }
  },
  methods: {
    open(item) {
      this.visible = true
      this.query.projectManageId = item
      this.getList()
    },
    getList(query) {
      // 品牌列表数据
      this.query = query || this.query
      api.queryLog(this.query, { errorMsg: 'none' }).then((res) => {
        this.list = res.data.list
        this.query.total = res.data.total
      })
    }
  }
}
</script>
