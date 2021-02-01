/* 
 * 历史数据兼容方案，会全局从模块下寻找这个文件，做数据处理
 * 固定事件名称
 * 
 * 数字格式处理
 */
import store from '@/store'

export default function (data = {}) {
  // 直接对原数据做处理
  // 需要是数字还是字符串
  const formatValue = (value, type) => {
    if (value === undefined || value === '') return value
    if (type === 'number') {
      return parseInt(value, 10)
    }
    return `${value}`
  }
  if (!store.getters['manage/isEdit']) {
    // checkbox select 组件是多选的
    if (Array.isArray(data.value) || /Checkbox/.test(data.type) || data.multiple) {
      try {
        data.value = data.value.map(item => formatValue(item, data.type))
      } catch (error) {
        data.value = []
      }
    } else {
      data.value = formatValue(data.value, data.valueType)
    }
    if (data.optionsType === 2) {
      data.options.forEach(item => item.value = formatValue(item.value, data.valueType))
    }
  }
}
