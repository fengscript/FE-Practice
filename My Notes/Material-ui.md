# css override

有时候，使用 `jss` 插入的样式优先级不够被自带样式覆盖的话，可以使用 `style` 属性来继续覆盖：
[inline-style](https://material-ui.com/customization/overrides/#overriding-with-inline-style)

> Every component provides a style property. These properties are always applied to the root element.

```javascript
// We can use inline-style
const style = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
};

function InlineStyle() {
  return <Button style={style}>inline-style</Button>;
}
```

