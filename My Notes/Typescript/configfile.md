如果"files"和"include"都没有被指定，编译器默认包含当前目录和子目录下所有的TypeScript文件（.ts,.d.ts 和 .tsx）

- outDir 指定的目录下的文件永远会被编译器排除，除非你明确地使用"files"将其包含进来（这时就算用exclude指定也没用）

- files 指定一个包含相对或绝对文件路径的列表

  指定的文件却总是会被包含在内，不管"exclude"如何设置

- exclude 默认情况下会排除node_modules，bower_components，jspm_packages和<outDir>目录

- compilerOptions

- include exclude

引入的文件可以使用"exclude"属性过滤

```tsx
"include": [
        "src/**/*"
				或者
				"src"
    ],
    "exclude": [
        "node_modules",
        "**/*.spec.ts"
    ]
```

- `*` 匹配0或多个字符（不包括目录分隔符）

- `?` 匹配一个任意字符（不包括目录分隔符）

- `**/` 递归匹配任意子目录

- typeRoots 被指定的话，只有typeRoots下面的包才会被包含进来

  默认所有可见的"@types"包会在编译过程中被包含进来

- types 只有被列出来的包才会被包含进来

  ```tsx
  {
     "compilerOptions": {
          "types" : ["node", "lodash", "express"]
     }
  }
  ```

- types: `"types": []` 来禁用自动引入@types包

- extends 从另一个配置文件里继承配置

```tsx
{
  "extends": "./configs/base",
  "files": [
    "main.ts",
    "supplemental.ts"
  ]
}
```