import echarts from 'echarts'
// 国家名称中英文映射对象
import nameMap from './name.js'
// 引入地图资源
import '../../node_modules/echarts/map/js/china'
import '../../node_modules/echarts/map/js/world'
import '../../node_modules/echarts/map/js/province/anhui'
import '../../node_modules/echarts/map/js/province/anhui'
import '../../node_modules/echarts/map/js/province/aomen'
import '../../node_modules/echarts/map/js/province/beijing'
import '../../node_modules/echarts/map/js/province/chongqing'
import '../../node_modules/echarts/map/js/province/fujian'
import '../../node_modules/echarts/map/js/province/gansu'
import '../../node_modules/echarts/map/js/province/guangdong'
import '../../node_modules/echarts/map/js/province/guangxi'
import '../../node_modules/echarts/map/js/province/guizhou'
import '../../node_modules/echarts/map/js/province/hainan'
import '../../node_modules/echarts/map/js/province/hebei'
import '../../node_modules/echarts/map/js/province/heilongjiang'
import '../../node_modules/echarts/map/js/province/henan'
import '../../node_modules/echarts/map/js/province/hubei'
import '../../node_modules/echarts/map/js/province/hunan'
import '../../node_modules/echarts/map/js/province/jiangsu'
import '../../node_modules/echarts/map/js/province/jiangxi'
import '../../node_modules/echarts/map/js/province/jilin'
import '../../node_modules/echarts/map/js/province/liaoning'
import '../../node_modules/echarts/map/js/province/neimenggu'
import '../../node_modules/echarts/map/js/province/ningxia'
import '../../node_modules/echarts/map/js/province/qinghai'
import '../../node_modules/echarts/map/js/province/shandong'
import '../../node_modules/echarts/map/js/province/shanghai'
import '../../node_modules/echarts/map/js/province/shanxi'
import '../../node_modules/echarts/map/js/province/shanxi1'
import '../../node_modules/echarts/map/js/province/sichuan'
import '../../node_modules/echarts/map/js/province/taiwan'
import '../../node_modules/echarts/map/js/province/tianjin'
import '../../node_modules/echarts/map/js/province/xianggang'
import '../../node_modules/echarts/map/js/province/xinjiang'
import '../../node_modules/echarts/map/js/province/xizang'
import '../../node_modules/echarts/map/js/province/yunnan'
import '../../node_modules/echarts/map/js/province/zhejiang'


const line = function(id) {
  var dom = document.getElementById(id)
  var myChart = echarts.init(dom)
  var option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line'
    }]
  }
  myChart.setOption(option)
}

const chinaMap = function(id, data) {
  const dom = document.getElementById(id)
  const myEcharts = echarts.init(dom)
  const option = {
    // 提示信息
    tooltip: {
      // 事件类型
      triggerOn: 'click',
      // 鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为 true。
      enterable: true,
      // data 为点击区域的数据
      formatter(data) {
        return `<div>
          <a href='/covid19/#/city/${data.name}' style='color: #fff'>
            <p>${data.name}</p>
            <p>现存确诊:${data.value}</p>
          </a>
        </div>`
      }
    },
    // 数据的视觉映射，把数据映射到对应颜色
    visualMap: [{
      orient: 'vertical', // 分段方向:horizontal水平
      type: 'piecewise', // 分段型
      pieces: [ // 配置颜色区间
        { min: 0, max: 0, color: '#FFFFFF' },
        { min: 1, max: 10, color: '#FDFDCF' },
        { min: 10, max: 100, color: '#FE9E83' },
        { min: 100, max: 500, color: '#E55A4E' },
        { min: 500, max: 10000, color: '#4F070D' }
      ]
    }],
    // 配置资源
    series: [{
      // 地图的级别，中国级别的地图匹配的就是省份的数据，选中区域会显示
      name: '省',
      type: 'map', // 配置图表类型
      map: 'china', // 中国地图
      roam: true, // 是否允许缩放
      zoom: 1.1, // 地图缩放比例
      // 配置字体
      label: {
        // normal是必须字段
        normal: {
          // 是否显示文字
          show: true,
          // 文字样式
          textStyle: {
            fontSize: 8
          }
        }
      },
      // 配置地图样式
      itemStyle: {
        // normal为必须字段
        normal: {
          areaColor: 'rgba(0,255,236,0)',
          borderColor: 'rgba(0,0,0,0.2)'
        },
        // 选中的区域颜色及阴影效果
        emphasis: {
          areaColor: 'rgba(255,180,0,0.8)',
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          // 阴影模糊程度
          shadowBlur: 15,
          // 阴影颜色
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          // 选中区域边框
          borderWidth: 1
        }
      },
      data
      // 数据的格式
      // data: [
      //   // name 为地区，value 为数量，后面是不同数量对应的颜色，配置了视觉映射就不需要了
      //   { name: '内蒙古', value: 10, itemStyle: { normal: { areaColor: '#f00' } } }
      // ]
    }]
  }
  myEcharts.setOption(option)
}

