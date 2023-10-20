<template>
  <div class="map-container" style="width: 100%; height: 100%"></div>
</template>

<script>
export default {
  name: "",
  props: {
    data: {
      type: Object,
      default() {
        return {
          name: "AAA",
          value: 60,
          unit: "%"
        };
      }
    },
    maxData: {
      type: Number,
      default: 100
    },
    styles: {
      type: Object,
      default() {
        return {
          barColor: "#27FFFF"
        };
      }
    },
    unit: {
      type: String,
      default: "个",
    },
  },
  components: {},
  data() {
    this.chart = null;
    return {};
  },
  methods: {
    init() {
      // console.log(this.styles)
      if (this.chart === null) {
        this.chart = this.$echarts.init(this.$el);
      }
      const option = {
        grid: {
          left: "5%",
          right: "5%",
          bottom: "0%",
          top: "40%"
        },
        xAxis: [
          {
            type: "value",
            axisLabel: {
              show: false
            },
            min: 0,
            max: this.maxData,
            splitNumber: 5,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            data: [this.data.name],
            axisLabel: {
              padding: [0, 0, 0, -10],
              inside: true,
              // textStyle: {
                fontSize: 16,
                fontWeight: 400,
                color: "#DAF8FF",
                align: "left",
                textShadowColor: "#00d6ff",
                textShadowOffsetX: 0,
                textShadowOffsetY: 0,
                textShadowBlur: 5,
              // },
              formatter: "{value}\n{a|占位}",
              rich: {
                a: {
                  color: "transparent",
                  lineHeight: 30
                }
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
          },

          {
            //左侧柱状图的Y轴
            gridIndex: 0, //y轴所在的 grid 的索引
            splitLine: "none",
            axisTick: "none",
            axisLine: "none",
            data: [this.data.value],
            inverse: false,
            axisLabel: {
              show: true,
              verticalAlign: "bottom",
              align: "right",
              padding: [0, 10, 5, 0],
              // textStyle: {
                color: "#2FD4FE",
                fontSize: 14,
                textShadowColor: "rgba(59,215,255,0.50)",
                textShadowOffsetX: 0,
                textShadowOffsetY: 0,
                textShadowBlur: 5,
              // },
              formatter: value => {
                return "{x|" + value + this.data.unit + "}";
              },
              rich: {
                y: {
                  color: "#3dffef",
                  fontSize: this.fontSize,
                  lineHeight: 18
                },
                x: {
                  color: "#2FD4FE",
                  fontSize: this.fontSize,
                  lineHeight: 18,
                  textShadowColor: "rgba(59,215,255,0.50)",
                  textShadowOffsetX: 0,
                  textShadowOffsetY: 0,
                  textShadowBlur: 5
                }
              }
            }
          }
        ],
        series: [
          {
            name: "值",
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(58,102,123,0.60)"
            },
            padding: 10,
            label: {
              show: false
            },
            itemStyle: {
           
                borderRadius: 0,
                color: {
                  colorStops: [
                    {
                      offset: 0,
                      color: "#000" // 0% 处的颜色
                    },
                    {
                      offset: 0.8,
                      color: this.styles.barColor // 100% 处的颜色
                    }
                  ]
                }
              
            },
            barWidth: 4,
            data: [this.data.value]
          },
          {
            // 分隔
            type: "pictorialBar",
            itemStyle: {
              
                color: {
                  type: "radial",
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [
                    {
                      offset: 0,
                      color: "white" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: this.styles.barColor // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
             
            },
            symbol: "circle",
            symbolClip: true,
            symbolSize: 10,
            symbolPosition: "end",
            symbolRepeat: false,
            symbolOffset: [0, 0],
            data: [this.data.value],
            z: 66,
            animationEasing: "elasticOut"
          }
        ]
      };
      this.chart.setOption(option);
    },
    update(val) {
      let option = {
        series: [
          {
            type: "bar",
            data: [val]
          },
          {
            type: "pictorialBar",
            data: [val]
          }
        ]
      };
      this.chart?.setOption(option);
    }
  },
  watch: {
    // data: {
    //   handler(val) {
    //     this.update(val);
    //   }
    // }
  },
  mounted() {
    this.init();
  }
};
</script>

<style></style>
