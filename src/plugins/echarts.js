import echarts from 'echarts'

const install = function (Vue) {
  Object.defineProperties(Vue.prototype, {
    $charts: {
      get() {
        return {
          line: function (id) {
            this.chart = echarts.init(document.getElementById(id))
            this.chart.clear();
            var option = {
              xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  data: [120, 200, 150, 80, 70, 110, 130],
                  type: 'bar'
                }
              ]
            }
            this.chart.setOption(<option value="option"></option>)
          }
        }
      }
    }
  })
}
export default install
