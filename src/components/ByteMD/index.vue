<template>
  <Editor :value="value" :plugins="plugins" @change="handleChange" />
</template>

<script>
import { Editor, Viewer } from '@bytemd/vue'
import breaks from '@bytemd/plugin-breaks'
import footnotes from '@bytemd/plugin-footnotes'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import mermaid from '@bytemd/plugin-mermaid'

import 'bytemd/dist/index.min.css'
import 'highlight.js/styles/vs.css'

const plugins = [
  breaks(),
  footnotes(),
  frontmatter(),
  gemoji(),
  highlight(),
  mermaid(),
  gfm()
  // Add more plugins here
]

export default {
  components: { Editor },
  data() {
    return { value: '', plugins }
  },
  methods: {
    handleChange(v) {
      this.value = v
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .bytemd {
  height: calc(100vh - 235px);
}
</style>
