# CSS 技巧

## 透明图片实现阴影

```css
filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
```

使用filter属性就可以实现，不过这个属性不支持多重阴影。

## 将图标转换颜色

```css
filter: brightness(0) invert(14%) sepia(100%) saturate(7472%) hue-rotate(345deg) brightness(102%) contrast(104%);
```

同样可以使用filter属性实现，需要注意的是如果的原图片不是纯黑色的直接进行转换会出现色差，使用`brightness(0)`先将图片转换为黑色；还有需要注意的就是如果原图有复杂图案这个就不起作用了，只适用于图标；

