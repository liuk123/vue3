<!--  -->
<template>
  <div style="width:100%;height:100%;">
    <table class="table-th table">
      <thead>
        <tr>
          <th
            v-for="(item, key) in headerData"
            :key="key"
            :style="{ width: item.width }"
          >
            {{ item.name }}
          </th>
          <th
            v-if="opt && opt.length > 0"
            :style="{ width: opt[0].width }"
          >
            操作
          </th>
        </tr>
      </thead>
    </table>
    <div :style="{ height: height + 'px', 'overflow-y': 'auto' }">
      <table class="table-tr table">
        <thead>
          <tr
            v-for="(item, index) in tableData"
            :key="index"
            :class="{
              active:
                active && active.value && active.value == item[active.code]
            }"
          >
            <td
              v-for="(cell, key) in headerData"
              :key="key"
              :title="item[key]"
              :style="{ width: cell.width }"
            >
              <span
                v-if="cell.type == 'option' && cell.option[item[key]]"
                :style="cell.style"
              >{{ cell.option[item[key]] }}</span>
              <template v-else>
                <span v-if="item[key]">{{ item[key] }}</span>
              </template>
            </td>
            <td
              v-if="opt && opt.length > 0"
              :style="{ width: opt[0].width }"
            >
              <span
                v-for="(cell) in opt"
                :key="cell"
                style="font-size: 1em;color:#33d1ff; cursor:pointer;"
                @click="cell.fn(item)"
              >{{ cell.title }}</span>
            </td>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    headerData: {
      type: Object,
      default: () => ({})
    },
    tableData: {
      type: Array,
      default: () => []
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
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.table {
  line-height: 1.7em;
  table-layout: fixed;
  border-collapse: collapse;
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
  // border-image: linear-gradient(
  //     90deg,
  //     rgba(255, 51, 55, 0.1) 0%,
  //     rgba(255, 51, 55, 0.4) 51%,
  //     rgba(255, 51, 55, 0.1) 100%
  //   )
  //   1;
  // border-style: solid;
  // border-width: 1px 0 1px 0;
}
</style>
