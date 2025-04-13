import { hopeTheme } from "vuepress-theme-hope";

// 我们默认导出了主题对象
export default hopeTheme({
    // 主题配置
    encrypt: {
        config: {
            "/shards/": ["queen"],
        }
    },
    // 全屏
    fullscreen: true,
    // 导航栏
    navbar: [
        {
            text: "DESCRIPTION",
            link: "/"
        },
        {
            text: "DIRECTORY",
            link: "/0_Collects/",
        },
    ],
    // 侧边栏
    // sidebar: [
    //     {
    //         text: "后端知识",
    //         link: "/backend/",
    //     },
    //     {
    //         text: "前端知识",
    //         link: "/frontend/",
    //     },
    //     {
    //         text: "运维知识",
    //         link: "/o_m/",
    //     },
    //     {
    //         text: "踩坑日志",
    //         link: "/bugs/",
    //     },
    //     {
    //         text: "理论基础",
    //         link: "/computers/",
    //     },
    // ],
    plugins: {
        search: true,
    },
    
});