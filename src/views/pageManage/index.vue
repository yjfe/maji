<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-22 09:37:09
 * @LastEditTime: 2020-12-09 11:35:58
 * @LastEditors: Please set LastEditors
 -->
 <template>
  <div class="">
    <XForm :history="false" :fields="fields" :layout="{}" :query="query" @fetch="getList"/>
    <ContentBox>
      <div class="button-box table">
        <el-button type="primary" @click="handleAddPage">新建页面</el-button>
      </div>
      <el-table border :data="list">
        <el-table-column width="100" prop="id" label="ID" />
        <el-table-column prop="pageName" label="页面名称" />
        <el-table-column prop="projectName" label="页面项目" />
        <el-table-column prop="pageType" label="页面类型">
          <template slot-scope="scope">
            {{typeEnum[scope.row.pageType - 1].label}}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            {{stateEnum[scope.row.status].label}}
            <span class="has-update" v-if="scope.row.isOnline">有更新</span>
          </template>
        </el-table-column>
        <el-table-column prop="createName" label="创建人" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-button type="link" @click="handlePreview(scope.row)">预览</el-button>
            <!-- <el-button type="link" @click="handleUpdate(scope.row)">编辑</el-button> -->
            <el-button type="link" @click="handleAuth(scope.row)">权限设置</el-button>
            <el-button type="link" @click="handleRollBack(scope.row)">版本管理</el-button>
            <el-button type="link" @click="handleLog(scope.row)">日志</el-button>
            <el-button type="link" v-if="scope.row.status === 4" @click="handleChangeStatus(scope.row.id, 3)">上线</el-button>
            <el-button type="link" v-else-if="scope.row.status === 3" @click="handleChangeStatus(scope.row.id, 4)">下线</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination 
        :history="false"
        :page-size="query.pageSize" 
        :total="query.total" 
        :current-page.sync="query.pageIndex" 
        :query.sync="query"
         @fetch="getList" />
    </ContentBox>
    <AddPageDialog ref="AddPageDialog" :projectEnum="projectEnum" />
    <RollBackDialog ref="RollBackDialog" :typeEnum="typeEnum"/>
    <AuthDialog ref="AuthDialog" />
    <LogDialog ref="LogDialog" :typeEnum="typeEnum"/>
  </div>
</template>
<script>
import XForm from '@/components/XForm'
import AddPageDialog from './AddPageDialog'
import RollBackDialog from './RollBackDialog'
import AuthDialog from './AuthDialog'
import LogDialog from './LogDialog'
import * as api from './service'

export default {
  name: 'pageManage',
  components: { 
    XForm, 
    AddPageDialog, 
    RollBackDialog, 
    AuthDialog, 
    LogDialog 
  },
  data() {
    return {
      projectEnum: [],
      list: [],
      query: {
        pageSize: 10,
        pageIndex: 1
      },
      stateEnum: [
        {
          label: '全部',
          value: -1
        },
        {
          label: '待上线',
          value: 1
        },
        {
          label: '待发布',
          value: 2
        },
        {
          label: '已上线',
          value: 3
        },
        {
          label: '已下线',
          value: 4
        }
      ],
      typeEnum: [
        {
          label: '列表',
          value: 'list'
        },
        {
          label: '表单',
          value: 'form'
        },
        {
          label: '详情',
          value: 'detail'
        }
      ],
      searchTypeEnum: [
        {
          label: '列表',
          value: 1
        },
        {
          label: '表单',
          value: 2
        },
        {
          label: '详情',
          value: 3
        }
      ],
      fields: [
        {
          label: '项目',
          key: 'projectId',
          type: 'select',
          option: {
            filterable: true
          },
          templateOptions: []
        },
        {
          label: '页面类型',
          key: 'pageType',
          type: 'select',
          templateOptions: []
        },       
        {
          label: '上线状态',
          key: 'status',
          type: 'select',
          value: [],
          templateOptions: []
        },
        {
          label: '页面名称',
          option: {
            maxlength: 20,
            numberWord: true
          },
          key: 'pageName',
          type: 'input'
        },
        {
          label: '创建人',
          option: {
            maxlength: 20,
            numberWord: true
          },
          key: 'createName',
          type: 'input'
        },
        {
          span: 16,
          lg: 12,
          label: '创建时间',
          startKey: 'startTime',
          endKey: 'endTime',
          type: 'rangeDate',
          option: {
            type: 'date'
          }
        }
      ]
    }
  },
  created() {
    this.$setBreadcrumb([{ path: this.$route.fullPath, title: '页面管理' }])
    this.getProjectEnum()
  },
  mounted() {
    this.fields.find(item => item.key === 'status').templateOptions = this.stateEnum
    this.fields.find(item => item.key === 'pageType').templateOptions = this.searchTypeEnum
  },
  methods: {
    getList(query) {
      // 品牌列表数据
      this.query = query || this.query
      api.queryList(this.query).then((res) => {
        this.list = res.data.list
        this.query.total = res.data.total
      })
    },
    /**
     * @method: 获取项目列表枚举
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-03 16:57:25
     */
    getProjectEnum() {
      api.getProjectList().then((res) => {
        this.projectEnum = res.data.map(item => (
          {
            label: item.projectName,
            value: item.id
          }
        ))
        this.fields.find(item => item.key === 'projectId').templateOptions = this.projectEnum
      })
    },
    /**
     * @method: 新增页面
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-03 19:06:34
     */
    handleAddPage() {
      this.$refs.AddPageDialog.open()
    },
    /**
     * @method: 预览页面
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-03 19:06:40
     */
    handlePreview(item) {
      const routes = this.$router.resolve({ 
        path: `/lego/preview/${item.id}`,
        query: {
          pageStatus: item.status
        }
      })
      window.open(encodeURI(routes.href), '_blank')
    },
    /**
     * @method: 编辑页面
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-03 19:06:46
     */
    handleUpdate(item) {
      const routes = this.$router.resolve({ path: `/lego/edit/${this.typeEnum[item.pageType - 1].value}`, query: { id: item.id } })
      window.open(encodeURI(routes.href), '_blank')
    },
    /**
     * @method: 页面权限配置
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-03 19:06:53
     */
    handleAuth(item) {
      this.$refs.AuthDialog.open(item.id)
    },
    /**
     * @method: 回滚操作
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-03 19:07:00
     */
    handleRollBack(item) {
      this.$refs.RollBackDialog.open(item)
    },
    /**
     * @method: 查看日志
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-03 19:07:06
     */
    handleLog(item) {
      this.$refs.LogDialog.open(item.id)
    },
    /**
     * @method: 控制页面上下线
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-09-16 10:19:09
     */
    handleChangeStatus(id, status) {
      this.$confirm(`该操作将${{ 3: '上线', 4: '下线' }[status]}该页面? 操作后将影响线上页面功能，请谨慎操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.updateStatus({ pageManageId: id, status }, { successMsg: '操作成功' }).then(() => {
          this.getList()
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '~styles/var.less';
.has-update{
  height: 20px;
  background: #ccc;
  color: @color-white;
  border-radius: 8px;
  line-height: 20px;
  display: inline-block;
  padding: 0 5px;
  margin-left: 10px;
}
</style>
