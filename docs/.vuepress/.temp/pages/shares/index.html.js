import comp from "D:/Project/Other/cafe-public-notes/docs/.vuepress/.temp/pages/shares/index.html.vue"
const data = JSON.parse("{\"path\":\"/shares/\",\"title\":\"知识碎片\",\"lang\":\"zh-CN\",\"frontmatter\":{\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0.75,\"words\":224},\"filePathRelative\":\"shares/README.md\"}")
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
