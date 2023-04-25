<template>
  <div class="grid">
   <div class="column">
    <MPanel title="地图打点下钻画线">
      <MapChart />
    </MPanel>
   </div>
  </div>
</template>

<script lang="ts">

import MapChart from './module/MapChart.vue'
import MPanel from '../components/MPanel.vue'
export default {
  name: "Home",
  components:{
    MapChart,
    MPanel
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
