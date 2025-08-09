---
title: "TamperMonkey 插件开发"
category: WEB前端
subcategory: 浏览器
level: 8
zIndex: 60
tags:
  - ssg
  - vue
  - VuePress
---
# TamperMonkey 插件开发

开发油猴的本质其实就是在一个增强版的 JavaScript 进行一些特殊开发。


> [!tip] 参考
> 
> [油猴教程 | 油猴开发指南](https://learn.scriptcat.org/%E6%B2%B9%E7%8C%B4%E6%95%99%E7%A8%8B/)

## 自用脚本

知乎首页屏蔽相关文章
```js
// ==UserScript==
// @name         HappyZhihu
// @namespace    http://tampermonkey.net/
// @version      2025-07-16
// @description  zhihu index page keyword block articles
// @author       You
// @match        https://www.zhihu.com/
// @match        https://www.zhihu.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 要屏蔽的关键词
    const BLOCK_KEYWORDS = ['二游','二次元','B站'];
    // 目标问题的父容器选择器
    const QUESTION_CONTAINER_SELECTOR = '.ContentItem';
    // 标题元素选择器
    const TITLE_SELECTOR = '.ContentItem-title a';
    // 处理单个问题元素
    function processQuestionElement(element) {
        const titleElement = element.querySelector(TITLE_SELECTOR);
        if (titleElement) {
            const title = titleElement.textContent.trim();
            // 检查标题是否包含任意关键词
            if (BLOCK_KEYWORDS.some(keyword => title.includes(keyword))) {
                // 隐藏整个问题块，模拟广告屏蔽效果
                element.style.display = 'none';
                console.log(`已屏蔽问题: ${title}`);
            }
        }
    }
    // 处理所有可见的问题元素
    function processAllQuestions() {
        document.querySelectorAll(QUESTION_CONTAINER_SELECTOR).forEach(processQuestionElement);
    }
    // 页面加载完成后处理现有问题
    window.addEventListener('load', processAllQuestions);
    // 监听DOM变化，处理动态加载的内容
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // 确保是元素节点
                        if (node.matches(QUESTION_CONTAINER_SELECTOR)) {
                            processQuestionElement(node);
                        } else {
                            // 检查新增节点的子节点
                            node.querySelectorAll(QUESTION_CONTAINER_SELECTOR).forEach(processQuestionElement);
                        }
                    }
                });
            }
        });
    });
    // 开始观察DOM变化
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // 本人喜欢阅读纯文本内容，所以屏蔽了图片，可自行选择是否屏蔽
    console.log("CLICK NONE IMAGE")
    document.addEventListener('click', function () {
        document.querySelectorAll('img').forEach(item => console.log(item.style.opacity = 0));
    });
})();
```