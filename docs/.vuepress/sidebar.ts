import {sidebar} from "vuepress-theme-hope";

export default sidebar({
	"/": [
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
    ]
});