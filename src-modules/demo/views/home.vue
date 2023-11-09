<template>
  <div>
    <ol>
      <li>
        <router-link to="/demo/views">组件1</router-link>
      </li>
    </ol>
    <div class="grid">
      <div class="column">
        <MPanel title="calendar">
          <Calendar  style="width: 100%; height: 400px"/>
        </MPanel>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MPanel from '../components/MPanel.vue'
import Calendar from './module/Calendar.vue'
export default {
  name: "Home",
  components: {Calendar, MPanel},
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
