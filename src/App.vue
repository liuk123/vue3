<template>
  <HelloWorld msg="vue3+elementui+echarts DEMO"/>
   <ul class="menu-list">
    <li>
      <router-link to="/chart/home">chart</router-link>
    </li>
    <li>
      <router-link to="/demo/home">vue组件</router-link>
    </li>
  </ul>
  <router-view></router-view>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from './framework/components/HelloWorld.vue';

@Options({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {}
</script>

<style lang="less" scoped>
.menu-list{
  display: flex;
  li{
    width: 80px;
  }
}
</style>
