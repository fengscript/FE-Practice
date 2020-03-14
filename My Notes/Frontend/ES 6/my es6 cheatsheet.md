# Destruction

-

# Object

# Array

- Array.includes
- Array.from

# Function

# Number

# eslint

一个简单的 async 函数：

```js
async function fff() {
  const data = await funcAsync();
}
```

ESLint 会提示“Parsing error: Unexpected token function”。
原因是当前文件是按照 ES7 来解析的，而 async await 是 ES2017 或者 ES8 的产物，所以需要在 eslintrc 中设置：

```json
{
  "parserOptions": {
    "ecmaVersion": 8
  },
  "rules": {}
}
```

这样就应该没问题了。
