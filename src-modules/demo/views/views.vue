<template>
  <div class="grid">
   <div class="column">
    <MPanel title="滚动">
      <!-- <MapChart style="width: 100%; height: 400px"/> -->
    </MPanel>
   </div>
   <div class="column">
    <MPanel title="table">
      <!-- <MapChart style="width: 100%; height: 400px"/> -->
    </MPanel>
   </div>
   <div class="column">
   </div>
  </div>
</template>

<script lang="ts">

import MPanel from '../components/MPanel.vue'
export default {
  name: "Home",
  components:{
    MPanel,
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
