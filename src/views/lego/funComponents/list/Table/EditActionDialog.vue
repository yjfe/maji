<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-22 10:28:25
 * @LastEditTime: 2020-11-10 18:21:29
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <el-dialog title="编辑表格操作栏" :visible.sync="visible" width="1200px" v-if="visible" :close-on-click-modal="false">
      <el-form :model="form" ref="form" label-width="80px">
        <el-form-item label="操作按钮：">
          <el-button @click="handleAdd">新增操作按钮</el-button>
          <el-table
            class="group-table"
            :data="list"
            border>
            <el-table-column
              prop="label"
              label="名称"
              width="100">
              <template slot-scope="scope">
                <el-input v-model="scope.row.label" />
              </template>
            </el-table-column>
            <el-table-column
              prop="type"
              label="事件类型"
              width="100">
              <template slot-scope="scope">
                <el-select v-model="scope.row.type">
                  <el-option
                    v-for="item in typeEnum"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="color"
              label="颜色"
              width="100">
              <template slot-scope="scope">
                <el-select v-model="scope.row.color">
                  <el-option
                    v-for="item in isInner ? innerColorEnum : colorEnum"
                    :key="item.id"
                    :label="item"
                    :value="item">
                    <span class="lego-button-color-select" :class="item"></span>
                    <span>{{ item }}</span>
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="query"
              label="参数">
              <template slot="header">
                参数
                <ButtonQueryTips />
              </template>
              <template slot-scope="scope">
                <el-input type="textarea" 
                  :autosize="{ minRows: 1, maxRows: 3}"
                  v-model="scope.row.query" />
              </template>
            </el-table-column>
            <el-table-column
              width="200"
              prop="url"
              label="配置url">
              <template slot="header">
                配置url
                <ButtonLinkTips />
              </template>
              <template slot-scope="scope">
                <el-input 
                  v-if="scope.row.type === 'dialog'"
                  placeholder="引用的弹出层ID"
                  v-model="scope.row.quotePageId" />
                <el-input 
                  v-else
                  type="textarea" 
                  placeholder="接口地址或跳转页面"
                  :autosize="{ minRows: 1, maxRows: 3}"
                  v-model="scope.row.url" />
              </template>
            </el-table-column>
            <el-table-column
              prop="option"
              label="配置属性">
              <template slot-scope="scope">
                <el-input v-if="scope.row.type === 'confirm' || scope.row.type === 'popoverConfirm'" placeholder="提示文本" v-model="scope.row.message" />
                <el-button v-else-if="scope.row.type === 'import'" @click="handleImportEdit(scope.row)">编辑</el-button>
                <el-select v-else-if="scope.row.type === 'link'" placeholder="跳转方式" v-model="scope.row.openType">
                  <el-option label="内部打开" :value="0"></el-option>
                  <el-option label="外部打开" :value="1"></el-option>
                  <el-option label="新页面" :value="2"></el-option>
                </el-select>
                <el-select v-else-if="scope.row.type === 'export'" placeholder="导出方式" v-model="scope.row.exportType">
                  <el-option label="直接下载" :value="0"></el-option>
                  <el-option label="外部导出" :value="1"></el-option>
                </el-select>
                <el-input-number 
                  v-else-if="scope.row.type === 'dialog'"
                  :controls="false"
                  :min="0" 
                  controls-position="right" 
                  :max="1600" 
                  :precision="0" 
                  :step="1" 
                  style="width: 100%"
                  v-model="scope.row.dialogWidth" placeholder="弹出层宽度" /> 
              </template>
            </el-table-column>
            <el-table-column
              prop="auth"
              label="权限值">
              <template slot-scope="scope"> 
                <el-input placeholder="权限值" v-model="scope.row.auth" />
              </template>
            </el-table-column>
            <el-table-column
              prop="state"
              label="状态控制">
              <template slot="header">
                状态控制
                <TableStatusTips />
              </template>
              <template slot-scope="scope">
                <el-input placeholder="" v-model="scope.row.state" />
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="120">
              <template slot-scope="scope">
                <el-button type="text" :disabled="scope.$index === 0" @click="handleMoveUp(scope.$index)">上移</el-button>
                <el-button type="text" :disabled="scope.$index === list.length - 1" @click="handleMoveDown(scope.$index)">下移</el-button>
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
    <EditImportDialog ref="EditImportDialog"/>
  </div>
</template>
<script>
import ButtonQueryTips from '../../tips/ButtonQueryTips'
import ButtonLinkTips from '../../tips/ButtonLinkTips'
import TableStatusTips from '../../tips/TableStatusTips'
import EditImportDialog from './EditImportDialog'

export default {
  name: 'EditActionDialog',
  components: { 
    ButtonQueryTips,
    ButtonLinkTips,
    EditImportDialog,
    TableStatusTips
  },
  data() {
    return {
      visible: false,
      list: [],
      loading: false,
      form: {},
      isInner: false, // 是否表格内
      typeEnum: [
        {
          label: '链接',
          value: 'link'
        },
        {
          label: '确认窗',
          value: 'confirm'
        },
        {
          label: '确认弹出框',
          value: 'popoverConfirm'
        },
        {
          label: '弹出层',
          value: 'dialog'
        },
        {
          label: '导入',
          value: 'import'
        },
        {
          label: '导出',
          value: 'export'
        }
      ],
      colorEnum: [
        'default',
        'primary',
        'success',
        'warning',
        'danger',
        'info',
        'text'
      ],
      innerColorEnum: [
        'primary',
        'danger'
      ]
    }
  },
  methods: {
    open(arr, isInner) {
      this.list = arr
      this.visible = true
      this.isInner = isInner
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.visible = false
        }
      })
    },
    handleAdd() {
      const len = this.list.length + 1 || 1
      this.list.push({ 
        ...{ 
          label: `按钮${len}`,
          key: `key${new Date().getTime()}`, 
          type: 'link', 
          query: '',
          color: this.isInner ? 'primary' : 'default' 
        } 
      })
    },
    handleRemove(index) {
      this.list.splice(index, 1)
    },
    /**
     * @method: 编辑导出按钮
     * @param {type} 
     * @return: 
     * @Date: 2019-09-18 17:40:06
     */
    handleImportEdit(item) {
      this.$refs.EditImportDialog.open(item)
    },
    handleMoveUp(index) {
      const data = { ...this.list[index] }
      this.$set(this.list, index, this.list[index - 1])
      this.$set(this.list, index - 1, data)
    },
    handleMoveDown(index) {
      const data = { ...this.list[index] }
      this.$set(this.list, index, this.list[index + 1])
      this.$set(this.list, index + 1, data)
    }
  }
}
</script>
