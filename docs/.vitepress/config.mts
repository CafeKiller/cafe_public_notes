import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "咖啡de笔记站",
  description: "一个简易且对外公开的笔记仓库",
  lang: "zh-CN",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '前往首页', link: '/' },
      { text: '前端笔记', link: '/pages/front_end' },
      { text: '仓库引导', link: '/pages/introduction' }
    ],

    outline: {
      level: [2, 3],
      label: '本页目录'
    },

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' },
    //     ]
    //   }
    // ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
