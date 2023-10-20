<template>
  <div class="grid">
   <div class="column">
    <MPanel title="立体柱状图">
      <BarChart style="width: 100%; height: 400px"/>
    </MPanel>
   </div>
   <div class="column">
    <MPanel title="条纹列表柱状图">
      <BarChart1 style="width: 100%; height: 400px"/>
    </MPanel>
   </div>
   <div class="column">
    <MPanel title="渐变带亮点">
      <BarChart2 style="width: 100%; height: 400px"/>
    </MPanel>
   </div>
  </div>
</template>

<script lang="ts">
import BarChart from './module/BarChart.vue'
import BarChart1 from './module/BarChart1.vue'
import BarChart2 from './module/BarChart2.vue'
import MPanel from '../components/MPanel.vue'
export default {
  name: "Home",
  components:{
    MPanel,
    BarChart,
    BarChart1,
    BarChart2
  },
  data() {
    return {
      
    };
  },
  methods: {
    
  },
  computed: {
   
  },
  mounted() {
    
  }
};
</script>

<style scoped lang="less">
.grid{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 3fr));
}
</style>
