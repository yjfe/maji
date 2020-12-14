<template>
  <RangeDate
    v-if="show"
    v-bind="schema.option"
    v-on="schema.on"
    ref="RangeDate"
    :value-format="schema.valueFormat"
    :format="schema.format"
    :startTime.sync="schema[schema.startKey || 'startTime']"
    :endTime.sync="schema[schema.endKey || 'endTime']"
  />
</template>

<script>
import RangeDate from '@/components/RangeDate'

export default {
  name: 'XFormRangeDate',
  components: { RangeDate },
  props: {
    schema: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      show: false
    }
  },
  created() {
    const type = ['string', 'number', 'object']
    const startTime = this.schema[this.schema.startKey || 'startTime']
    const endTime = this.schema[this.schema.endKey || 'endTime']
    if (type.indexOf(typeof startTime) === -1) {
      this.schema[this.schema.startKey || 'startTime'] = undefined
    } else if (startTime.getTime) {
      const newStartTime = startTime.getTime()
      this.schema[this.schema.startKey || 'startTime'] = newStartTime
        ? new Date(newStartTime)
        : undefined
    }
    if (type.indexOf(typeof endTime) === -1) {
      this.schema[this.schema.endKey || 'endTime'] = undefined
    } else if (endTime.getTime) {
      const newEndTime = endTime.getTime()
      this.schema[this.schema.endKey || 'endTime'] = newEndTime ? new Date(newEndTime) : undefined
    }
    this.show = true
  }
}
</script>
<style lang="less" scoped>
.el-radio-group {
  .el-radio {
    min-width: 60px;
    margin-right: 10px;
    & + .el-radio {
      margin-left: 10px;
    }
  }
}
</style>
