<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-06-18 16:48:45
 * @LastEditTime: 2020-10-15 10:21:21
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-dialog title="权限操作" :visible.sync="visible" v-if="visible">
    <el-form :model="form" ref="form" label-width="120px">
      <el-form-item prop="name" label="选择页面权限人：">
        <el-select
          v-model="value"
          filterable
          remote
          reserve-keyword
          placeholder="请输入工号"
          :remote-method="remoteMethod"
          :loading="loading"
          @change="handleChange">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="`${item.userName}(${item.userId})`"
            :value="item.userId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="state" label="已选权限人员：">
        <div class="auth-list">
          <el-tag
            v-for="tag in form.auth"
            :key="tag.authorityId"
            closable
            @close="handleAuthColse(tag)">
            {{tag.authorityName}}
          </el-tag>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" native-type="submit" @click.native.prevent="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import * as api from './service'

export default {
  name: 'AuthDialog',
  data() {
    return {
      visible: false,
      loading: false,
      value: '',
      options: [],
      id: '',
      form: {} // 表单数据
    }
  },
  methods: {
    open(item) {
      this.form = { auth: [], id: item }
      this.visible = true
      this.getAuthInfo(item)
    },
    getAuthInfo(pageManageId) {
      api.getAuthInfo({ pageManageId }).then((res) => {
        this.form.auth = res.data
      })
    },
    /**
     * @method: 提交修改
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-06-20 16:33:02
     */
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          api.updateAuth({
            pageManageId: this.form.id,
            authorityArray: this.form.auth
          }, { successMsg: '更新成功' }).then(() => {
            this.visible = false
            this.$emit('fetch')
          })
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
        this.loading = true
        api.queryAuthUser({ authorityinfo: query }, { errorMsg: '' }).then((res) => {
          this.options = (res.data || []).splice(0, 10)
          this.loading = false
        })
      } else {
        this.options = []
      }
    },
    /**
     * @method: 下拉框选中
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-06-20 16:33:08
     */
    handleChange(value) {
      const select = this.options.find(item => item.userId === value)
      if (!this.form.auth.some(item => item.userId === select.userId)) {
        this.value = ''
        this.form.auth.push({
          authorityName: select.userName,
          authorityId: select.userId
        })
      }
    },
    /**
     * @method: 关闭某
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-06-20 16:59:36
     */
    handleAuthColse(value) {
      this.form.auth.forEach((item, index) => {
        if (item.id === value.id) {
          this.form.auth.splice(index, 1)
        }
      })
    }
  }
}
</script>
<style lang="less">
.auth-list .el-tag+.el-tag{
  margin-left: 10px;
}
</style>
