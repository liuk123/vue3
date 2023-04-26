<!--  -->
<template>
  <div class="map-container">
    <div ref="mycharts" class="view-map"></div>
  </div>
</template>
<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    this.resizeObserver = null;
    this.geoCoordMap = {
      东城区: [116.418757, 39.937544],
      西城区: [116.366794, 39.910309],
      朝阳区: [116.486409, 39.991489],
      丰台区: [116.286968, 39.863642],
      石景山区: [116.170445, 39.974601],
      海淀区: [116.280316, 40.039074],
      门头沟区: [115.905381, 40.009183],
      房山区: [115.701157, 39.735535],
      通州区: [116.758603, 39.802486],
      顺义区: [116.753525, 40.128936],
      昌平区: [116.235906, 40.318085],
      大兴区: [116.338033, 39.658908],
      怀柔区: [116.607122, 40.524272],
      平谷区: [117.112335, 40.244783],
      密云区: [116.943352, 40.477362],
      延庆区: [115.985006, 40.465325],
    };
    this.specialAreas = ["西城区", "东城区"];
    return {};
  },
  methods: {
    clearEcharts() {
      if (this.eleChart) {
        this.eleChart.clear();
      }
    },
    getMapData() {
      const chinaUrl = "./assets/datas/mapdata/province/110000.json";
      Promise.all([this.$axios.get(chinaUrl)]).then(([res]) => {
        const specialGeoJson = {
          type: "FeatureCollection",
          features: [],
        };
        res.data.features.forEach((item) => {
          if (this.specialAreas.includes(item.properties.name)) {
            specialGeoJson.features.push(item);
          }
        });
        this.$echarts.registerMap("beijing", res.data);
        this.$echarts.registerMap("specialAreas", specialGeoJson);

        this.eleChart = this.$echarts.init(this.$refs.mycharts);
        const option = {
          geo: [
            {
              id: "geo1",
              geoIndex: 0,
              map: "beijing",
              z: 1,
              roam: false,
              layoutCenter: ["42%", "50%"],
              layoutSize: "80%",
              aspectScale: 0.8,
              itemStyle: {
                areaColor: "#F7FBFF",
                borderWidth: 0.4,
                borderColor: "#4B92E8",
              },
              label: {
                show: false,
              },
              emphasis: {
                disabled: true,
                itemStyle: {
                  areaColor: "#F7FBFF",
                },
                label: {
                  show: false,
                },
              },
            },
            {
              id: "geo2",
              geoIndex: 1,
              z: 1,
              map: "specialAreas",
              roam: false,
              layoutCenter: ["71.5%", "70%"],
              layoutSize: "30%",
              aspectScale: 0.8,
              itemStyle: {
                areaColor: "#F7FBFF",
                borderWidth: 0.4,
                borderColor: "#4B92E8",
              },
              label: {
                show: false,
              },
              emphasis: {
                disabled: true,
                itemStyle: {
                  areaColor: "#F7FBFF",
                },
                label: {
                  show: false,
                },
              },
            },
          ],
        };
        this.eleChart.setOption(option);
        this.setEcharts().then((v) => {
          this.echartsSetOption(v);

          setTimeout(()=>{
            this.update()
          },3000)
          // 添加监控size
          if (this.resizeObserver == null) {
            this.resizeObserver = new ResizeObserver(() => {
              this.eleChart.resize();
              this.echartsSetOption(v);
            });
            this.resizeObserver.observe(
              this.$el.getElementsByClassName("view-map")[0]
            );
          }
        });
      });
    },
    async setEcharts() {
      const rawData = {};
      Object.keys(this.geoCoordMap).forEach((key) => {
        rawData[key] = Math.floor(Math.random() * 1000 + 0.5) / 100;
      });
      return rawData;
    },
    update() {
      this.setEcharts().then((data) => {
        let maxValue = 0;
        Object.keys(data).forEach((key) => {
          if (data[key] > maxValue) {
            maxValue = data[key];
          }
        });
        const option = {
          series: [],
          yAxis: [],
        };
        Object.keys(data).forEach((key) => {
          const geoCoord = this.geoCoordMap[key];
          if (geoCoord) {
            option.series.push(
              {
              id: 'end_' + key,
              data: [data[key]],
            },
            {
              id: 'start_' + key,
              data: [data[key]],
            },
            {
              id: 'bar_'+key,
              data: [data[key]],
            }
            );
            option.yAxis.push({
              id: key,
              max: maxValue,
            });
          }
        });
        this.eleChart.setOption(option);
      });
    },
    echartsSetOption(data) {
      // 获取最大值
      let maxValue = 0;
      Object.keys(data).forEach((key) => {
        if (data[key] > maxValue) {
          maxValue = data[key];
        }
      });
      const option = {
        grid: [],
        tooltip: {
          show: true,
          trigger: "item",
          enterable: true,
          confine: true,
          position: "inside",
        },
        xAxis: [],
        yAxis: [],
        series: [],
      };
      Object.keys(data).forEach((key) => {
        const geoCoord = this.geoCoordMap[key];
        if (geoCoord) {
          const coord = this.eleChart.convertToPixel(
            { geoId: this.specialAreas.includes(key) ? "geo2" : "geo1" },
            geoCoord
          );
          option.grid.push({
            id: key,
            width: 20,
            height: 30,
            left: coord[0] - 15,
            top: coord[1] - 40,
            z: 10,
          });
          option.xAxis.push({
            id: key,
            gridId: key,
            z: 10,
            type: "category",
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: true,
              color: "#4B5575",
            },
            axisLine: {
              show: false,
            },
            data: [key],
          });
          option.yAxis.push({
            id: key,
            gridId: key,
            z: 10,
            show: false,
            max: maxValue,
          });
          option.series.push(
            {
              name: 'oval1',
              type: "pictorialBar",
              id: 'end_' + key,
              xAxisId: key,
              yAxisId: key,
              symbolSize: [20, 12],
              symbolOffset: [0, -6],
              data: [data[key]],
              symbolPosition: "end",
              itemStyle: {
                normal: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#7d75f5",
                      },
                      {
                        offset: 1,
                        color: "#cbc7fb",
                      },
                    ],
                    global: false, // 缺省为 false
                  },
                },
              },
              z: 12,
            },
            {
              name: 'oval2',
              type: "pictorialBar",
              id: 'start_' + key,
              xAxisId: key,
              yAxisId: key,
              symbolSize: [20, 12],
              symbolOffset: [0, 6],
              data: [data[key]],
              symbolPosition: "start",
              itemStyle: {
                normal: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#7d75f5",
                      },
                      {
                        offset: 1,
                        color: "#cbc7fb",
                      },
                    ],
                    global: false, // 缺省为 false
                  },
                },
              },
              z: 11,
            },
            {
              type: "bar",
              id: 'bar_'+key,
              xAxisId: key,
              yAxisId: key,
              label: {
                show: true,
                position: "top",
                fontSize: 18,
                color: "#FFFF00",
                formatter: (params) => {
                  return params.data.value;
                },
              },
              barWidth: 24,
              z: 10,
              itemStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#97a6f5", // 0% 处的颜色
                    },
                    {
                      offset: 0.3,
                      color: "#8366ed", // 30% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#79a4f7", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
              data: [data[key]],
            }
          );
        }
      });
      this.eleChart.setOption(option);
    },
  },
  mounted() {
    this.getMapData();
  },
  beforeDestroyed() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  },
};
</script>

<style lang="less" scoped>
.map-container {
  width: 100%;
  height: 100%;
  position: relative;
  .title {
    position: absolute;
    left: 20px;
    top: 32px;
    z-index: 1;
    color: #00ffff;
    cursor: pointer;
  }
}
.view-map {
  width: 100%;
  height: 100%;
}
</style>
