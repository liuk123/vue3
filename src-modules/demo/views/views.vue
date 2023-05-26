<template>
  <div class="grid">
   <div class="column">
    <MPanel title="蜂窝图">
      <Honeycomb style="width: 100%; height: 400px"/>
    </MPanel>
   </div>
   <div class="column">
    <MPanel title="滚动">
      <ScrollPanel style="width: 100%; height: 400px" ref="scrollPanel">
        <div style="width:100%;height: 30px;color: #fff;" v-for="(item,index) in list" :key="index">{{index}}</div>
      </ScrollPanel>
    </MPanel>
   </div>
   <div class="column">
   </div>
  </div>
</template>

<script lang="ts">
// Honey
// 
import MPanel from '../components/MPanel.vue'

import ScrollPanel from './module/ScrollPanel.vue'
import Honeycomb from './module/Honeycomb.vue'
export default {
  name: "Views",
  components:{
    MPanel,
    Honeycomb,
    ScrollPanel
  },
  data() {
    return {
      list: new Array(100).fill(1)
    };
  },
  methods: {
    
  },
  computed: {
   
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.scrollPanel.startInterval()
    })
  }
};
</script>

<style scoped lang="less">
.grid{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 3fr));
}
</style>
