import comp from "D:/Project/Other/cafe-public-notes/docs/.vuepress/.temp/pages/后端相关/golang/笔记___Go语言学习_并发.html.vue"
const data = JSON.parse("{\"path\":\"/%E5%90%8E%E7%AB%AF%E7%9B%B8%E5%85%B3/golang/%E7%AC%94%E8%AE%B0___Go%E8%AF%AD%E8%A8%80%E5%AD%A6%E4%B9%A0_%E5%B9%B6%E5%8F%91.html\",\"title\":\"并发\",\"lang\":\"zh-CN\",\"frontmatter\":{\"gitInclude\":[]},\"headers\":[{\"level\":2,\"title\":\"Go 协程\",\"slug\":\"go-协程\",\"link\":\"#go-协程\",\"children\":[]},{\"level\":2,\"title\":\"信道\",\"slug\":\"信道\",\"link\":\"#信道\",\"children\":[{\"level\":3,\"title\":\"带缓冲的信道\",\"slug\":\"带缓冲的信道\",\"link\":\"#带缓冲的信道\",\"children\":[]},{\"level\":3,\"title\":\"range 和 close\",\"slug\":\"range-和-close\",\"link\":\"#range-和-close\",\"children\":[]},{\"level\":3,\"title\":\"select 语句\",\"slug\":\"select-语句\",\"link\":\"#select-语句\",\"children\":[]},{\"level\":3,\"title\":\"sync.Mutex\",\"slug\":\"sync-mutex\",\"link\":\"#sync-mutex\",\"children\":[]}]}],\"readingTime\":{\"minutes\":3.83,\"words\":1149},\"filePathRelative\":\"后端相关/golang/[笔记]__Go语言学习_并发.md\"}")
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
