# 1 type annoation
## format
```javascript
let varName : varType = varValue;
```

## basic type
```
number,string,boolean,null,undefined,symbol(ES6)
```

- `any` ：变量声明但未赋值时未指定类型，默认为 `any` 类型

- 类型推断：如果变量声明的时候有赋值，则会根据值的类型推断出一个具体的类型

- 联合类型：多种类型之间可以组合  `let numOrStr: number | string; `

### void
用 `void` 表示没有任何返回值的函数
```typescript
function methodName () : void {}
```

声明一个 `void` 类型的变量没有什么用，因为你只能将它赋值为 `undefined` 和 `null`

`undefined` 和 `null` 是所有类型的子类型, 比如`undefined` 类型的变量，可以赋值给 `number` 类型的变

> 但是 `void` 类型的变量不能赋值给 `number` 类型的变量













# interface
`interface` 用来定义形状和约束，描述对象的类型


# Brief
## Type
6种基本类型：
- `number`
- `string`
- `boolean`
- `null`
- `undefined`
- ` Symble`