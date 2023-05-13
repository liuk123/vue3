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
      default: 80
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
      let option = {
        series: [
          {
            type: "gauge",
            startAngle: 90,
            endAngle: -270,

            radius: "70%",
            pointer: {
              show: false
            },
            progress: {
              show: true,
              overlap: false,
              clip: false,
              itemStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(3,201,239,.3)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(3,201,239,1)" // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              }
            },
            axisLine: {
              lineStyle: {
                width: 10,
                color: [[1, "transparent"]]
              }
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            data: [this.data??0],
            title: {
              fontSize: 14
            },
            detail: {
              show: false
            }
          }
        ]
      };
      this.chart?.setOption(option);
    },
    update(){
      let option = {
        series: [
          {
            type: "gauge",
            data: [this.data]
          }
        ]
      }
      this.chart?.setOption(option);
    }
  },
  mounted() {
    this.init();
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
