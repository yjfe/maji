/* 
 * 历史数据兼容方案，会全局从模块下寻找这个文件，做数据处理
 * 固定事件名称
 * 
 * 原数据： action: [ 'back' ]
 * 新数据： action: [ { type: 'back', props: {}, stytes: {} }]
 */
export default function (data = {}) {
  // 直接对原数据做处理
  // 需要处理action字段
  try {
    if (!data.action) return
    data.action = data.action
      .filter(item => item)
      .map((item) => {
        if (typeof item === 'string') {
          switch (item) {
            case 'submit':
              return {
                label: '确定',
                type: item, 
                styles: {
                  color: 'primary' 
                },
                props: {
                  closeRefresh: true,
                  saveApiUrl: data.saveApiUrl,
                  updateApiUrl: data.updateApiUrl,
                  successGo: data.successGo
                }
              }
            case 'back':
              return {
                label: '返回',
                type: item, 
                styles: {
                  color: 'default'
                },
                props: {}
              }
            default:
              return item
          }
        }
        return item
      })
  } catch (error) {
    data.action = []
  }
}
