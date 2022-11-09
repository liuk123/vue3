<template>
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
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

<style>
</style>
