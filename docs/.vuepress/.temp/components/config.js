import { hasGlobalComponent } from "D:/Project/Other/cafe-public-notes/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.63_vuepress@2.0.0-rc.18_@vuepress+bundler-vite@2.0.0-rc.18_@types+n_smdqkjqqfzrv4yrpwzperojrry/node_modules/@vuepress/helper/lib/client/index.js";

import Badge from "D:/Project/Other/cafe-public-notes/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.60_sass-embedded@1.82.0_vuepress@2.0.0-rc.18_@vuepress+bu_egm7pndqw32kx72b2rpbrtsrqe/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";
import FontIcon from "D:/Project/Other/cafe-public-notes/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.60_sass-embedded@1.82.0_vuepress@2.0.0-rc.18_@vuepress+bu_egm7pndqw32kx72b2rpbrtsrqe/node_modules/vuepress-plugin-components/lib/client/components/FontIcon.js";

import "D:/Project/Other/cafe-public-notes/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.63_vuepress@2.0.0-rc.18_@vuepress+bundler-vite@2.0.0-rc.18_@types+n_smdqkjqqfzrv4yrpwzperojrry/node_modules/@vuepress/helper/lib/client/styles/sr-only.css";

export default {
  enhance: ({ app }) => {
    if(!hasGlobalComponent("Badge")) app.component("Badge", Badge);
    if(!hasGlobalComponent("FontIcon")) app.component("FontIcon", FontIcon);
    
  },
  setup: () => {

  },
  rootComponents: [

  ],
};
