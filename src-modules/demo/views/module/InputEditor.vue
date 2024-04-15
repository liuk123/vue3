<template>
  <div class="inputEditor-container">
     <pre
        class="editor-item"
        contenteditable="true"
        @input="editorInput"
      ></pre>
      <div class="btn-group">
        <el-button
          size="mini"
          v-for="cell in roomNameOption"
          :key="cell.name"
          @click="inputTag(cell.name)"
        >
          {{ cell.name }}
        </el-button>
      </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    this.roomNameOption = [
      {
        name: '日期'
      }, {
        name: '涉及地市'
      }, {
        name: '场景模型名称'
      }, {
        name: '故障/保障级别'
      }, {
        name: '序号'
      }
    ]
    return {
      editorValue: null
    };
  },
  methods: {
    inputTag (value) {
      const el = this.$el.querySelector('.editor-item')

      let sel = window.getSelection()

      let curRange = null
      if(sel.type !== 'None'){
          curRange = sel.getRangeAt(0)
      }
      if (!curRange || curRange.endContainer.parentNode !== el && curRange.endContainer !== el) {
        el.focus()
        sel = window.getSelection()
        sel.selectAllChildren(el)
        sel.collapseToEnd()
        curRange = sel.getRangeAt(0)
      }

      const span = document.createElement('span')
      span.innerHTML = value
      span.setAttribute('contenteditable', false)
      // span.style.color = 'green'
      // span.style.border = '1px solid #ddd'
      // span.style.borderRadius = '4px'
      // span.style.padding = '2px 4px'
      // span.style.margin = '0 4px'
      span.className = 'tagName'
      const frag = document.createDocumentFragment()
      frag.appendChild(span)

      curRange.setStart(curRange.endContainer, curRange.startOffset)
      curRange.setEnd(curRange.endContainer, curRange.endOffset)
      curRange.deleteContents()
      curRange.insertNode(frag)
      curRange.collapse(false)
      sel.removeAllRanges()
      sel.addRange(curRange)

      this.setFormName(el.innerHTML)
    },
    editorInput (e) {
      const value = e.target.innerHTML
      this.setFormName(value)
    },
    setFormName (value) {
      const startTagReg = /<span((?:\s*[a-zA-Z_:@*][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/ig
      const endTagReg = /<\/span>/ig
      this.editorValue = value.replace(startTagReg, '{{').replace(endTagReg, '}}')
    },
  }
};
</script>

<style lang="less">
.inputEditor-container{
  background-color: #fff;
}
.editor-item{
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.tagName{
  color: green;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 2px 4px;
  margin: 0 4px;
  user-select: auto;
}
</style>