const cityMap = function(id, cityName, data) {
  const dom = document.getElementById(id)
  const myEcharts = echarts.init(dom)
  const option = {
    tooltip: {
      // 事件类型
      triggerOn: 'click',
      enterable: true,
      formatter(data) {
        return '<div><p>' + data.name + '</p><p>现存确诊:' + data.value + '</p></div>'
      }
    },
    visualMap: [{
      orient: 'vertical', // 分段方向:horizontal水平
      type: 'piecewise', // 分段型
      pieces: [ // 配置颜色区间
        { min: 0, max: 0, color: '#FFFFFF' },
        { min: 1, max: 10, color: '#FDFDCF' },
        { min: 10, max: 100, color: '#FE9E83' },
        { min: 100, max: 500, color: '#E55A4E' },
        { min: 500, max: 10000, color: '#4F070D' }
      ]
    }],
    // 配置资源
    series: [{
      // 地图的级别，中国级别的地图匹配的就是省份的数据，选中区域会显示
      name: '省',
      type: 'map', // 配置图表类型
      map: cityName, // 必须要写中文！
      roam: true, // 是否允许缩放
      zoom: 1.1, // 地图缩放比例
      // 配置字体
      label: {
        // normal是必须字段
        normal: {
          // 是否显示文字
          show: true,
          // 文字样式
          textStyle: {
            fontSize: 10
          }
        }
      },
      // 配置地图样式
      itemStyle: {
        // normal为必须字段
        normal: {
          areaColor: 'rgba(0,255,236,0)',
          borderColor: 'rgba(0,0,0,0.2)'
        },
        // 选中的区域颜色及阴影效果
        emphasis: {
          areaColor: 'rgba(255,180,0,0.8)',
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          // 阴影模糊程度
          shadowBlur: 15,
          // 阴影颜色
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          // 选中区域边框
          borderWidth: 1
        }
      },
      data
    }]
  }
  myEcharts.setOption(option)
}

const worldMap = function(id, data) {
  const dom = document.getElementById(id)
  const myChart = echarts.init(dom)
  const option = {
    // 提示信息
    tooltip: {
      // 事件类型
      triggerOn: 'click',
      enterable: true,
      formatter(data) {
        return '<div><p>' + data.name + '</p><p>现存确诊:' + data.value + '</p></div>'
      }
    },
    visualMap: [{ // 映射-颜色值
      orient: 'vertical', // 分段方向:horizontal水平
      type: 'piecewise', // 分段
      pieces: [ // 配置颜色区间
        { min: 0, max: 0, color: '#FFFFFF' },
        { min: 1, max: 1000, color: '#FDFDCF' },
        { min: 1000, max: 10000, color: '#FE9E83' },
        { min: 10000, max: 500000, color: '#E55A4E' },
        { min: 500000, color: '#4F070D' }
      ]
    }],
    // 配置资源
    series: [{
      name: 'country',
      type: 'map', // 配置图表类型
      map: 'world', // 中国地图
      roam: true, // 是否允许自动缩放
      zoom: 1.8, // 地图缩放比例
      // 配置字体
      label: {
        // normal是必须字段
        normal: {
          // 是否显示文字
          show: false,
          // 文字样式
          textStyle: {
            fontSize: 8
          }
        }
      },
      nameMap: nameMap,
      // 配置地图样式
      itemStyle: {
        // normal为必须字段
        normal: {
          areaColor: 'rgba(0,255,236,0)',
          borderColor: 'rgba(0,0,0,0.2)'
        },
        // 选中的区域颜色及阴影效果
        emphasis: {
          areaColor: 'rgba(255,180,0,0.8)',
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          // 阴影模糊程度
          shadowBlur: 15,
          // 阴影颜色
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          // 选中区域边框
          borderWidth: 1
        }
      },
      data
    }],
  }
  myChart.setOption(option)
}

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$charts', {
      get() {
        return {
          line,
          chinaMap,
          worldMap,
          cityMap
        }
      }
    })
  }
}
