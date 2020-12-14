<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-22 09:37:16
 * @LastEditTime: 2020-11-30 10:03:56
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <XForm :fields="fields" :layout="layout" :query="query" @fetch="getList" :history="false"></XForm>
    <ContentBox>
      <div class="button-box table">
        <el-button type="primary" @click="handleSave">新增</el-button>
      </div>
      <el-table border :data="list">
        <el-table-column prop="projectName" label="项目名称">
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            {{stateEnum[scope.row.status].label}}
          </template>
        </el-table-column>
        <el-table-column prop="createName" label="创建人">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="link" @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button type="link" @click="handleLog(scope.row)">日志</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination 
        :page-size="query.pageSize" 
        :total="query.total" 
        :current-page.sync="query.pageIndex" 
        :query.sync="query" 
        @fetch="getList" 
        :history="false"/>
    </ContentBox>
    <FormDialog ref="FormDialog" @fetch="getList"/>
    <LogDialog ref="LogDialog"/>
  </div>
</template>
<script>
import XForm from '@/components/XForm'
import * as api from './service'
import FormDialog from './FormDialog'
import LogDialog from './LogDialog'

export default {
  name: 'configIndex',
  components: { XForm, FormDialog, LogDialog },
  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      list: [],
      fields: [
        {
          label: '项目名称',
          option: {
            maxlength: 20,
            numberWord: true
          },
          key: 'projectName',
          type: 'input'
        },
        {
          span: 12,
          lg: 12,
          label: '创建时间',
          startKey: 'startTime',
          endKey: 'endTime',
          type: 'rangeDate',
          option: {
            type: 'date'
          }
        },
        {
          label: '状态',
          key: 'status',
          type: 'select',
          templateOptions: []
        },
        {
          label: '创建人',
          option: {
            maxlength: 20,
            numberWord: true
          },
          key: 'createName',
          type: 'input'
        }
      ],
      layout: {},
      stateEnum: [
        {
          label: '无效',
          value: 0
        },
        {
          label: '有效',
          value: 1
        }
      ]
    }
  },
  created() {
    this.$setBreadcrumb([{ path: this.$route.fullPath, title: '项目管理' }])
  },
  mounted() {
    this.fields.find(item => item.key === 'status').templateOptions = this.stateEnum
  },
  methods: {
    getList(query) {
      // 品牌列表数据
      this.query = query || this.query
      api.queryList(this.query, { errorMsg: 'none' }).then((res) => {
        this.list = res.data.list
        this.query.total = res.data.total
      })
    },
    handleSave() {
      this.$refs.FormDialog.open()
    },
    handleUpdate(item) {
      this.$refs.FormDialog.open(item)
    },
    handleLog(item) {
      this.$refs.LogDialog.open(item.id)
    }
  }
}
</script>
