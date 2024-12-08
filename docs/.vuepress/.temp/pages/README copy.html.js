import comp from "D:/Project/Other/cafe-public-notes/docs/.vuepress/.temp/pages/README copy.html.vue"
const data = JSON.parse("{\"path\":\"/README%20copy.html\",\"title\":\"cafe_public_notes\",\"lang\":\"zh-CN\",\"frontmatter\":{\"gitInclude\":[]},\"headers\":[{\"level\":2,\"title\":\"文件说明\",\"slug\":\"文件说明\",\"link\":\"#文件说明\",\"children\":[]},{\"level\":2,\"title\":\"关于\",\"slug\":\"关于\",\"link\":\"#关于\",\"children\":[]}],\"readingTime\":{\"minutes\":1.06,\"words\":317},\"filePathRelative\":\"README copy.md\"}")
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
