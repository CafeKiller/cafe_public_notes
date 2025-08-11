---
title: ESLint 配置手册
category: WEB前端
subcategory: 工程质量
level: 10
tags:
  - ESlint
---

# ESLint 配置手册

ESLint 是一款强大检测并修复代码的工具，它能够实时检测并修复代码中的错误（you 配置的），确保你的代码风格一致、质量高，减少潜在的 bug。无论你是一个人开发还是团队协作，通过 ESLint，你可以：

- 实时提示：在你编写代码的同时，ESLint 插件会及时指出语法错误和风格问题，让你第一时间修正。
- 自动修复：配置自动修复配置后，ESLint 会在你保存文件时自动修复常见错误，如缩进、引号类型等，省时省力。
- 统一风格：通过 ESLint 配置，你和团队可以遵循一致的编码风格，提高代码的可读性和维护性。
- 减少错误：ESLint 能帮助你捕获未定义变量、未使用变量等潜在错误，降低 bug 发生的概率。

遵循你配置好的 ESLint 规则，能确保你的代码始终符合最佳状态，便于项目的长期维护和功能扩展。

> [!tip] 参考
> 
> [掘金 - ESlint配置流程](https://juejin.cn/post/7402572475719827475)
> 
> [ESLint 官方中文文档](https://zh-hans.eslint.org/docs/latest/use/getting-started)

## 项目安装

进入项目目录，安装 ESLint 及相关插件

*此处假设是个 vue3 项目*

```shell
cd vue3-project

npm install eslint eslint-plugin-vue --save-dev
```

注意：如果你的 eslint 版本 `>9.0.0`，需要确保 NodeJS 版本符合要求（如 `^18.18.0`、`^20.9.0` 或 `>=21.1.0`）。

## 初始化配置

使用以下命令初始化 ESLint 配置文件

```shell
npx eslint --init
```

在初始化过程中，ESLint 会问你一些问题来帮助生成适合你项目的配置文件。如下：

```shell
How would you like to use ESLint? …  # 您希望如何使用ESLint…
  To check syntax only  # 仅检查语法
❯ To check syntax and find problems  # 检查语法并发现问题
  To check syntax, find problems, and enforce code style # 检查语法、发现问题并强制执行代码样式
```

就这样，一步一步选择适合你项目的所需的配置。

```shell
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · vue
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ What format do you want your config file to be in? · JavaScript
The config that you've selected requires the following dependencies:

eslint-plugin-vue@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
? Would you like to install them now with npm? › No / Yes
```

生成的 .eslintrc.js 文件（eslint 大于等于 v9.0.0 版本会生成eslint.config.mjs，扁平配置格式），包含初始配置。

*下面是我配置 Vue3 项目时，eslint 自动生成的配置*：

```javascript
module.exports = {
    // 指定代码运行的环境
    "env": {
        "browser": true,  // 允许使用浏览器环境中的全局变量，如 window 和 document
        "es2021": true  // 支持 ECMAScript 2021 的语法
    },
    // 继承一些推荐的配置和规则集
    "extends": [
        "eslint:recommended",  // 继承 ESLint 的推荐规则
        "plugin:vue/essential",  // 继承 Vue 的基础规则集，适用于 Vue.js 项目
        "plugin:@typescript-eslint/recommended"  // 继承 TypeScript 的推荐规则集，适用于 TypeScript 项目
    ],
    // 解析器选项，定义如何解析不同的 ECMAScript 版本和模块
    "parserOptions": {
        "ecmaVersion": 12,  // 指定 ECMAScript 版本为 12（ES2021）
        "parser": "@typescript-eslint/parser",  // 使用 @typescript-eslint/parser 解析 TypeScript 代码
        "sourceType": "module"  // 指定使用 ES 模块的模块系统
    },
    // 插件部分，增加对 Vue 和 TypeScript 的支持
    "plugins": [
        "vue",  // 支持 Vue.js 代码的解析和校验
        "@typescript-eslint"  // 支持 TypeScript 代码的解析和校验
    ],
    // 自定义的规则配置（当前为空，但可以添加自定义规则）
    "rules": {
        // 例如： "semi": ["error", "always"] 强制要求语句以分号结束
    }
};
```

## 配置 ESLint

在 `.eslintrc.js` 文件中添加更丰富的 ESLint 配置。以下是一个更完整的示例：

```javascript
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true, // 指定此配置文件为根配置，ESLint 将不会查找父目录中的配置文件
    env: {
        node: true, // 启用 Node.js 环境
        browser: true, // 启用浏览器环境
        es2021: true // 启用 ES2021 的全新语法
    },
    extends: [
        'plugin:vue/vue3-essential', // 基本 Vue 3 规则
        'eslint:recommended', // ESLint 推荐的规则
        '@vue/eslint-config-typescript', // Vue + TypeScript 的 ESLint 配置
        '@vue/eslint-config-prettier/skip-formatting' // 与 Prettier 兼容的 ESLint 配置，跳过格式化规则
    ],
    overrides: [
        {
            files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'], // 对 Cypress 测试文件的特定规则
            extends: ['plugin:cypress/recommended'] // 启用 Cypress 的推荐规则
        }
    ],
    parserOptions: {
        ecmaVersion: 2021, // 支持 ECMAScript 2021 的语法
        sourceType: 'module' // 使用 ES 模块的语法
    },
    rules: {
        // 代码风格规则
        'semi': [2, 'never'], // 不使用分号
        'indent': [
            2,
            4,
            { SwitchCase: 1 } // switch 语句中的 case 分支使用 1 个空格缩进
        ],
        'no-multi-spaces': 2, // 不允许多个连续的空格
        'space-unary-ops': [2, { words: true, nonwords: false }], // 一元运算符后必须有空格
        'space-infix-ops': 2, // 中缀操作符周围必须有空格
        'space-before-blocks': [2, 'always'], // 代码块前必须有空格
        'no-mixed-spaces-and-tabs': 2, // 不允许混合使用空格和制表符
        'no-multiple-empty-lines': [2, { max: 1 }], // 连续空行不超过 1 行
        'no-trailing-spaces': 2, // 行尾不允许有空格
        'no-whitespace-before-property': 2, // 属性名和点运算符之间不能有空格
        'no-irregular-whitespace': 2, // 不允许出现不规则的空白字符
        'space-in-parens': [2, 'never'], // 圆括号内不能有空格
        'comma-dangle': [2, 'never'], // 逗号不允许有拖尾
        'array-bracket-spacing': [2, 'never'], // 数组括号内不允许有空格
        'object-curly-spacing': [2, 'never'], // 对象括号内不允许有空格
        'max-len': ['error', { code: 120 }], // 行宽最大为 120 字符
        'operator-linebreak': [2, 'before'], // 运算符换行时，运算符在行首
        'comma-style': [2, 'last'], // 逗号风格：换行时在行尾
        'no-extra-semi': 2, // 不允许出现多余的分号
        'curly': [2, 'all'], // 使用大括号包裹所有控制结构
        'key-spacing': [2, { beforeColon: false, afterColon: true }], // 属性名与冒号之间不能有空格，冒号后必须有空格
        'comma-spacing': [2, { before: false, after: true }], // 逗号后必须有空格
        'semi-spacing': [2, { before: false, after: true }], // 分号后必须有空格
        'camelcase': [1, { properties: 'always' }], // 强制使用驼峰命名法
        'new-cap': ['error', { newIsCap: true, capIsNew: false }], // 构造函数首字母必须大写
        'spaced-comment': [2, 'always'], // 注释后必须有空格
        'no-inline-comments': 2, // 不允许行内注释
        'eqeqeq': [2, 'always', { null: 'ignore' }], // 强制使用全等 (===) 运算符
        'no-else-return': [1, { allowElseIf: false }], // 禁止 else 语句，如果 if 语句中已返回值
        'no-loop-func': 2, // 禁止在循环中定义函数
        'no-restricted-syntax': [
            1,
            {
                selector: 'BinaryExpression[operator=\'instanceof\']',
                message: 'Use \'instanceof\' for object type detection.' // 不建议使用 instanceof 来检测对象类型
            },
            {
                selector: 'BinaryExpression[operator=\'typeof\']',
                message: 'Use \'typeof\' for type detection.' // 不建议使用 typeof 来检测类型
            },
            {
                selector: 'CallExpression[callee.name=\'parseInt\']',
                message: 'Use Math.floor, Math.round, or Math.ceil instead of parseInt to remove decimal points.' // 不建议使用 parseInt 来移除小数点
            }
        ],
        'no-implicit-coercion': [1, { allow: ['!!'] }], // 禁止隐式类型转换
        'radix': [2, 'always'], // parseInt 函数必须指定进制
        'quotes': [2, 'single'], // 强制使用单引号
        'no-array-constructor': 2, // 不允许使用 Array 构造函数
        'max-lines-per-function': [
            1,
            {
                max: 50, // 函数最大行数为 50 行
                skipComments: true, // 跳过注释行
                skipBlankLines: true, // 跳过空行
                IIFEs: true // 对立即调用的函数表达式 (IIFE) 应用规则
            }
        ],
        'max-params': [1, 6], // 函数参数最大数量为 6
        'no-eval': 2, // 禁止使用 eval
        'prefer-const': 1, // 建议使用 const 声明不变的变量
        'no-var': 1, // 建议使用 let/const 替代 var
        'prefer-destructuring': [
            1,
            { object: true, array: false } // 建议使用解构赋值
        ],
        'prefer-template': 1, // 建议使用模板字符串
        'template-curly-spacing': [2, 'never'], // 模板字符串中的花括号内不允许有空格
        'no-duplicate-imports': 2, // 禁止重复导入
        // TypeScript 特定规则
        '@typescript-eslint/no-unused-vars': 'error', // 禁止未使用的变量
        '@typescript-eslint/explicit-module-boundary-types': 'off' // 允许省略函数的返回类型
    },
    globals: {
        withDefaults: true, // Vue 3 特性
        defineExpose: true, // Vue 3 特性
        defineEmits: true, // Vue 3 特性
        defineProps: true // Vue 3 特性
    }
}
```

如果想添加更丰富的配置，见[官网 ESLint 配置](https://eslint.org/docs/latest/use/configure/)或者[中文网 ESLint 配置](https://eslint.nodejs.cn/docs/latest/use/configure/)。

> 注意，这里也是可以通过 node 环境判断是否执行某些配置。如 `process.env.NODE_ENV === 'production' ? 'error' : 'off',`

## 执行 ESLint 检查

你可以在 package.json 文件中添加以下脚本，以便在本地开发或构建时运行 ESLint：

```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.mjs,.cjs,.ts,.vue",
    "lint:fix": "eslint . --ext .js,.mjs,.cjs,.ts,.vue --fix"
  }
}
```

使用以下命令来检查和修复代码

```shell
npm run lint
npm run lint:fix
```

> 注意：ESLint 的 `--fix` 选项只能自动修复那些被标记为「可自动修复」的规则错误，例如代码格式化、简单的语法修正等。但对于一些复杂的规则，`--fix` 无法处理，需要手动修复这些问题。

## 其他集成

接下来，我们将探讨如何在 Vite 和 Webpack 中集成 ESLint，并确保在 CI/CD 流程中始终保持代码的高质量。

> [!DANGER] 注意
>
> 这部分配置可能稍显复杂，因为它可能涉及依赖版本、Node 版本等问题。如果你觉得麻烦，配置到 Git Hooks 即可满足大部分项目的需求。

### Vite 集成

在 Vite 项目中，我们可以使用 vite-plugin-eslint 插件，这样不仅可以在开发过程中进行代码检查，还可以在打包时进行验证。

首先，安装插件：

```bash
npm install vite-plugin-eslint --save-dev
```

然后在 vite.config.js 中进行配置

```js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
    plugins: [
        vue(),
        eslintPlugin({
            // 可以在这里传入自定义配置
            // 默认会读取项目中的 .eslintrc.js 文件
        })
    ]
});
```

你也可以直接配置插件的选项

```js
eslintPlugin({
    include: ['src/**/*.js', 'src/**/*.vue', 'src/**/*.ts'],  // 指定要检查的文件和目录。
    exclude: ['node_modules/**', 'dist/**'], // 排除不需要检查的文件和目录。
    fix: true,  // 在保存文件时自动修复 ESLint 问题。
    cache: false // 禁用 ESLint 缓存，以便每次都执行完整检查。
})
```

注意：千万不要小瞧这个`include`、`exclude`，这两个配置可以帮助我们在老项目中，检查和自动修复分批进行（老项目文件太多，不规范的更多）。

通过这种方式，你不仅能在开发阶段发现并修复代码问题，还能在打包时确保代码的质量。

### Webpack 集成

在 Webpack 项目中，可以使用 eslint-webpack-plugin 插件。这能够让 ESLint 在每次构建时检查代码，并根据需要自动修复问题。

首先，安装插件

```sh
npm install eslint-webpack-plugin --save-dev
```

接着在 `webpack.config.js` 中配置

```js
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    // 其他 Webpack 配置
    plugins: [
        new ESLintPlugin({
            extensions: ['js', 'vue', 'ts'], // 指定要检查的文件类型
            fix: true, // 启用自动修复功能
            cache: true, // 启用缓存，提高检查性能
            exclude: 'node_modules', // 排除的目录
            failOnError: true, // 如果有错误则使构建失败
        })
    ]
};
```

通过这种方式，无论是开发还是生产环境的构建，都能确保代码质量不会下降。

> 注意：如果的项目是 Vue2，并且是 Vue-Cli 搭建的项目，可以通过配置lintOnSave 来决定是否在保存文件时自动触发代码检查。 配置如下
>
> ```js
> module.exports = {
>   lintOnSave: true,  // true 开启保存时自动 lint；false 关闭
>   // publicPath: process.env.VUE_APP_ENV === 'prod' ? '' || '/',
>   // css: {},
>   // chainWebpack: {},
>   // devServer: {}
> }
> ```

### CI/CD 集成

在持续集成/持续交付（CI/CD）流程中，集成 ESLint 是确保代码质量的重要一环。

以下是如何在 GitHub Actions 和 GitLab CI 中集成 ESLint：

```yaml
# GitHub Actions
name: CI

on: [push, pull_request]

jobs:
  lint:
    name: Lint Code Base
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Dependencies
        run: npm install
      - name: Run ESLint
        run: npm run lint


# GitLab CI
stages:
  - lint

eslint:
  stage: lint
  script:
    - npm install
    - npm run lint
```

通过在 CI/CD 流程中集成 ESLint，可以在每次提交或合并请求时自动检查代码，确保代码符合团队的编码标准。