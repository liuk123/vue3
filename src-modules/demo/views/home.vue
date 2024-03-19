<template>
  <div>
    <ol>
      <li>
        <router-link to="/demo/views">组件1</router-link>
      </li>
    </ol>
    <div class="grid">
      <div class="column">
        <MPanel title="table 翻页多选择">
          <MTable  style="width: 100%; height: 400px"/>
        </MPanel>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MTable from './module/MTable1.vue'
import MPanel from '../components/MPanel.vue'
export default {
  name: "Home",
  components: {MPanel, MTable},
  data() {
    return {};
  },
  methods: {},
  computed: {},
  mounted() {},
};
</script>

<style scoped lang="less">
.grid{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 3fr));
  grid-auto-flow: row dense;
}
</style>
