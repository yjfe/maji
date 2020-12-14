/**
 * @description: 文本组件请求接口的携带数据key
 * @param {type} 
 * @return: 
 */

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
  })
}
