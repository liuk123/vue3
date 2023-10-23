<template>
  <div class="top-grid" style="width: 100%;height: 100%;">
    <div class="chart-item" v-for="(item, index) in data" :key="index">
      <div class="text-row">
        <div
          class="index"
          :style="{
            backgroundImage:
              'linear-gradient(90deg, ' + styles.barColor + ', transparent)'
          }"
        >
          {{ item.index }}
        </div>
        <div class="title">{{ item.name }}</div>
        <div class="value">
          <span class="number">{{ item.value }}</span>
          <span class="unit">{{ item.unit }}</span>
        </div>
      </div>
      <div class="bar-row">
        <div
          class="bar"
          :style="{
            width: item.value + '%',
            backgroundImage:
              'linear-gradient(to right, transparent, ' + styles.barColor + ')'
          }"
        ></div>
        <div
          class="pointer"
          :style="{ boxShadow: '0 0 7px 3px ' + styles.barColor }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    data: {
      type: Array,
      default() {
        return [
          {
            index: 1,
            name: "AAA",
            value: 60,
            unit: "%"
          },
          {
            index: 1,
            name: "AAA",
            value: 60,
            unit: "%"
          },
          {
            index: 1,
            name: "AAA",
            value: 60,
            unit: "%"
          },
          {
            index: 1,
            name: "AAA",
            value: 60,
            unit: "%"
          },
          {
            index: 1,
            name: "AAA",
            value: 60,
            unit: "%"
          },
          {
            index: 1,
            name: "AAA",
            value: 60,
            unit: "%"
          },
          {
            index: 1,
            name: "AAA",
            value: 60,
            unit: "%"
          },
          {
            index: 1,
            name: "AAA",
            value: 60,
            unit: "%"
          },
          {
            index: 1,
            name: "AAA",
            value: 60,
            unit: "%"
          },
          {
            index: 1,
            name: "AAA",
            value: 60,
            unit: "%"
          }
        ];
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
    }
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
  watch: {},
  mounted() {}
};
</script>

<style lang="less" scoped>
.text-row {
  display: grid;
  grid-template-columns: 32px 1fr auto;
  gap: 8px;
  align-items: center;
  .index {
    line-height: 20px;
    text-align: center;
    border-radius: 4px;
    transform: skewX(-22deg);
    color: #fff;
  }
  .title {
    color: #fff;
  }
}
.bar-row {
  height: 4px;
  background-color: #041e3b;
  margin-top: 4px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  .bar {
    height: 100%;
  }
  .pointer {
    width: 6px;
    height: 6px;
    background-color: #fff;
    // border: 2px solid;
    border-radius: 50%;
    margin-left: -4px;
  }
}

.top-grid {
  display: grid;
  padding: 16px;
  box-sizing: border-box;
  grid-template-rows: repeat(5, 1fr);
  grid-auto-flow: column dense;
  column-gap: 16px;
  .chart-item{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
