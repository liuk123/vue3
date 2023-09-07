<template>
  <ol>
    <li>
      <router-link to="/chart/bar-chart">柱状图</router-link>
    </li>
    <li>
      <router-link to="/chart/pie-chart">饼图</router-link>
    </li>
    <li>
      <router-link to="/chart/line-chart">折线图</router-link>
    </li>
    <li>
      <router-link to="/chart/map-chart">地图echart</router-link>
    </li>
    <li>
      <router-link to="/chart/guage-chart">仪表盘</router-link>
    </li>
  </ol>
</template>

<script lang="ts">

export default {
  name: "Home",
  components:{
  
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

</style>
