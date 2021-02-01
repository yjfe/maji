/**
 * @description: 文本组件请求接口的携带数据key
 * @param {type} 
 * @return: 
 */
import store from '@/store'
import pagesUpdate from '@/views/lego/funComponents/pages/historyDataUpdate'
import checkboxUpdate from '@/views/lego/funComponents/form/Checkbox/historyDataUpdate'

const neetUpdateComponents = {
  PagesForm: pagesUpdate,
  PagesDetail: pagesUpdate,
  PagesList: pagesUpdate,
  Checkbox: checkboxUpdate,
  Select: checkboxUpdate,
  Radio: checkboxUpdate,
  DetailCheckbox: checkboxUpdate,
  DetailSelect: checkboxUpdate,
  DetailRadio: checkboxUpdate
}
export default function (modules) {
  Object.keys(modules).forEach((item) => {
    const data = modules[item]
    const updateFunction = neetUpdateComponents[data.type]
    if (updateFunction) updateFunction(data)
    // 全局字段处理
    if (!data.styles) {
      data.styles = {}
    }
    // 生命周期函数更名
    if (data.componentEvent) {
      if (data.componentEvent.componentBeforeAjax) {
        data.componentEvent.componentBeforeSend = data.componentEvent.componentBeforeAjax
        delete data.componentEvent.componentBeforeAjax
      }
      if (data.componentEvent.componentAfterAjax) {
        data.componentEvent.componentAfterSend = data.componentEvent.componentAfterAjax
        delete data.componentEvent.componentAfterAjax
      }
    }
    // TODO: 执行时序问题，单体组件对象需要获取全局组件配置
    if (data.relational && Array.isArray(data.relational)) {
      let renderRule = ''
      const ruleEnums = {
        and: '&&',
        or: '||'
      }
      data.relational.forEach((item, index) => {
        // 可能在这可能在那
        const relItem = modules[item.id] || store.getters['manage/idModule'][item.id]
        if (relItem) {
          const { key } = relItem
          let rule
          if (relItem.type === 'Tabs') {
            rule = `this.idModule['${item.id}'].value==${item.value}`
          } else {
            rule = `this.pageData.${key}==${item.value}`
          }
          renderRule += `${index > 0 ? ruleEnums[item.rule || 'and'] : ''}${rule}`
        }
      })
      if (renderRule) {
        data.renderRule = renderRule
      }
    }
  })
}
