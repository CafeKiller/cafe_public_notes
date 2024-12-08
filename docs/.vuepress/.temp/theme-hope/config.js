import { HopeIcon, Layout, NotFound, injectDarkmode, setupDarkmode, setupSidebarItems, scrollPromise } from "D:/Project/Other/cafe-public-notes/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.61_markdown-it@14.1.0_sass-embedded@1.82.0_vuepress@2.0.0-rc.18__nrdkgcgt5filjwmzj7km2546z4/node_modules/vuepress-theme-hope/lib/bundle/export.js";

import { defineCatalogInfoGetter } from "D:/Project/Other/cafe-public-notes/node_modules/.pnpm/@vuepress+plugin-catalog@2.0.0-rc.63_vuepress@2.0.0-rc.18_@vuepress+bundler-vite@2.0.0-rc.18__jxahiziijovta6v3tgicupwp2i/node_modules/@vuepress/plugin-catalog/lib/client/index.js"
import { h } from "vue"

import "D:/Project/Other/cafe-public-notes/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.63_vuepress@2.0.0-rc.18_@vuepress+bundler-vite@2.0.0-rc.18_@types+n_smdqkjqqfzrv4yrpwzperojrry/node_modules/@vuepress/helper/lib/client/styles/colors.css";
import "D:/Project/Other/cafe-public-notes/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.63_vuepress@2.0.0-rc.18_@vuepress+bundler-vite@2.0.0-rc.18_@types+n_smdqkjqqfzrv4yrpwzperojrry/node_modules/@vuepress/helper/lib/client/styles/normalize.css";
import "D:/Project/Other/cafe-public-notes/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.63_vuepress@2.0.0-rc.18_@vuepress+bundler-vite@2.0.0-rc.18_@types+n_smdqkjqqfzrv4yrpwzperojrry/node_modules/@vuepress/helper/lib/client/styles/sr-only.css";
import "D:/Project/Other/cafe-public-notes/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.61_markdown-it@14.1.0_sass-embedded@1.82.0_vuepress@2.0.0-rc.18__nrdkgcgt5filjwmzj7km2546z4/node_modules/vuepress-theme-hope/lib/bundle/styles/all.scss";

defineCatalogInfoGetter((meta) => {
  const title = meta.t;
  const shouldIndex = meta.I !== false;
  const icon = meta.i;

  return shouldIndex ? {
    title,
    content: icon ? () =>[h(HopeIcon, { icon }), title] : null,
    order: meta.O,
    index: meta.I,
  } : null;
});

export default {
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;

    router.options.scrollBehavior = async (...args) => {
      await scrollPromise.wait();

      return scrollBehavior(...args);
    };

    // inject global properties
    injectDarkmode(app);

    // provide HopeIcon as global component
    app.component("HopeIcon", HopeIcon);


  },
  setup: () => {
    setupDarkmode();
    setupSidebarItems();

  },
  layouts: {
    Layout,
    NotFound,

  }
};
