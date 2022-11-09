<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
export default {
  name: 'helloWorld',
  props:{
    msg:{
      type:String,
    }
  },
  data(){
    return {
    }
  },
  methods:{
  }
}
</script>

<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
