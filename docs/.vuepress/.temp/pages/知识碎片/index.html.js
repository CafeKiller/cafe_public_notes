import comp from "D:/Project/Other/cafe-public-notes/docs/.vuepress/.temp/pages/知识碎片/index.html.vue"
const data = JSON.parse("{\"path\":\"/%E7%9F%A5%E8%AF%86%E7%A2%8E%E7%89%87/\",\"title\":\"Shards\",\"lang\":\"zh-CN\",\"frontmatter\":{\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0.74,\"words\":221},\"filePathRelative\":\"知识碎片/README.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
