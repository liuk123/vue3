<!--  -->
<template>
  <div
    ref="barchart"
    style="width: 100%; height: 100%"
  >
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    data: {
      type: Object,
      default: () => ({
        label: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        seriesData: {
          任务数: [{ name: 'Mon', value: 3 }, { name: 'Tue', value: 3 }],
          人员数: [{ name: 'Mon', value: 4 }, { name: 'Tue', value: 4 }]
        }

      })
    }
  },
  components: {},
  data () {
    return {
      offset: {
        0: 4,
        1: 6
      },
      itemStyle: [
        {
          end: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#177FFF'
            }, {
              offset: 1, color: '#4CCAFF'
            }],
            global: false // 缺省为 false
          },
          bar: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [{
              offset: 0, color: '#1A84FF'
            }, {
              offset: 1, color: '#4CCAFF'
            }],
            global: false
          }
        },
        {
          end: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#FF8317'
            }, {
              offset: 1, color: '#FFBF4C'
            }],
            global: false // 缺省为 false
          },
          bar: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [{
              offset: 0, color: '#FF8B1E'
            }, {
              offset: 1, color: '#FFBF4C'
            }],
            global: false
          }
        }
      ]
    }
  },
  methods: {
    init () {
      this.eleChart = this.$echarts.init(this.$refs.barchart)
      const option = {
        legend: {
          data: Object.keys(this.data.seriesData),
          right: '10%',
          textStyle: {
            color: '#95BEFF'
          }
        },
        grid: {
          left: '10%',
          right: '10%',
          top: '15%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value'
        },
        series: []
      }
      Object.keys(this.data.seriesData).forEach((key, index) => {
        option.series.push(
          {
            id: 'oval1_' + key,
            name: key,
            type: 'pictorialBar',
            symbolSize: [18, 12],
            barGap: '30%',
            barWidth: '18',
            symbolOffset: [0, -7],
            z: 101,
            zlevel: 1,
            itemStyle: {
              normal: {
                color: this.itemStyle[index].end
              }
            }
          })
        option.series.push(
          {
            id: 'id1_' + key,
            name: key,
            type: 'bar',
            barGap: '30%',
            label: {
              show: true,
              position: 'top',
              fontSize: 18,
              color: '#FFFF00',
              formatter: (params) => {
                return params.data.value
              }
            },
            barWidth: 18,
            z: 100,
            itemStyle: {
              color: this.itemStyle[index].bar
            }
          }
        )
      })

      this.eleChart.setOption(option)
    },
    update () {
      if (!this.eleChart) {
        this.init()
      }
      const option = {
        xAxis: {
          data: this.data.label
        },
        series: []
      }
      Object.keys(this.data.seriesData).forEach((key) => {
        option.series.push({
          id: 'oval1_' + key,
          data: this.data.seriesData[key].map(v => ({
            ...v,
            symbolPosition: 'end'
          }))
        })
        option.series.push({
          id: 'id1_' + key,
          data: this.data.seriesData[key]
        })
      })
      this.eleChart.setOption(option)
    }
  },
  mounted () {
    this.init()
    setTimeout(() => {
      this.update()
    }, 1000)
  }
}
</script>

<style lang="less" scoped>

</style>
