<template>
  <div class="calendar-container">
    <div class="calender-bar">
      {{ currentYear }}
      {{ currentMonth }}
    </div>
    <div class="calendar-content">
      <div
        class="calendar-item"
        v-for="(item, index) in monthDays"
        :key="index"
        @click="ck"
      >
        <div class="time">{{ item.date }}</div>
        <div class="task"></div>
      </div>
      <div class="model">
        <template v-for="(items, index) in planData" :key="index">
          <div
            class="bar"
            v-for="(item, index) in items.pos"
            :key="index"
            :style="{
              width: item.width + 'px',
              height: item.height + 'px',
              left: item.left + 'px',
              top: item.top + 24 + 'px',
              backgroundColor: items.data.color,
            }"
          >
            {{ items.data.name }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    this.lang = {
      weeks: ["日", "一", "二", "三", "四", "五", "六"],
      time: ["时", "分"],
      timeTips: "选择时间",
      startTime: "开始时间",
      endTime: "结束时间",
      dateTips: "返回日期",
      month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      tools: {
        confirm: "确定",
        cancel: "取消",
      },
    };
    return {
      monthDays: null, // 日历数据
      currentMonth: 11, //日历显示月份
      currentYear: 2023, //日历显示月份
      data: [
        {
          startTime: new Date("2023/11/5 00:00:00"),
          endTime: new Date("2023/11/30 12:00:00"),
          name: "任务1",
          color: "#f00",
        },
        {
          startTime: new Date("2023/11/22 00:00:00"),
          endTime: new Date("2023/11/24 12:00:00"),
          name: "任务2",
          color: "#ff0",
        },
        {
          startTime: new Date("2023/11/8 00:00:00"),
          endTime: new Date("2023/11/9 12:00:00"),
          name: "任务3",
          color: "#f0f",
        },
        {
          startTime: new Date("2023/11/12 00:00:00"),
          endTime: new Date("2023/11/13 12:00:00"),
          name: "任务4",
          color: "#0ff",
        },
        {
          startTime: new Date("2023/11/9 00:00:00"),
          endTime: new Date("2023/11/10 12:00:00"),
          name: "任务5",
          color: "#3f9",
        },
        {
          startTime: new Date("2023/11/9 00:00:00"),
          endTime: new Date("2023/11/10 12:00:00"),
          name: "任务6",
          color: "#3f9",
        },
        {
          startTime: new Date("2023/11/9 00:00:00"),
          endTime: new Date("2023/11/10 12:00:00"),
          name: "任务7",
          color: "#3f9",
        },
      ],
      planData: null,
    };
  },
  methods: {
    getMonthCalendarData(year, month) {
      const date = new Date(year, month, 0);
      const allDate = date.getDate(); // 一个月有多少天,最后一天是几号
      const lastDay = date.getDay(); // 一个月最后一天是周几

      let lastNum = 7 - lastDay;
      const firstNum = 7 - ((allDate + lastNum) % 7);
      const other = firstNum + lastNum;

      let arr = new Array(allDate + other);
      for (let i = 0; i < allDate + other; i++) {
        let t = new Date(year, month - 1, i - firstNum + 1);
        arr[i] = {
          time: t,
          date: t.getDate(),
        };
      }
      return arr;
    },
    chunkArray(arr, n) {
      let data = new Array(Math.ceil(arr.length / n));
      for (let i = 0; i < data.length; i++) {
        let rows = new Array(n);
        for (let j = 0; j < n; j++) {
          rows[j] = arr[i * n + j];
        }
        data[i] = rows;
      }
      return data;
    },
    compareDate(d1, d2) {
      let t1 = new Date(
        d1.getFullYear(),
        d1.getMonth(),
        d1.getDate()
      ).getTime();
      let t2 = new Date(
        d2.getFullYear(),
        d2.getMonth(),
        d2.getDate()
      ).getTime();
      return t1 == t2;
    },
    mapPlan(monthDays, data) {
      let ret = [];
      data.forEach((v) => {
        let tem = [];
        let startIndex = null;
        let index = 0;
        while (index < monthDays.length) {
          if (this.compareDate(v.startTime, monthDays[index].time)) {
            startIndex = index;
          }
          if (monthDays[index].time.getDay() == 0 && startIndex) {
            tem.push({
              startIndex: startIndex,
              endIndex: index,
            });
            startIndex = index + 1;
          }
          if (this.compareDate(v.endTime, monthDays[index].time)) {
            if (startIndex <= index) {
              tem.push({
                startIndex: startIndex,
                endIndex: index,
              });
            }
            break;
          }
          index++;
        }
        ret.push({
          data: v,
          pos: tem,
        });
      });
      return ret;
    },
    setIndex(data) {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].pos.length; j++) {
          for(let a=i+1; a < data.length; a++){
            for(let b=0; b < data[a].pos.length; b++){
              if (
                data[a].pos[b].startIndex >= data[i].pos[j].startIndex &&
                data[a].pos[b].startIndex <= data[i].pos[j].endIndex ||
                data[a].pos[b].endIndex >= data[i].pos[j].startIndex &&
                data[a].pos[b].endIndex <= data[i].pos[j].endIndex
              ) {
                if(!data[a].pos[b].posIndex || (data[a].pos[b].posIndex <= (data[i].pos[j].posIndex??0) + 1)){
                  data[a].pos[b].posIndex = (data[i].pos[j].posIndex??0) + 1;
                }
                break;
              }
            }
          }
        }
      }
      return data
    },
    setPosition(data, doms) {
      data.forEach((d) => {
        d.pos.forEach((v) => {
          v.left = doms[v.startIndex].offsetLeft;
          v.top = doms[v.startIndex].offsetTop + 13 * (v.posIndex??0);
          v.width =
            doms[v.endIndex].getBoundingClientRect().right -
            doms[v.startIndex].getBoundingClientRect().left;
          v.height = 12;
        });
      });
      return data;
    },
    ck() {
      // let el = this.$el.querySelector('.model')
      // el.remove()
    },
  },
  mounted() {
    this.monthDays = this.getMonthCalendarData(
      this.currentYear,
      this.currentMonth
    );
    let ret = this.mapPlan(this.monthDays, this.data);
    console.log("ret", ret);
    this.$nextTick(() => {
      let doms = Array.from(this.$el.querySelectorAll(".calendar-item"));
      ret = this.setIndex(ret);
      this.planData = this.setPosition(ret, doms);
      console.log(this.planData);
    });
  },
};
</script>

<style lang="less" scoped>
.calendar-container {
  color: #fff;
  height: 400px;
  grid-template-rows: 40px auto;
  display: grid;
}
.calendar-content {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  position: relative;
  .calendar-item {
    padding: 4px;
    background-color: rgba(255, 255, 255, 0.15);
    display: grid;
    grid-template-rows: 22px auto;
  }
}
.model {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 255, 0, 0.3);
  pointer-events: none;
  .bar {
    position: absolute;
    pointer-events: auto;
    font-size: 12px;
    line-height: 12px;
  }
}
</style>
