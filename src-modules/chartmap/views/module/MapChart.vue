<!--  -->
<template>
  <div class="map-container">
    <div
      class="title"
      @click="echartsSetOption('shandong')"
    >
      山东省
    </div>
    <div
      ref="charts"
      class="view-map"
    >
    </div>
  </div>
</template>
<script>
export default {
  name: 'MapChart',
  props: {

  },
  components: {},
  data () {
    this.cityCode = {
      济南市: 370100,
      青岛市: 370200,
      淄博市: 370300,
      枣庄市: 370400,
      东营市: 370500,
      烟台市: 370600,
      潍坊市: 370700,
      济宁市: 370800,
      泰安市: 370900,
      威海市: 371000,
      日照市: 371100,
      // 莱芜市: 371200,
      临沂市: 371300,
      德州市: 371400,
      聊城市: 371500,
      滨州市: 371600,
      菏泽市: 371700
    }
    this.geoCoordMap = {
      济南市: [117.130937, 36.630724],
      青岛市: [120.401217, 36.076894],
      淄博市: [118.047838, 36.826691],
      枣庄市: [117.308249, 34.829022],
      东营市: [118.676972, 37.449594],
      烟台市: [121.435155, 37.457825],
      潍坊市: [119.153951, 36.713374],
      济宁市: [116.582412, 35.431122],
      泰安市: [117.077446, 36.213023],
      威海市: [122.12188, 37.510853],
      日照市: [119.517661, 35.415186],
      临沂市: [118.345952, 35.118874],
      德州市: [116.355083, 37.434067],
      聊城市: [115.981795, 36.456213],
      滨州市: [117.972664, 37.384649],
      菏泽市: [115.473709, 35.237529]
    }
    this.item = require('../../assets/images/chartmap/icon-txcar.png').default
    return {
      carData: [
        {
          name: 'jinan1',
          icon: require('../../assets/images/chartmap/icon-txcar.png').default,
          lnglat: [117.130937, 36.630724]
        }, {
          name: 'weifang',
          icon: require('../../assets/images/chartmap/icon-fdcar.png').default,
          lnglat: [119.153951, 36.713374]
        }, {
          name: '34',
          icon: require('../../assets/images/chartmap/icon-bzcar.png').default,
          lnglat: [118.047838, 36.826691]
        }
      ],
      pointerData: [
        {
          name: '点1',
          value: [116.355083, 37.434067, { pointerType: 5 }]
        },
        {
          name: '点2',
          value: [119.517661, 35.415186, { pointerType: 5 }]
        }
      ],
      lineData: [
        {
          coords: [
            [116.355083, 37.434067],
            [119.517661, 35.415186]
          ],
          lineStyle: {
            normal: {
              color: '#E1F6B5'
            }
          }
        }
      ]
    }
  },
  methods: {
    getMapRegionJson () {
      const mapUrl = './assets/datas/mapdata/province/370000.json'
      Promise.all([
        this.$axios.get(mapUrl)
      ]).then(([d]) => {
        this.initMap(d.data)
      })
    },
    initMap (data) {
      this.$echarts.registerMap('shandong', data)
      this.eleChart = this.$echarts.init(this.$refs.charts)
      this.echartsSetOption()
      this.eleChart.off('click')
      this.eleChart.on('click', 'geo', (param) => {
        this.goCity(param.name)
      })
      this.eleChart.on('click', 'graphic', (param) => {
        // eslint-disable-next-line no-console
        console.log(param)
      })
      this.eleChart.on('click', 'series.effectScatter', (param) => {
        // eslint-disable-next-line no-console
        console.log(param)
      })
    },
    goCity (name) {
      if (this.cityCode[name]) {
        if (!this.$echarts.getMap(name)) {
          this.$axios.get(`./assets/datas/mapdata/city/${this.cityCode[name]}.json`).then(res => {
            this.$echarts.registerMap(name, res.data)
            this.echartsSetOption(name)
          })
        } else {
          this.echartsSetOption(name)
        }
      }
    },
    /**
     * 设置echartoption
     */
    echartsSetOption (pname = 'shandong') {
      this.eleChart.clear()
      const option = {
        grid: {
          right: '2%',
          left: '2%',
          top: '10%',
          bottom: '10%'
        },
        geo: [
          {
            id: 'geo',
            geoIndex: 0,
            map: pname,
            z: 10,
            aspectScale: 0.8,
            layoutCenter: ['50%', '50%'],
            layoutSize: '100%',
            roam: false,
            itemStyle: {
              areaColor: '#1A65C2',
              borderWidth: 0.4,
              borderColor: 'rgba(244,253,255,.7)'
            },
            label: {
              show: true
            },
            emphasis: {
              itemStyle: {
                areaColor: '#02424C'
              },
              label: {
                show: true
              }
            }
          },
          {
            id: 'geobg',
            geoIndex: 1,
            map: pname,
            z: 1,
            aspectScale: 0.8,
            layoutCenter: ['49%', '51%'],
            layoutSize: '100%',
            roam: false,
            itemStyle: {
              areaColor: 'transparent',
              borderWidth: 0.4,
              borderColor: '#03BBB1',
              shadowBlur: 3,
              shadowColor: 'rgba(26,101,194,0.8)',
              shadowOffsetX: 3,
              shadowOffsetY: -3
            },
            label: {
              show: false
            },
            emphasis: {
              disabled: false,
              itemStyle: {
                areaColor: 'transparent'
              }
            }
          }
        ],
        graphic: {
          elements: [
            {
              type: 'image'
            }
          ]
        },
        series: [
          {
            id: 'pointer',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            symbol: 'circle',
            symbolSize: 10,
            label: {
              formatter: function (val) {
                return val.data.name
              },
              position: 'right',
              show: true,
              color: '#ddd',
              fontWeight: 'bold',
              fontSize: 16,
              textBorderColor: '#018FD7',
              textBorderWidth: 1
            },
            itemStyle: {
              color: '#E1F6B5'
            },
            zlevel: 10,
            z: 15,
            emphasis: {
              scale: 3,
              label: {
                color: '#09D26C'
              },
              itemStyle: {
                color: '#09D26C'
              }
            }
          },
          // 地图线的动画效果
          {
            type: 'lines',
            id: 'line',
            zlevel: 1,
            z: 10,
            effect: {
              show: true,
              period: 5, // 箭头指向速度，值越小速度越快
              trailLength: 0.2, // 特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: 'arrow', // 箭头图标
              symbolSize: 6 // 图标大小
            },
            lineStyle: {
              normal: {
                width: 1.6, // 尾迹线条宽度
                opacity: 1, // 尾迹线条透明度
                curveness: 0.4 // 尾迹线条曲直度
              }
            }
          }
        ]
      }
      this.eleChart.setOption(option)
    },
    /**
     * 更新数据
     */
    update () {
      const option = {
        series: [
          {
            id: 'line',
            data: []
          }, {
            id: 'pointer',
            data: []
          }
        ],
        graphic: {
          elements: []
        }
      }
      // 线
      this.lineData.forEach(val => {
        option.series[0].data.push(val)
      })
      // 点
      this.pointerData.forEach(val => {
        option.series[1].data.push(val)
      })
      // 图标
      this.carData.forEach(val => {
        const coord = this.eleChart.convertToPixel({ geoId: 'geo' }, val.lnglat)
        option.graphic.elements.push({
          type: 'image',
          z: 16,
          x: coord[0],
          y: coord[1],
          textContent: val.name,
          textConfig: {
            position: 'bottom',
            insideFill: '#f00',
            insideStroke: '#ff0'
          },
          style: {
            image: val.icon,
            x: -14,
            y: -42,
            width: 28,
            height: 42
          }
        })
      })
      // eslint-disable-next-line no-console
      console.log(option)
      this.eleChart.setOption(option)
    }
  },
  mounted () {
    this.getMapRegionJson()
    setTimeout(() => {
      this.update()
    }, 3000)
    console.log(this.item)
  }
}
</script>

<style lang="less" scoped>
.map-container{
  width: 100%;
  height: 100%;
  position: relative;
  .title{
    position: absolute;
    left: 20px;
    top: 32px;
    z-index: 1;
    color: #00FFFF;
    cursor: pointer;
  }
}
.view-map{
  width: 100%;
  height: 100%;
}
</style>
