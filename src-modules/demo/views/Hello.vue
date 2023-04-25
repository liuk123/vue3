<template>
  <div>
    <h2>1{{ count }}</h2>
    <p @click="goHome">111home</p>
  </div>
</template>

<script lang="ts">
import { mapState } from "vuex";
interface Student {
  name: string;
  class?: string;
  age: number;
}

export default {
  name: "Hello",
  props: {
    msg: {
      type: String,
    },
  },
  data() {
    return {
      m1: 2,
      student: {
        name: "li",
        class: "1",
        age: 12,
      } as Student,
    };
  },
  methods: {
    goHome: function () {
      this.$router.push("/");
    },
  },
  computed: {
    ...mapState({
      count: (state: any) => state.demoModule.count,
    }),
  },
  mounted() {
    
  },
  unmounted() {
  },
};
</script>

<style scoped lang="less">
</style>
