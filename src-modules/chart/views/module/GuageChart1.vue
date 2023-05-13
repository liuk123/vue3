<!--  -->
<template>
  <div
    class="pie-container"
    :style="{ 'background-image': 'url(' + backImg + ')' }"
  >
    <span class="value">
      <span class="number">{{ data }}</span>
      <span class="unit">{{ unit }}</span>
    </span>
    <div style="width:100%;height:100%" id="guage"></div>
  </div>
</template>
<script>
export default {
  name: "",
  props: {
    data: {
      type: Number,
      default: 60
    },
    backImg: {
      type: String,
      default: "/images/run/lbt.png"
    },
    unit: {
      type: String,
      default: ""
    }
  },
  components: {},
  data() {
    this.chart = null;
    return {};
  },
  watch: {
    data() {
      if(this.chart){
        this.update();
      }
    }
  },
  methods: {
    init() {
      if (this.chart === null) {
        const el = this.$el.querySelector("#guage");
        this.chart = this.$echarts.init(el);
      }
      const option = {
        grid: {
          top: 10,
          bottom: 10
        },
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: -180,
            radius: '76%', // 半径
            axisLine: {
              lineStyle: {
                width: 20,
                color: [
                  [0.1, '#DBECFF'],
                  [0.2, '#DBECFF'],
                  [0.3, '#DBECFF'],
                  [0.4, '#DBECFF'],
                  [0.5, '#DBECFF'],
                  [0.6, '#DBECFF'],
                  [0.7, '#DBECFF'],
                  [0.8, '#DBECFF'],
                  [0.9, '#DBECFF'],
                  [1, '#DBECFF']
                ]
              }
            },

            axisTick: {
              show: false
            },
            splitNumber: 20,
            progress: {
              show: true,
              width: 15,
              itemStyle: {
                color: '#f00'
              }
            },
            splitLine: {
              distance: -20,
              length: 20,
              lineStyle: {
                color: '#fff',
                width: 2
              }
            },
            axisLabel: {
              show: false
            },
            detail: {
              show: false
            }
          }
        ]
      }
      this.chart?.setOption(option);
    },
    update(){
      if (this.data && this.chart) {
        const color = []
        const value = Math.floor(this.data / 100 * 100 + 0.5) / 100
        for (let i = 0.1; i <= 1; i += 0.1) {
          color.push([i, value >= i ? '#67B3FF' : '#DBECFF'])
        }
        this.chart.setOption({
          series: [
            {
              axisLine: {
                lineStyle: {
                  color
                }
              }
            }
          ]
        })
      }
    }
  },
  mounted() {
    this.init();
    this.update()
  }
};
</script>

<style lang="less" scoped>
.pie-container {
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
  .value {
    position: absolute;
    left: 50%;
    width: 180px;
    height: 180px;
    line-height: 180px;
    text-align: center;
    margin-left: -90px;
    top: 50%;
    margin-top: -90px;
    color: #2fd4fe;
    .number {
      font-size: 36px;
      font-family: Bender;
    }
    .unit {
      font-size: 24px;
    }
  }
}
</style>
