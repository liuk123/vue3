<!--  -->
<template>
  <div class="m-container">
    <svg
      id="svgbox"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      @click="ckEvent($event)"
    >
      <defs>
        <path
          id="a"
          d="M 35 1 L 1 21 L 1 60 L 35 80 L 68 60 L 68 21 z"
          class="item"
        ></path>
        <path
          id="toolTip"
          d="M 0,0 L -10,-10 H -57 Q -62,-10 -62,-15 V -55 Q -62,-60
        -57,-60 H 57 Q 62,-60 62,-55 V -15 Q 62,-10 57,-10 H 10 z"
        ></path>
      </defs>
    </svg>
  </div>
</template>
<script>
export default {
  name: "Honeycomb",
  components: {},
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    this.padding = [20, 30, 20, 30];
    this.startY = 70;
    this.startX = 90;
    this.col = {
      1: [11, 12, 13, 14, 13, 12, 11],
      2: [14, 15, 16, 17, 18, 17, 16, 15, 14]
    };
    this.styles = {
      red: {
        stroke: "#ff3337",
        fill: "rgba(255, 51, 55, 0.8)",
        active: "#E6363D"
      },
      orange: {
        stroke: "#e67f0d",
        fill: "rgba(230, 127, 13, 0.8)",
        active: "#E67F0E"
      },
      yellow: {
        stroke: "#ffd900",
        fill: "rgba(255, 217, 0, 0.8)",
        active: "#E6CB0B"
      },
      blue: {
        stroke: "rgba(0, 197, 254, 0.71)",
        fill: "rgba(0, 197, 254, 0.6)",
        active: null
      },
      gray: {
        stroke: "rgba(0,197,254, 0.5)",
        fill: "rgba(0,197,254, 0.2)",
        active: null
      }
    };
    return {
      testData: [],
      colIndex: 1,
      activeNode: null
    };
  },
  watch: {
    data: {
      handler(val) {
        this.$nextTick(() => {
          this.clear();
          if (val && val.length > 0) {
            if (val.length >= 86) {
              this.colIndex = 2;
            } else {
              this.colIndex = 1;
            }
            this.initSvg(val);
          }
        });
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    initSvg(data) {
      const svgbox = this.$el.querySelector("#svgbox");
      let len = this.col[this.colIndex].length;
      let offset = Math.floor(len / 2) / 2;
      let maxW =
        this.col[this.colIndex][Math.floor(len / 2)] * this.startX +
        this.padding[1] +
        this.padding[3];
      let maxH =
        this.col[this.colIndex].length * this.startY +
        this.padding[0] +
        this.padding[2];
      svgbox.setAttribute("viewBox", "0 0 " + maxW + " " + maxH);
      let frag = document.createDocumentFragment();
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < this.col[this.colIndex][i]; j++) {
          let s = 0;
          for (let a = 0; a < i; a++) {
            s += this.col[this.colIndex][a];
          }
          let dataIndex = s + j;
          if (dataIndex < data.length) {
            const element = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "use"
            );

            const text = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "text"
            );
            const text2 = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "text"
            );
            const toolTip = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "use"
            );
            const g1 = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "g"
            );
            let x;
            if (i < len / 2) {
              x =
                (j + offset - i) * this.startX +
                (i * this.startX) / 2 +
                this.padding[3];
            } else {
              x =
                (j + i + 1) * this.startX -
                ((i - offset * 2 + 1 + len) * this.startX) / 2 +
                this.padding[3];
            }
            const y = i * this.startY + this.padding[0];

            element.setAttribute("href", "#a");
            element.setAttribute("x", `${x}`);
            element.setAttribute("y", `${y}`);
            element.setAttribute("class", "honey-item");
            let styleIndex = data[dataIndex].type;
            element.dataset.data = JSON.stringify({
              ...this.styles[styleIndex],
              name: data[dataIndex].name,
              code: data[dataIndex].code,
            });
            Object.keys(this.styles[styleIndex]).forEach(key => {
              element.style[key] = this.styles[styleIndex][key];
            });

            text.setAttribute("x", `${x + this.startX / 2 - 10}`);
            text.setAttribute("y", `${y + this.startY / 2 + 10}`);
            text.setAttribute("class", "honey-value");
            text.setAttribute("dominant-baseline", "middle");

            text2.setAttribute("x", `${x + 30}`);
            text2.setAttribute("y", `${y - 0}`);
            text2.setAttribute("class", "honey-title");
            text2.setAttribute("dominant-baseline", "middle");
            toolTip.setAttribute("href", "#toolTip");
            toolTip.setAttribute("x", `${x + 30}`);
            toolTip.setAttribute("y", `${y + 30}`);
            toolTip.setAttribute("class", "toolTip");
            if (styleIndex !== "blue" && styleIndex !== "gray") {
              toolTip.setAttribute("style", "display:block");
              text2.setAttribute("style", "display:block");
            }
            setTimeout(() => {
              text2.setAttribute("style", "display:none");
              toolTip.setAttribute("style", "display:none");
            }, 15000);
            g1.setAttribute("class", "honey-g");
            // 如不规定中心点，则根据svg整体做动画
            g1.style.transformOrigin = `${x + 71}px ${y + 60.2}px`;
            // 形成扩散的样式
            g1.style.animationDelay = `${((i * 10 + j * 5) / 50).toFixed(1)}s`;
            text.innerHTML = data[dataIndex].value;
            text2.innerHTML =
              data[dataIndex].name?.length > 6
                ? data[dataIndex].name?.slice(0, 5) + "..."
                : data[dataIndex].name;
            g1.appendChild(element);
            g1.appendChild(toolTip);
            g1.appendChild(text);
            g1.appendChild(text2);
            frag.appendChild(g1);
          }
        }
      }
      svgbox.appendChild(frag);
    },
    clear() {
      this.activeNode = null;
      let doms = Array.from(this.$el.querySelectorAll(".honey-g"));
      doms?.forEach(item => item.remove());
    },
    ckEvent(e) {
      let t = e.target;
      if (t.nodeName == "svg") {
        return null;
      }
      while (t.nodeName !== "g" && t) {
        t = t.parentNode;
      }
      if (this.activeNode) {
        let style = JSON.parse(
          this.activeNode?.firstChild?.dataset?.data || {}
        );
        this.activeNode.firstChild.style.fill = style.fill;
      }

      let style = JSON.parse(t?.firstChild?.dataset?.data || {});
      /*隐掉 蓝色蜂窝块添加点击事件 */
      // if (style.active == null) {
      //   return null;
      // }
      if (this.activeNode !== t) {
        this.activeNode = t;
        this.activeNode.firstChild.style.fill = style.active;
        this.$emit("click-event", {
          name: style.name,
          code: style.code,
        });
      } else {
        this.activeNode = null;
        this.$emit("click-event", null);
      }
    }
  },
  mounted() {
    for (let i = 0; i < 140; i++) {
      this.testData.push({
        name: "杭研杭研" + i,
        value: i,
        code: Math.random(),
        type:
          Math.random() < 0.2
            ? "red"
            : Math.random() > 0.2 && Math.random() < 0.4
            ? "orange"
            : Math.random() > 0.4 && Math.random() < 0.6
            ? "yellow"
            : "blue"
      });
    }
    this.$nextTick(() => {
      this.initSvg(this.testData);
    });
  }
};
</script>

<style lang="less">
.m-container {
  width: 100%;
  height: 100%;
}
.honey-value {
  font-size: 24px;
  font-family: Bender-Bold;
  fill: #fff;
  text-anchor: middle;
}
.honey-item {
  cursor: pointer;
  stroke-width: 4;
}
.honey-title {
  display: none;
  font-family: PingFang SC;
  font-size: 18px;
  text-anchor: middle;
}
.display-block {
  display: block !important;
}
.display-none {
  display: none;
}
.honey-g {
  animation: appear 1s infinite;
  animation-iteration-count: 1;
  /* 应用结束时候的样式 */
  animation-fill-mode: forwards;
  opacity: 0;

  cursor: pointer;
  &:hover .toolTip {
    display: block !important;
  }
  &:hover .honey-title {
    display: block !important;
  }
}
.toolTip {
  fill: rgba(255, 255, 255, 0.7);
  display: none;
  /* display: block; */
}
@keyframes appear {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
