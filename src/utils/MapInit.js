// 初始化地图
export default {
  init() {
    return new Promise((resolve, reject) => {
      // 如果已加载直接返回
      if (typeof window.T !== 'undefined') {
        console.log('a.地图初始化成功')
        resolve(window.T)
      }
      window.onload = () => {
        console.log('b.地图初始化成功')
        resolve(window.T)
      }
    })
  }
}
