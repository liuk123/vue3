<!--  -->
<template>
  <div class="s-panel" @mouseenter="mouseEnter" @mouseleave="mouseOut">
    <div class="scroll-panel">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "AutoScroll",
  props: {},
  components: {},
  data() {
    this.timer = null;
    return {
      isScroll: false
    };
  },
  methods: {
    mouseEnter() {
      if (this.isScroll) {
        this.clearInterval();
      }
    },
    mouseOut() {
      if (this.isScroll) {
        this.startInterval();
      }
    },
    scroll() {
      let el = this.$el.getElementsByClassName("scroll-panel")[0];
      if (el == null) {
        return null;
      }
      let style = el.getBoundingClientRect();
      let pstyle = el.parentElement.getBoundingClientRect();

      if (style.height - pstyle.height > 10) {
        this.interval({
          parentEl: el.parentElement,
          styleH: style.height,
          pStyleH: pstyle.height
        });
      }
    },
    interval(data) {
      const fn = () => {
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
        if (data.parentEl.scrollTop + data.pStyleH + 10 < data.styleH) {
          data.parentEl.scrollTop += 2;
          this.timer = setTimeout(() => {
            requestAnimationFrame(fn);
          }, 100);
        } else {
          data.parentEl.scrollTop = 0;
          this.timer = setTimeout(() => {
            requestAnimationFrame(fn);
          }, 3000);
        }
      };
      fn();
    },
    clearInterval() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    toTop() {
      let el = this.$el.getElementsByClassName("scroll-panel")[0];
      el.parentElement.scrollTop = 0;
    },
    startInterval() {
      this.isScroll = true;
      this.scroll();
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.s-panel {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
