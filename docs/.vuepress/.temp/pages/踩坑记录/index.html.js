import comp from "D:/Project/Other/cafe-public-notes/docs/.vuepress/.temp/pages/踩坑记录/index.html.vue"
const data = JSON.parse("{\"path\":\"/%E8%B8%A9%E5%9D%91%E8%AE%B0%E5%BD%95/\",\"title\":\"踩坑记录\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"踩坑记录\",\"article\":false,\"feed\":false,\"sitemap\":false,\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0,\"words\":1},\"filePathRelative\":null}")
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
