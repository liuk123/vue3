<!--  -->
<template>
  <el-calendar class="calendar-container">
    <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
    <template
      #dateCell="{data}"
    >
      <div class="date-content">
        <div class="date">
          {{ data.day.slice(-2) }}
        </div>
        <div class="events">
          <div class="event green"></div>
          <div class="event yellow"></div>
          <div class="event blue"></div>
        </div>
      </div>
    </template>
  </el-calendar>
</template>
<script>
export default {
  name: '',
  props: {
    headerData: {
      type: Object,
      default: () => ({})
    }
  },
  components: {},
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.calendar-container{
  background-color: transparent;
  :deep(.el-calendar__body){
    padding: 0;
    .el-calendar-day{
      height: revert;
    }
    .el-calendar-table{
      th{
        color: #95B0CF;
      }
      td{
        border-width: 0;
        background: transparent;
        .el-calendar-day{
          margin: 2px;
          border-radius: 2px;
          text-align: center;
          height: 48px;
        }
      }
      .current{
        .el-calendar-day{
          color: #00FFFF;
          background: rgba(14,109,150,0.2);
        }
      }
      .prev,.next{
        .el-calendar-day{
          color:#0083A9;
          background: rgba(14,109,150,0.15);
        }
      }
    }
  }
  :deep(.el-calendar__header){
    border-width: 0;
    padding: 4px 20px;
    .el-calendar__title{
      color: rgb(0, 255, 255);

    }
    .el-button{
      background-color: transparent;
      border: 1px solid #5E71A9;
      color: #5E71A9;
      border-radius: 4px;
      margin-left: 4px;
    }
  }
}
.date-content{
  width:100%;
  height:100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 8px;
  .events{
    display: flex;
    justify-content: center;
    gap: 8px;
    .event{
      width:10px;
      height: 10px;
      border-radius: 50%;
    }
  }
}
.green{
  background-color: #33F8AC;
}
.yellow{
  background-color: #FFC067;
}
.blue{
  background-color: #31B7FF;
}
</style>
