<template>
<div>
    <p>请勾选需要的校验规则，如有配置项，必须填写</p>
    <p>注：选中的规则必须同时满足才可通过校验，请规避互斥规则</p>
    <el-form class="Relational-dialog">
      <el-form-item label="添加关联组件：">
        <el-select placeholder="请选择添加的组件" filterable value="" @change="handleAdd">
          <el-option
            v-for="item in idModuleList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规则:">
        <el-table
          class="group-table"
          :data="relational"
          border>
          <el-table-column
            prop="id"
            label="组件名">
          </el-table-column>
          <el-table-column
            prop="rule"
            label="关系">
            <template slot-scope="scope" v-if="scope.$index > 0">
              <el-select v-model="scope.row.rule" placeholder="and">
                <el-option value="and" label="与（&&）"></el-option>
                <el-option value="or" label="或（||）"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="value"
            label="值">
            <template slot="header">
              <span>规则：</span>
              <el-tooltip content="Top center" placement="top">
                <i class="el-icon-question font-text-sub"/>
                <div slot="content">
                  <span>针对选择组件的值进行规则校验，支持 '||'' 和 '!' 的写法</span>
                  <br>例1： 1||2
                  <br>例2： !0
                  <br>例2： true
                  <br>例2： false
                </div>
              </el-tooltip>
            </template>
            <template slot-scope="scope">
              <el-input v-model="scope.row.value" placeholder="值"></el-input>
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
</div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'RelationalDialog',
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
    ...mapState({
      idModule: state => state.manage.idModule,
      activeId: state => state.manage.activeId
    }),
    idModuleList() {
      return Object.keys(this.idModule)
    },
    relational() {
      return this.idModule[this.activeId].relational
    }
  },
  // created() {
  //   const list = this.idModule[this.activeId].relational
  //   if (!list) {
  //     this.idModule[this.activeId].relational = []
  //   }
  // },
  methods: {
    handleAdd(value) {
      if (this.relational.find(item => value === item.id)) {
        this.$message.error('该规则已存在')
        return
      }
      this.relational.push({
        id: value,
        value: '',
        rule: 'and'
      })
      this.$emit('update:relational', this.relational)
      // console.log(this.$parent.$parent.item)
    },
    handleRemove(index) {
      this.relational.splice(index, 1)
    }
  }
}
</script>
<style lang="less">
.Relational-dialog{
}
</style>
