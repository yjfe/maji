export default async function () {
  try {
    if (!window.uuid) {
      const res = await window.tcbApp.auth().getCurrenUser()
      if (res) {
        window.uuid = res.uid
      }
    }
    return Object.assign(JSON.parse(sessionStorage.getItem('authHeader')), { uuid: window.uuid })
  } catch (error) {
    return {}
  }
}
