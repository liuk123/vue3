<template>
  <div class="grid">
   <div class="column">
    <MPanel title="仪表盘">
      <GuageChart style="width: 100%; height: 400px"/>
    </MPanel>
   </div>
  </div>
</template>

<script lang="ts">
import MPanel from '../components/MPanel.vue'
import GuageChart from './module/GuageChart.vue'
export default {
  name: "Home",
  components:{
    MPanel,
    GuageChart
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
