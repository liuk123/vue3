<template>
  <div class="table-container">
    <table class="table-th table">
      <thead>
        <tr>
          <th
            v-for="(item, index) in headerData"
            :key="index"
            :style="item.styles"
          >
            {{ item.name }}
          </th>
          <th v-if="opt && opt.length > 0" :style="{ width: opt[0].width }">
            操作
          </th>
        </tr>
      </thead>
    </table>
    <div>
      <table class="table-tr table">
        <thead>
          <tr
            v-for="(item, index) in tableData"
            :key="index"
            :class="{
              active:
                active && active.code && active?.value == item[active.code]
            }"
          >
            <td
              v-for="(cell, subIndex) in headerData"
              :key="subIndex"
              :title="item[cell.code]"
              :style="cell.styles"
            >
              <span
                v-if="cell.type == 'option' && cell.option[item[cell.code]]"
                >{{ cell.option[item[cell.code]] }}</span
              >
              <template v-else>
                <span v-if="item[cell.code]">{{ item[cell.code] }}</span>
              </template>
            </td>
            <td v-if="opt && opt.length > 0" :style="{ width: opt[0].width }">
              <span
                v-for="(cell, optIndex) in opt"
                :key="optIndex"
                style="font-size: 1em;color:#33d1ff; cursor:pointer;user-select: none;"
                @click="cell.fn(item)"
                >{{ cell.title }}</span
              >
            </td>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: {
    headerData: {
      type: Array,
      default: () => [
      {
        code: "text1",
        name: "网元名称",
        styles: {
          width: "200px"
        }
      },
      {
        code: "text2",
        name: "告警发生时间",
        styles: {
          width: "200px"
        }
      },
      {
        code: "text3",
        name: "工单号",
        styles: {
          width: "200px"
        }
      },
      {
        code: "text4",
        name: "工单处理人",
        styles: {
          width: "200px"
        }
      }]
    },
    tableData: {
      type: Array,
      default: () => [
        {
          text1: 12,
          text2: 12,
          text3: 12,
          text4: 12
        },{
          text1: 13,
          text2: 13,
          text3: 13,
          text4: 13
        },
      ]
    },
    height: {
      type: Number,
      default: 380
    },
    opt: {
      type: Array,
      default: () => []
    },
    active: {
      type: Object,
      default: () => ({})
    }
  },
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.table-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 24px 1fr;
}
.table {
  line-height: 1.7em;
  table-layout: fixed;
  border-collapse: collapse;
  .tbody {
    overflow-y: auto;
    overflow-x: hidden;
  }
  th {
    font-size: 18px;
    text-align: left;
    width: 20%;
    color: #33d1ff;
    padding: 0 8px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  td {
    font-size: 16px;
    width: 20%;
    color: rgba(255, 255, 255, 0.8);
    padding: 0 8px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
.table-tr tr:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.1);
}
.active {
  background-image: linear-gradient(
    90deg,
    rgba(255, 51, 55, 0.1) 0%,
    rgba(255, 51, 55, 0.4) 51%,
    rgba(255, 51, 55, 0.1) 100%
  );
}
</style>
