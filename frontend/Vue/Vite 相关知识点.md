# Vite 相关知识点

## 基础操作

创建 Vite + Vue 项目
```shell
# npm
npm create vite@latest my-vue-app -- --template vue

# yarn
yarn create vite my-vue-app --template vue

# pnpm
pnpm create vite my-vue-app --template vue
```

## 配置路径别名

通过修改 `vite.config.js` 文件 (如果使用了 ts 需要修改tsconfig.json)

```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000',// 后端接口
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    resolve: {
        alias: {
            // @ 替代为 src
            '@': resolve(__dirname, 'src'),
            // @component 替代为 src/component
            '@components': resolve(__dirname, 'src/components'),
        },
    },
})
```

```json
//  tsconfig.json
{
    "compilerOptions": {
            "baseUrl": "./",
            "paths": {
            "@/*": ["src/*"],
            "@components/*": ["src/components/*"],
        },
    },
}
```