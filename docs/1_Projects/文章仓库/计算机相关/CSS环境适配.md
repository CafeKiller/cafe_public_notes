# 系统环境

## 深色主题

```css
@media (prefers-color-scheme: dark) {
    /* 深色主题的样式 */
    html {
        --color-text: #ffffff;
        --bg-color: #1d2025;
        --theme-color: deepskyblue;
    }
}
```

或者也可以使用 Javascript 脚本监听

```js
const theme = window.matchMedia("(prefers-color-scheme: dark)");
if (theme.matches) {
    document.body.classList.add("dark");
}

// 监听主题变化
theme.addEventListener("change", (e) => {
    if (e.matches) {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }
});
```

## 横竖屏切换

```css
@media screen and (orientation: portrait) {
    /* 竖屏样式 */
}

@media screen and (orientation: landscape) {
    /* 横屏样式 */
}
```

使用 javascript 监听

```js
const screen = window.matchMedia("(orientation: portrait)");
if (screen.matches) {
    // 竖屏
} else {
    // 横屏
}

// 监听屏幕变化
screen.addEventListener("change", (e) => {
    if (e.matches) {
        // 竖屏
    } else {
        // 横屏
    }
});
```
