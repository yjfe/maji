<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-06-18 16:48:45
 * @LastEditTime: 2020-11-26 15:04:19
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-dialog title="版本管理" :visible.sync="visible" v-if="visible">
    <!-- <XForm :history="false" :fields="fields" :layout="{}" :query="query" @fetch="getList"/> -->
    <div class="button-box">
      <el-button type="primary" @click="getList()">刷新</el-button>
    </div>
    <el-table border :data="list">
      <el-table-column prop="createTime" label="发布时间点" />
      <el-table-column prop="createName" label="发布人" />
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          {{['', '待测试', '测试通过', '已发布', '测试不通过', '已保存'][scope.row.status]}}
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClickEdit(scope.row)" type="link">编辑</el-button>
          <el-button @click="handleClickPreview(scope.row)" type="link">查看</el-button>
          <el-button v-if="scope.row.status === 2" @click="handleClick(scope.row)" type="link">发布该版本</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
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
  components: {
    // XForm
  },
  props: {
    typeEnum: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      visible: false,
      query: {
        pageSize: 10,
        pageIndex: 1
      },
      list: [],
      pageType: '',
      fields: [
        {
          label: '上线状态',
          key: 'status',
          type: 'select',
          value: '',
          span: 12,
          lg: 12,
          templateOptions: [
            {
              label: '待测试',
              value: 1
            },
            {
              label: '测试通过',
              value: 2
            },
            {
              label: '已发布',
              value: 3
            },
            {
              label: '测试不通过',
              value: 4
            },
            {
              label: '已保存',
              value: 5
            }
          ]
        }
      ]
    }
  },
  methods: {
    open(item) {
      this.visible = true
      Object.assign(this.query, {
        pageManageId: item.id,
        pageIndex: 1
      })
      this.pageType = item.pageType
      this.getList()
    },
    getList(query) {
      // 品牌列表数据
      this.query = query || this.query
      api.queryVersion(this.query, { errorMsg: 'none' }).then((res) => {
        this.list = res.data.list
        this.query.total = res.data.total
      })
    },
    /**
     * @method: 回滚事件
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-05 14:43:12
     */
    handleClick(item) {
      this.$confirm(`该操作将发布${item.createTime}版本? 发布后将影响线上页面功能，请谨慎操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.updateVersion({ pageVersionId: item.id, pageManageId: item.pageManageId, status: 3 }, { successMsg: '发布成功' }).then(() => {
          this.getList()
          this.$emit('fetch')
        })
      })
    },
    /**
     * @method: 查看预览
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-03 19:38:42
     */
    handleClickPreview(item) {
      const routes = this.$router.resolve({ 
        path: `/lego/preview/${item.pageManageId}`,
        query: { v: item.id } 
      })
      window.open(encodeURI(routes.href), '_blank')
    },
    /**
     * @method: 编辑事件
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-05 14:43:26
     */  
    handleClickEdit(item) {
      const routes = this.$router.resolve({ 
        path: `/lego/edit/${this.typeEnum[this.pageType - 1].value}`, 
        query: { id: item.pageManageId, v: item.id } 
      })
      window.open(encodeURI(routes.href), '_blank')
    }
  }
}
</script>
