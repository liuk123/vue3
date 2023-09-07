<template>
  <div class="map-container" style="width: 100%; height: 100%"></div>
</template>
<script>
export default {
  name: "",
  props: {
    data: {
      type: Array,
      default() {
        return [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ];
      },
    },
    maxData: {
      type: Number,
      default: 100,
    },
    unit: {
      type: String,
      default: "",
    },
  },
  components: {},
  data() {
    this.chart = null;
    return {};
  },
  watch: {
    data() {
      if (this.chart) {
        this.update();
      }
    },
  },
  methods: {
    init() {
      if (this.chart === null) {
        this.chart = this.$echarts.init(this.$el);
      }
      const option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          bottom: "5%",
          right: "5%",
          width: "5%",
        },
        series: [
          {
            id: "pie1",
            type: "pie",
            radius: ["40%", "70%"],
            // avoidLabelOverlap: false, //防止标签重叠
            // label: {
            // show: false,
            // position: "center",
            // },
            emphasis: {
              label: {
                show: true,
                fontWeight: "bold",
              },
            },
            // labelLine: {
            //   show: false,
            // }
          },
        ],
      };
      this.chart.setOption(option);
    },
    update() {
      let option = {
        series: [
          {
            id: "pie1",
            data: this.data,
          },
        ],
      };
      this.chart?.setOption(option);
    },
  },
  mounted() {
    this.init();
    setTimeout(() => {
      this.update();
    }, 1000);
  },
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
