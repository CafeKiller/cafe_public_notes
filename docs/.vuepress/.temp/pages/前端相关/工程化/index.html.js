import comp from "D:/Project/Other/cafe-public-notes/docs/.vuepress/.temp/pages/前端相关/工程化/index.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%89%8D%E7%AB%AF%E7%9B%B8%E5%85%B3/%E5%B7%A5%E7%A8%8B%E5%8C%96/\",\"title\":\"工程化\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"工程化\",\"article\":false,\"feed\":false,\"sitemap\":false,\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0,\"words\":1},\"filePathRelative\":null}")
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
