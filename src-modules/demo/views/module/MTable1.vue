<template>
  <div class="table-container">
    <el-table
      :data="tableData"
      ref="tableRef"
      border
      style="width: 400px;height: 300px"
      @select="onSelectionChange"
      @select-all="onSelectionAllChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        v-for="(col, index) in tableHeader"
        :key="index"
        :label="col.name"
        :width="col.styles.width"
      >
        <template v-slot="scope">
          <template v-if="col.type === 'select'">
            {{ col.option[scope.row[col.code]] }}
          </template>
          <template v-else>
            {{ scope.row[col.code] }}
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="145">
        <template v-slot="scope">
          <el-button @click="onUpdate(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button
            type="danger"
            @click="onDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :total="pageConfig.total"
        :page-size="pageConfig.pageSize"
        @current-change="onCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    this.tableKey = "id";
    return {
      form: {
        name: null,
      },
      pageConfig: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      tableHeader: [
        {
          code: "id",
          name: "id",
          styles: {
            width: "200px",
          },
        },
        {
          code: "text2",
          name: "告警发生时间",
          styles: {
            width: "200px",
          },
        },
        {
          code: "text3",
          name: "工单号",
          styles: {
            width: "200px",
          },
        },
        {
          code: "text4",
          name: "工单处理人",
          styles: {
            width: "200px",
          },
        },
      ],
      tableData: [
       
      ],
      res: [
        {
          id: 22,
          text2: 12,
          text3: 12,
          text4: 12,
        },
        {
          id: 33,
          text2: 12,
          text3: 12,
          text4: 12,
        },
        {
          id: 44,
          text2: 12,
          text3: 12,
          text4: 12,
        },
        {
          id: 45,
          text2: 12,
          text3: 12,
          text4: 12,
        },
        {
          id: 46,
          text2: 12,
          text3: 12,
          text4: 12,
        },
      ],
      selData: [],
    };
  },
  methods: {
    clearSearchForm(){
      this.form = {
        name: ''
      }
      this.clearSelection()
    },
    onQuery() {
      this.pageConfig.currentPage = 1;
      this.clearSelection()
      this.query();
    },
    onCurrentChange(val) {
      console.log(val)
      this.pageConfig.currentPage = val
      this.query();
    },
    onSelectionChange(val, row) {
      const index = val.findIndex(
        (v) => v[this.tableKey] === row[this.tableKey]
      );
      if (index !== -1) {
        this.selData.push(row);
      } else {
        this.selData.splice(index, 1);
      }
      console.log(this.selData)
    },
    onSelectionAllChange(val) {
      if (val.length > 0) {
        val?.forEach((item) => {
          if (
            this.selData.every((v) => v[this.tableKey] !== item[this.tableKey])
          ) {
            this.selData.push(item);
          }
        });
      } else {
        for (let i = this.tableData.length - 1; i >= 0; i--) {
          const index = this.selData.findIndex(
            (v) => v[this.tableKey] === this.tableData[i][this.tableKey]
          );
          if (index !== -1) {
            this.selData.splice(index, 1);
          }
        }
      }
    },
    /**
     * rows [1,2,3,4] id数组
     */
    toggleRowSelection(rows) {
      if (rows) {
        this.$nextTick(() => {
          rows.forEach((id) => {
            const item = this.tableData.find((v) => v[this.tableKey] === id);
            if (item) {
              this.$refs.tableRef.toggleRowSelection(item);
            }
            this.selData.push({ [this.tableKey]: id });
          });
        });
      }
    },
    clearSelection() {
      this.$refs.tableRef.clearSelection();
      this.selData = [];
    },
    query() {
      const params = {
        ...this.form,
        pageIndex: this.pageConfig.currentPage,
        pageSize: this.pageConfig.pageSize,
      };

      (new Promise(resolve => {
        resolve({
          data: {
            records: this.res.map((v) => ({
              ...v,
              id: params.pageIndex * 10 + v.id,
            })),
            total: 1000,
          },
          code: 20000,
        });
      })).then((res) => {
        if (res.code === 20000) {
          this.tableData = res.data.records
          this.pageConfig.total = res.data.total
          this.$nextTick(() => {
            this.selData.forEach((v) => {
              const item = this.tableData.find(
                (val) => val[this.tableKey] === v[this.tableKey]
              );
              if (item) {
                this.$refs.tableRef.toggleRowSelection(item);
              }
            });
          });
        }
      });
    },
  },
  mounted(){
    this.query()
  }
};
</script>

<style lang="less" scoped>
</style>
