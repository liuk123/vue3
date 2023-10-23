<template>
  <div class="top-grid">
    <div class="chart-item" v-for="(item, index) in data" :key="index">
      <div class="text-row">
        <div class="index">
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
            width: item.value + '%'
          }"
        ></div>
        <div class="pointer"></div>
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
            index: 2,
            name: "AAA",
            value: 60,
            unit: "%"
          },
          {
            index: 3,
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
    color: #fff;
    line-height: 20px;
    text-align: center;
    border-radius: 4px;
    transform: skewX(-22deg);
    background-image: linear-gradient(90deg, #27ffff, transparent);
  }
  .title {
    color: #fff;
  }
  .value {
    color: #27ffff;
  }
}
.bar-row {
  height: 4px;
  background-color: #041e3b;
  margin-top: 4px;
  display: flex;
  align-items: center;
  .bar {
    height: 100%;
    background-image: linear-gradient(to right, transparent, #27ffff);
  }
  .pointer {
    width: 6px;
    height: 6px;
    background-color: #fff;
    border-radius: 50%;
    margin-left: -4px;
    box-shadow: 0 0 7px 3px #27ffff;
  }
}

.top-grid {
  width: 100%;height: 100%;
  display: grid;
  padding: 16px;
  box-sizing: border-box;
  grid-template-rows: repeat(5, 1fr);
  grid-auto-flow: column dense;
  column-gap: 16px;
}
.chart-item:nth-child(1) {
  .index {
    background-image: linear-gradient(90deg, #d2282b, transparent);
  }
  .bar {
    background-image: linear-gradient(to right, transparent, #d2282b);
  }
  .value {
    color: #d2282b;
  }
  .pointer {
    box-shadow: 0 0 7px 3px #d2282b;
  }
}
.chart-item:nth-child(2) {
  .index {
    background-image: linear-gradient(90deg, #E47A2E, transparent);
  }
  .bar {
    background-image: linear-gradient(to right, transparent, #E47A2E);
  }
  .value {
    color: #E47A2E;
  }
  .pointer {
    box-shadow: 0 0 7px 3px #E47A2E;
  }
}
.chart-item:nth-child(3) {
  .index {
    background-image: linear-gradient(90deg, #FFC455, transparent);
  }
  .bar {
    background-image: linear-gradient(to right, transparent, #FFC455);
  }
  .value {
    color: #FFC455;
  }
  .pointer {
    box-shadow: 0 0 7px 3px #FFC455;
  }
}
</style>
