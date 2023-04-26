<!--  -->
<template>
  <div
    class="m-panel"
  >
    <div class="panel-header">
      <span class="title">
        {{ title }}
      </span>
      <span style="flex: 1 1 auto;"></span>
      <slot name="subRight"></slot>
    </div>
    <div class="panel-body ">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "MPanel",
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  components: {},
  data() {
    return {};
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
.m-panel {
  border: 1px solid #ddd;
  background-color: #000;
  .panel-header {
    display: flex;
    align-items: center;
    padding: 0px 16px;
    background: rgba(0, 197, 254, 0.2);
    position: relative;
    height: 32px;
    .title {
      text-shadow: 0 0 10px #00c3fb;
      color: #fff;
    }
  }
}
</style>
