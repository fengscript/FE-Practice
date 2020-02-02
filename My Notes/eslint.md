建一个 `.eslintrc` 文件，写入规则：



```json
{
  "parserOptions": {
    "ecmaVersion": 8,
    "sourceType": "module"
  }
}
```



我碰到在 `koa` 里面，箭头函数报错：`Parsing error: Unexpected token =>eslint` ，然后通过上面方式 声明 `ecmaVersion`为 8 （即 `es7` ）可以解决