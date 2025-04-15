import { hopeTheme } from "vuepress-theme-hope";
import sidebar from "./sidebar";

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
            text: "阅读提醒",
            link: "/"
        },
        {
            text: "基本目录",
            link: "/0_Collects/",
        },
    ],
    // 侧边栏
    sidebar: [
        {
            text: "收集箱",
            prefix: "/0_Collects/",
            children: 'structure',
        },
        {
            text: "知识箱",
            prefix: "/2_Chesses/",
            children: 'structure',
        },
        {
            text: "记录箱",
            prefix: "/3_Records/",
            children: "structure",
        },
    ],
    plugins: {
        search: true,
    },
    
});