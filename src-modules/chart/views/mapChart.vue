<template>
  <div class="grid">
   <div class="column">
    <MPanel title="地图打点下钻画线">
      <MapChart style="width: 100%; height: 400px"/>
    </MPanel>
   </div>
   <div class="column">
    <MPanel title="地图柱状图">
      <BarMapChart style="width: 100%; height: 400px"/>
    </MPanel>
   </div>
   <div class="column">
   </div>
  </div>
</template>

<script lang="ts">
import BarMapChart from './module/BarMapChart.vue'
import MapChart from './module/MapChart.vue'
import MPanel from '../components/MPanel.vue'
export default {
  name: "Home",
  components:{
    MapChart,
    MPanel,
    BarMapChart,
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
  grid-auto-flow: row dense;
}
</style>
