import * as httpAgent from '@/utils/http'
import { apiResolver } from '@/views/lego/utils/apiResolver'
import { getActionQuery, getTextRender } from '@/views/lego/utils'

function addNodeText(node, value) {
  const elFormItem = node.parentNode
  const eachNode = elFormItem.querySelectorAll('.event-setting-each')[0]
  if (eachNode) {
    eachNode.innerText = value
  } else {
    const addNode = document.createElement('div')
    addNode.className = 'event-setting-each'
    addNode.innerHTML = value
    elFormItem.appendChild(addNode)
  }
}

export default {
  eventSetting: {
    bind(el, binding, node) {
      const { setting, vueNode } = binding.value
      if (!setting) return
      // 绑定事件
      el.addEventListener(setting.type, (val) => {
        const inputValue = val.target.value
        let eachText = ''
        if (setting.apiUrl) {
          // 计数器增加，锁定提交按钮使用
          window.eventSettingLock++
          // 解析url
          const { 
            url, 
            type, 
            requestQuery, 
            option 
          } = apiResolver(setting.apiUrl)
          httpAgent[type](url, { [setting.key]: inputValue, ...requestQuery }, { noAuth: true, preview302: true, ...option }).then((res) => {
            if (res.data && Object.prototype.toString.call(res.data) === '[object Object]') {
              const data = getActionQuery(setting.bindKey, res.data)
              vueNode.$set(vueNode.parentData, setting.bindKey, data[setting.bindKey])
              eachText = getTextRender(setting.formatText, data).replace(/\n/g, '<br>')
            } else {
              vueNode.$set(vueNode.parentData, setting.bindKey, undefined)
              eachText = ''
            }
            addNodeText(el, eachText)
            // 计数器完成减一，锁定提交按钮使用
            window.eventSettingLock--
          }).catch(() => {
            node.child.$emit('input', '')
            setting.resValue = undefined
            addNodeText(el, '')
            // 计数器完成减一，锁定提交按钮使用
            window.eventSettingLock--
          })
        }
      })
    }
  }
}
