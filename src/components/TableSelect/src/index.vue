<template>
  <div class="table-select">
    <el-button @click="handleOpen">设置展示列</el-button>
    <el-dialog title="设置展示列" :visible.sync="visible" width="340px" v-if="visible">
      <div class="table-select__ul">
        <li
          v-for="(item, index) in list"
          :key="index"
          :title="item.label"
          draggable="true"
          @dragover="moveEnd = index"
          @dragend="handleDragEnd"
          @dragstart="moveStart = index"
        >
          <el-checkbox v-model="item.show" :disabled="item.showDisabled">
            <span class="table-select__label">{{ item.label }}</span>
          </el-checkbox>
          <div class="menu-icon"></div>
        </li>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  componentName: 'TableSelect',
  props: {
    /**
     * @prop {Array} columns 表格列参数
     */
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * @prop {Object} parentRef 当前组件的$ref，方便查找下面的table组件
     */
    parentRef: {
      type: Object
    },
    /**
     * @prop {String} table 表格ref名称
     */
    table: {
      type: String
    }
  },
  data() {
    return {
      visible: false,
      list: [],
      moveStart: 0,
      moveEnd: 0,
      copyColumns: []
    }
  },
  methods: {
    init() {
      const list = JSON.parse(JSON.stringify(this.columns)) // 深拷贝
      this.$set(this, 'list', list)
      this.handleSubmit(true)
    },
    /**
     * @description: 初始化存入表格的columns
     */
    saveColumns() {
      if (this.copyColumns.length === 0) {
        this.copyColumns = [...this.parentRef[this.table].columns]
      }
    },
    /**
     * @description: 点击打开弹出框
     */
    handleOpen() {
      this.visible = true
      const list = JSON.parse(JSON.stringify(this.columns)) // 深拷贝
      this.$set(this, 'list', list)
    },
    /**
     * @description: 拖拽结束事件
     */
    handleDragEnd() {
      // 移动自己或者移动的对象禁用移动操作
      if (this.moveStart !== this.moveEnd && this.list[this.moveStart].moveDisabled !== true && this.list[this.moveEnd].moveDisabled !== true) {
        const li = this.list.splice(this.moveStart, 1)
        this.list.splice(this.moveEnd, 0, li[0])
      }
    },
    /**
     * @description: 提交事件
     */
    handleSubmit(isFirst = false) {
      if (this.selectTable()) {
        if (!isFirst) {
          this.$emit('update:columns', this.list)
          this.$emit('change', this.list)
        }
        this.visible = false
      }
    },
    /**
     * @description: 修改表格列方法
     * @param {type}
     * @return:
     */
    selectTable() {
      this.saveColumns()
      // 查找表格组件
      const columns = [...this.copyColumns] // 表格栏目数组
      const newArr = []
      // 重新排序且赋值
      this.list.forEach((item) => {
        const findCol = columns.find(colItem => colItem.property === item.key)
        if (findCol && item.show) {
          newArr.push(findCol)
        }
      })

      if (newArr.length > 0) {
        // element组件内有个类vuex的数据管理，columns就是我们的表格列的规则
        this.parentRef[this.table].store.states.columns = newArr
        this.parentRef[this.table].store.states.originColumns = newArr
        // 处理浮动的列 左侧
        const leftFixedCol = newArr.filter(item => item.fixed === true || item.fixed === 'left')
        if (leftFixedCol) {
          this.parentRef[this.table].store.states.fixedColumns = leftFixedCol
          this.parentRef[this.table].store.states.fixedLeafColumnsLength = leftFixedCol.length
        }
        // 处理浮动的列 右侧
        const rightFixedCol = newArr.filter(item => item.fixed === 'right')
        if (rightFixedCol) {
          this.parentRef[this.table].store.states.rightFixedColumns = rightFixedCol
          this.parentRef[this.table].store.states.rightFixedLeafColumnsLength = rightFixedCol.length
        }
        setTimeout(() => {
          // 重新处理表格宽度
          this.parentRef[this.table].doLayout()
        }, 0)
        return true
      }
      this.$message.error('至少选择一项')
      return false
    }
  }
}
</script>
<style lang="less">
@import '~styles/var';
.table-select {
  display: inline-block;
  &__ul {
    max-height: 300px;
    overflow-y: auto;
    li {
      list-style: none;
      line-height: 20px;
      padding: 5px 10px;
      &:hover {
        background: rgba(0, 0, 0, 0.1);
        cursor: move;
      }
      .el-checkbox__inner {
        transform: translateY(-1px);
      }
      .table-select__label {
        display: inline-block;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 1;
        transform: translateY(2px);
      }
      &:hover {
        .menu-icon {
          &::after {
            background: url('./menu-cross-active.png') no-repeat;
          }
        }
      }
    }
  }
  .menu-icon {
    display: inline-block;
    float: right;
    line-height: 24px;
    &::after {
      content: '';
      display: inline-block;
      background: url('./menu-cross.png') no-repeat;
      width: 12px;
      height: 12px;
    }
  }
}
</style>
