<template>
  <div class="grid">
   <div class="column">
    <MPanel title="饼图">
      <PieChart style="width: 100%; height: 400px" />
    </MPanel>
   </div>
   <div class="column">
   </div>
  </div>
</template>

<script lang="ts">
import PieChart from './module/PieChart.vue'
import MPanel from '../components/MPanel.vue'
export default {
  name: "Home",
  components:{
    MPanel,
    PieChart
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
