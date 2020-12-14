
import { MessageBox } from 'element-ui'

let loginTipsOpen = false // 判断 弹出层存在

// 弹出消息，登录环境错误问题
export function openMessage(data) {
  // 只允许同时一个弹出窗
  if (loginTipsOpen) return
  loginTipsOpen = true
  MessageBox.confirm(`<div>
  <p>没有 ${data.message} 环境的cookie，需要登录 ${data.message} 环境，
  <a style="color:#409EFF;text-decoration:none" href="${data.loginLink}" target="_blank">前往登录</a></p>
  <p>完成登录操作后点击确认刷新页面</p>
</div>`, '登录提醒', {
    dangerouslyUseHTMLString: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    loginTipsOpen = false
    window.location.reload()
  }).catch(() => {
    loginTipsOpen = false
  })
}

// 重置302登录问题
export function httpError302() {
  if (window.isPreview) {
    const env = window.parent.previewEnv || window.previewEnv || 'online'
    const options = {
      tx: {
        message: '测试',
        loginLink: '/login'
      },
      online: {
        message: '正式',
        loginLink: '/login'
      }
    }
    openMessage(options[env]) 
  }
}
