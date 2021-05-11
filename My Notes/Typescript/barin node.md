- Object

  - interface - Shape

    - `interfacec xxx {}`
    - optional property a?:string
    - arbitrary property [a: string]: any;
    - readonly property 只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候

  - interface extend interface

    `interface LightableAlarm extends Alarm{}`

  - implement - Behavior

    - class implement interface

      `class Car implements Alarm, Light{}`

      `class SecurityDoor extends Door implements Alarm {}`

  - interface extend class

  - 

- Array

  - Type+[] `let fibonacci: number[] = [1, 1, 2, 3, 5];` [Java](https://mubu.com/doc1JqsMdnHQPi)

  - Array Generic `let arr : Array<number> = []`

  - interface 一般用来表示Array-like Object

    ```tsx
    function sum() {
        let args: {
            [index: number]: number;
            length: number;
            callee: Function;
        } = arguments;
    }
    ```

    - IArguments
    - NodeList
    - HTMLCollection

- Function

  - Declaration

  - Expression

  - interface

    SearchFunc { (source: string, subString: string): boolean;}

- Declaration File

  - jQuery.d.ts

  - Global Variable Declaration

    - declare variable

      - declare `var jQuery: (selector: string) => any;`
      - declare let
      - declare const

    - declare function

    - declare class

      ```tsx
      declare class Animal {
          name: string;
          constructor(name: string);
          sayHi(): string;
      }
      ```

    - declare enum (Ambient Enum)

    - declare namespace

    - npm package

    Generics

    - 泛型约束

      ```tsx
      interface Lengthwise {
          length: number;
      }
      
      function loggingIdentity<T extends Lengthwise>(arg: T): T {
          console.log(arg.length);
          return arg;
      }
      ```

      - 相互约束

        ```tsx
        function copyFields<T extends U, U>(target: T, source: U): T {
            for (let id in source) {
                target[id] = (<T>source)[id];
            }
            return target;
        }
        
        let x = { a: 1, b: 2, c: 3, d: 4 };
        
        copyFields(x, { b: 10, d: 20 });
        ```

    - function

      `function createArray(length: number, value: any): Array<any> {`

      ```tsx
      **function createArray<T>(length: number, value: T): Array<T> {
          let result: T[] = [];
          for (let i = 0; i < length; i++) {
              result[i] = value;
          }
          return result;
      }
      
      createArray<string>(3, 'x'); // ['x', 'x', 'x']**
      ```

    - interface

      ```tsx
      interface CreateArrayFunc<T> {
          (length: number, value: T): Array<T>;
      }
      
      let createArray: CreateArrayFunc<any>;
      createArray = function<T>(length: number, value: T): Array<T> {
          let result: T[] = [];
          for (let i = 0; i < length; i++) {
              result[i] = value;
          }
          return result;
      }
      
      createArray(3, 'x'); // ['x', 'x', 'x']
      ```

    - class

      ```tsx
      class GenericNumber<T> {
          zeroValue: T;
          add: (x: T, y: T) => T;
      }
      
      let myGenericNumber = new GenericNumber<number>();
      myGenericNumber.zeroValue = 0;
      myGenericNumber.add = function(x, y) { return x + y; };
      ```

- Tuple

  数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象

- Enum

  `enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};`

  - Const enums - const

  - Ambient enums - declare

    常数枚举，外部 定义的类型只会用于编译时的 检查，编译结果中会被删除

- Type Alias

  类型别名与字符串字面量类型都是使用 type 进行定义

  类型别名有时和接口很像，但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型

  同接口一样，类型别名也可以是泛型 `type Container<T> = { value: T };`

  使用类型别名来在属性里引用自己：

  ```tsx
  type Tree<T> = {
      value: T;
      left: Tree<T>;
      right: Tree<T>;
  }
  ```

  - Type Vs Interface
    1. Interface 创建了新名字，而 type 并没有，所以错误信息不会使用别名
    2. alias不能被extends和 implements

  [interface type  ](https://www.notion.so/interface-type-503e3a8d089b4209921302594fd616f4)

  https://www.tslang.cn/docs/handbook/advanced-types.html

- 字符串字面量类型

- Intersection Types

------

