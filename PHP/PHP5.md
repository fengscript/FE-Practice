# 1 variable
$ 定义一个变量

没有声明命令，创建时候就要赋值

## 作用域
- local
- global
- static
- parameter

在所有函数外部定义的变量，拥有全局作用域。

除了函数外，全局变量可以被脚本中的任何部分访问，要在一个函数中访问一个全局变量，需要使用 `global`关键字。

在 PHP 函数内部声明的变量是局部变量，仅能在函数内部访问

可以在不同函数中使用相同的变量名称，因为这些函数内定义的变量名是局部变量，只作用于该函数内

### global
函数内部使用 global 关键字调用函数外定义的全局变量



PHP 将所有全局变量存储在一个名为 `$GLOBALS[index]` 的数组中。 `index`保存变量的名称。这个数组可以在函数内部访问，也可以直接用来更新全局变量。

```php
<?php
$x=5;
$y=10;

function myTest()
{
    global $x,$y;
    $y=$x+$y;
}
 
myTest();

// or
function myTest()
{
$GLOBALS['y']=$GLOBALS['x']+$GLOBALS['y'];
} 

myTest();
echo $y;
?>
```
### Static
当一个函数完成时，它的所有变量通常都会被删除

`static` 声明的变量会保留函数前一次被调用时的值

### 参数作用域
参数是通过调用代码将值传递给函数的局部变量

参数是在参数列表中声明的，作为函数声明的一部分
```php
<?php

function myTest($x)
{
echo $x;
}

myTest(5);

?>
```

## 常量
常量值被定义后，常量在整个脚本中都可以使用，在脚本的其他任何地方都不能被改变

设置常量，使用 define() 函数：

```php
define ( string $name , mixed $value [, bool $case_insensitive = false ] )
```
- name：必选参数，常量名称，即标志符。
- value：必选参数，常量的值。
- case_insensitive ：可选参数，如果设置为 TRUE，该常量则大小写不敏感。默认是大小写敏感的。
  如：
```
<?php
define("GREETING", "欢迎访问 Runoob.com");
 
function myTest() {
    echo GREETING;
}
 
myTest();    // 输出 "欢迎访问 Runoob.com"
?>
```


### 并置运算符

`.` 链接两个字符串

## 超级全局变量
- $GLOBALS
- $_SERVER
- $_REQUEST 用于收集 HTML 表单提交的数据。
- $_POST
- $_GET
- $_FILES
- $_ENV
- $_COOKIE
- $_SESSION



## 魔术变量

PHP 向它运行的任何脚本提供了大量的预定义常量。

1 `__LINE__` 	当前行号

2  `__FILE__`	文件的完整路径和文件名

3 `__DIR__`	文件所在目录  等价于 `dirname(__FILE__)`



# 2 数据类型
String（字符串）, Integer（整型）, Float（浮点型）, Boolean（布尔型）, Array（数组）, Object（对象）, NULL（空值）

` var_dump() `函数返回变量的数据类型和值

# 3 Array
- 数值数组
- 关联数组
- 多维数组

关联数组：
指定 键值对。

创建：
```php
$age=array("Peter"=>"35","Ben"=>"37","Joe"=>"43");

// 或者
$age['Peter']="35";
$age['Ben']="37";
$age['Joe']="43";

```

### 数组方法
- **count()** 返回数组中元素个数
```php
$temp = count($arrayName);
echo $temp;
```
- **list()** 返回数组中元素个数
- **range()**
- **sort()**
- **array_map()** 将用户自定义函数作用到数组中的每个值上，并返回用户自定义函数作用后的带有新值的数组。

```PHP
array_map(myfunction,array1,array2,array3...)
```
回调函数接受的参数数目应该和传递给 array_map() 函数的数组数目一致。
如：
```php
function myfunction($v1,$v2)
{
if ($v1===$v2)
  {
  return "same";
  }
return "different";
}

$a1=array("Horse","Dog","Cat");
$a2=array("Cow","Dog","Rat");
print_r(array_map("myfunction",$a1,$a2));
```
> 下面这个我暂时没有想明白：
> ```PHP
> $a1=array("Dog","Cat");
> $a2=array("Puppy","Kitten");
> print_r(array_map(null,$a1,$a2));
> ```

得到：
```php
Array
(
    [0] => Array
        (
            [0] => Dog
            [1] => Puppy
        )

    [1] => Array
        (
            [0] => Cat
            [1] => Kitten
        )

 )
```

# 4 String
- **strlen()**

- **addcslashes()** 返回在指定字符前添加反斜杠的字符串。

- **addslashes()** 函数返回在预定义字符之前添加反斜杠的字符串。
    > 该函数可用于为存储在数据库中的字符串以及数据库查询语句准备字符串。
    > 默认地，PHP 对所有的 GET、POST 和 COOKIE 数据自动运行 addslashes()。
    > 所以不应对已转义过的字符串使用 addslashes()，因为这样会导致双层转义。遇到这种情况时可以使用函数 get_magic_quotes_gpc() 进行检测。

- **strpos()** 用于检索字符串内指定的字符或文本。

- **chop()**  函数移除字符串右端的空白字符或其他预定义字符。

    - **ltrim()**  移除左边字符
    - **rtrim()**  移除右边字符

- **convert_uuencode()** 使用 uuencode 算法对字符串编码确保数据库存储和网络传输安全 **convert_uudecode()**  解码

- **explode()** 字符串打乱为数组
    > `explode(" ",$str)`

- **crypt()**　单向加密

- **htmlentities()** 函数把字符转换为 HTML 实体
    - **html_entity_decode()**

- **implode() / join() ** 返回由数组元素组合成的字符串

    - `implode(separator,array)`









# 5 函数
函数名对大小写不敏感。

## 默认参数
```php
<?php
function setHeight($minheight=50) {
  echo "The height is : $minheight <br>";
}

setHeight(350);
setHeight(); // 将使用默认值 50
?>
```

# 6 对象
必须使用 `class` 关键字声明类对象

然后在类中定义数据类型，然后在实例化的类中使用数据类型

类是可以包含属性和方法的结构
```php
<?php
class Car
{
  var $color;
  function Car($color="green") {
    $this->color = $color;
  }
  function what_color() {
    return $this->color;
  }
}
?>
```
关键字 `$this` 就是指向当前对象实例的指针




## Object
### define
```PHP
class phpClass {
  var $var1;
  var $var2 = "constant string";
  
  function myfunc ($arg1, $arg2) {
     [..]
  }
  [..]
}
```

1. 类使用 class 关键字后加上类名定义
2. 类的变量使用 var 来声明
3. 类的函数只能通过该类及其实例化的对象访问
4. 用 `new` 来实例化类的对象

### 访问
对类实例化出对象，对象调用成员方法，成员方法只能操作该对象的成员变量

` -> `来访问成员方法和成员变量

`::` 范围解析符，用于访问静态成员，类常量，还可以用于覆盖类中的属性和方法。

可以通过变量来引用类，该变量的值不能是关键字（如 self，parent 和 static），该变量值为字符串形式的类名：
```PHP
class MyClass {
    const CONST_VALUE = 'A constant value';
}

$classname = 'MyClass';
```



### 构造函数

用来在创建对象时初始化对象， **即为对象成员变量赋初始值**，总与new运算符一起使用在创建对象的语句中。

```
void __construct ([ mixed $args [, $... ]] )
```

如：

```php
function __construct( $par1, $par2 ) {
   $this->url = $par1;
   $this->title = $par2;
}
```



### destructor

析构函数 − 析构函数(destructor) 与构造函数相反，当对象结束其生命周期时（例如对象所在的函数已调用完毕），系统自动执行析构函数。如在建立对象时用new开辟了一片内存空间，应在退出前在析构函数中用delete释放。

```
void __destruct ( void )
```

如：

```php
<?php
class MyDestructableClass {
   function __construct() {
       print "构造函数\n";
       $this->name = "MyDestructableClass";
   }

   function __destruct() {
       print "销毁 " . $this->name . "\n";
   }
}

$obj = new MyDestructableClass();
?>
//输出
构造函数
销毁 MyDestructableClass
```



### 继承

PHP 使用关键字 extends 来继承一个类，PHP 不支持多继承：
```PHP
class Child extends Parent {
   // 代码部分
}
```



### override

从父类继承的方法不能满足子类的需求，可以对其进行改写，即方法重写（override）



### 访问控制

PHP 对属性或方法的访问控制，是通过在前面添加关键字 public（公有），protected（受保护）或 private（私有）来实现的。
- public（公有）：公有的类成员可以在任何地方被访问。
- protected（受保护）：受保护的类成员则可以被其自身以及其子类和父类访问。
- private（私有）：私有的类成员则只能被其定义所在的类访问。

**类属性必须定义为公有，受保护，私有之一。**如果用 var 定义，则被视为公有。



如果没有指定访问控制，属性和方法默认为公有。



可以对 public 和 protected 进行重定义，但 private 而不能

这个可以多想想：

```php
class Bar 
{
    public function test() {
        $this->testPrivate();
        $this->testPublic();
    }

    public function testPublic() {
        echo "Bar::testPublic\n";
    }
    
    private function testPrivate() {
        echo "Bar::testPrivate\n";
    }
}

class Foo extends Bar 
{
    public function testPublic() {
        echo "Foo::testPublic\n";
    }
    
    private function testPrivate() {
        echo "Foo::testPrivate\n";
    }
}

$myFoo = new foo();
$myFoo->test(); // Bar::testPrivate 
                // Foo::testPublic
?>
```




### 接口
`interface` 可以指定某个类必须实现哪些方法，但不需要定义这些方法的具体内容。

接口是通过 `interface` 关键字来定义的，和定义一个标准的类一样，但其中定义所有的方法都是空的。

接口中定义的所有方法都必须是公有，这是接口的特性。

要实现一个接口，使用 `implements `操作符。类中必须实现接口中定义的所有方法，否则会报一个致命错误。

类可以实现多个接口，用逗号来分隔多个接口的名称。

```PHP
<?php

// 声明一个'iTemplate'接口
interface iTemplate
{
    public function setVariable($name, $var);
    public function getHtml($template);
}


// 实现接口
class Template implements iTemplate
{
    private $vars = array();
  
    public function setVariable($name, $var)
    {
        $this->vars[$name] = $var;
    }
  
    public function getHtml($template)
    {
        foreach($this->vars as $name => $value) {
            $template = str_replace('{' . $name . '}', $value, $template);
        }
 
        return $template;
    }
}
```

### 属性常量
可以把在类中始终保持不变的值定义为常量

在定义和使用常量的时候不需要使用 `$` 符号

使用 `const`定义常量



### 抽象类
任何一个类，**如果它里面至少有一个方法是被声明为抽象的**，那么这个类就必须被声明为抽象的。

**定义为抽象的类不能被实例化。**

被定义为抽象的方法只是声明了其调用方式（参数），不能定义其具体的功能实现。

继承一个抽象类的时候，子类必须定义父类中的所有抽象方法；这些方法的访问控制必须和父类中一样（或者更为宽松）。

如某个抽象方法被声明为受保护的，那么子类中实现的方法就应该声明为受保护的或者公有的，而不能定义为私有的。此外方法的调用方式必须匹配，即类型和所需参数数量必须一致。

```PHP
<?php
abstract class AbstractClass
{
 // 强制要求子类定义这些方法
    abstract protected function getValue();
    abstract protected function prefixValue($prefix);

    // 普通方法（非抽象方法）
    public function printOut() {
        print $this->getValue() . PHP_EOL;
    }
}

class ConcreteClass1 extends AbstractClass
{
    protected function getValue() {
        return "ConcreteClass1";
    }

    public function prefixValue($prefix) {
        return "{$prefix}ConcreteClass1";
    }
}

class ConcreteClass2 extends AbstractClass
{
    public function getValue() {
        return "ConcreteClass2";
    }

    public function prefixValue($prefix) {
        return "{$prefix}ConcreteClass2";
    }
}

$class1 = new ConcreteClass1;
$class1->printOut();
echo $class1->prefixValue('FOO_') . PHP_EOL;

$class2 = new ConcreteClass2;
$class2->printOut();
echo $class2->prefixValue('FOO_') . PHP_EOL;
?>
//输出
ConcreteClass1
FOO_ConcreteClass1
ConcreteClass2
FOO_ConcreteClass2
```

### 关键字

#### $this self parent

**$this 指向当前对象**

> this是在实例化的时候来确定指向谁



**self 指向当前类本身**

self 是不指向任何已经实例化的对象，一般 self 使用来指向类中的静态变量

如：

```php
function showConstant() {
  echo  self::constant . PHP_EOL;
}
```

**parent是指向父类的指针**



#### static
**声明类属性或方法为 `static`，就可以不实例化类而直接访问。**

静态属性不能通过一个类已实例化的对象来访问（但静态方法可以）。

静态方法不需要通过对象即可调用，所以伪变量 $this 在静态方法中不可用，可以用 `self`关键字调用

静态属性不可以由对象通过 `->` 操作符来访问

就像其它所有的 PHP 静态变量一样，静态属性只能被初始化为文字或常量，不能使用表达式。所以可以把静态属性初始化为整数或数组，但不能初始化为另一个变量或函数返回值，也不能指向一个对象。

可以用一个变量来动态调用类。但该变量的值不能为关键字 self，parent 或 static。
```PHP
<?php
class Foo {
  public static $my_static = 'foo';
  
  public function staticValue() {
     return self::$my_static;
  }
}

print Foo::$my_static . PHP_EOL;
$foo = new Foo();

print $foo->staticValue() . PHP_EOL;
?>
```
#### final
如果父类中的方法被声明为 final，则子类无法覆盖该方法。如果一个类被声明为 final，则不能被继承。



### 调用父类构造方法
PHP 不会在子类的构造方法中自动的调用父类的构造方法。

要执行父类的构造方法，需要在子类的构造方法中调用 `parent::__construct()`
```PHP
class BaseClass {
   function __construct() {
       print "BaseClass 类中构造方法" . PHP_EOL;
   }
}
class SubClass extends BaseClass {
   function __construct() {
       parent::__construct();  // 子类构造方法不能自动调用父类的构造方法
       print "SubClass 类中构造方法" . PHP_EOL;
   }
}
class OtherSubClass extends BaseClass {
    // 继承 BaseClass 的构造方法
}

// 调用 BaseClass 构造方法
$obj = new BaseClass();

// 调用 BaseClass、SubClass 构造方法
$obj = new SubClass();

// 调用 BaseClass 构造方法
$obj = new OtherSubClass();
```


## Null



# 7 namespace

v 5.3 +

PHP 命名空间可以解决以下两类问题：

1. 用户编写的代码与PHP内部的类/函数/常量或第三方类/函数/常量之间的名字冲突。
2. 为很长的标识符名称(通常是为了缓解第一类问题而定义的)创建一个别名（或简短）的名称，提高源代码的可读性。



## 定义

```
< ?php  
// 定义代码在 'MyProject' 命名空间中  
namespace MyProject;  
 
// ... 代码 ...  
```

**如果一个文件中包含命名空间，它必须在其它所有代码之前声明命名空间。**

> 第一个命名空间前面，必须没有任何除了 declare 语句之外的代码



**在声明命名空间之前唯一合法的代码是用于定义源文件编码方式的 declare 语句。所有非 PHP 代码包括空白符都不能出现在命名空间的声明之前。**

**可以在同一个文件中定义不同的命名空间代码**



## 子命名空间

PHP 命名空间允许指定层次化的命名空间的名称

```
namespace MyProject\Sub\Level;  //声明分层次的单个命名空间
```



## 使用

1. **非限定名称，或不包含前缀的类名称**
2. **限定名称,或包含前缀的名称**
3. **完全限定名称，或包含了全局前缀操作符的名称**

具体如下：

```PHP
/*
*file1.php
*/
<?php
namespace Foo\Bar\subnamespace; 

const FOO = 1;
function foo() {}
class foo
{
    static function staticmethod() {}
}

  
/*
*file2.php 
*/

<?php
namespace Foo\Bar;
include 'file1.php';

const FOO = 2;
function foo() {}
class foo
{
    static function staticmethod() {}
}

/* 非限定名称 */
foo(); // 解析为 Foo\Bar\foo resolves to function Foo\Bar\foo
foo::staticmethod(); // 解析为类 Foo\Bar\foo的静态方法staticmethod。resolves to class Foo\Bar\foo, method staticmethod
echo FOO; // resolves to constant Foo\Bar\FOO

/* 限定名称 */
subnamespace\foo(); // 解析为函数 Foo\Bar\subnamespace\foo
subnamespace\foo::staticmethod(); // 解析为类 Foo\Bar\subnamespace\foo,
                                  // 以及类的方法 staticmethod
echo subnamespace\FOO; // 解析为常量 Foo\Bar\subnamespace\FOO
                                  
/* 完全限定名称 */
\Foo\Bar\foo(); // 解析为函数 Foo\Bar\foo
\Foo\Bar\foo::staticmethod(); // 解析为类 Foo\Bar\foo, 以及类的方法 staticmethod
echo \Foo\Bar\FOO; // 解析为常量 Foo\Bar\FOO
```



访问任意全局类、函数或常量，都可以使用完全限定名称，例如 \strlen() 或 \Exception 或 \INI_ALL。

PHP支持两种抽象的访问当前命名空间内部元素的方法，`__NAMESPACE__ `魔术常量和`namespace`关键字。

关键字 namespace 可用来显式访问当前命名空间或子命名空间中的元素。它等价于类中的 self 操作符。











# others
## write
- echo - 可以输出一个或多个字符串，无返回值
- print - 只允许输出一个字符串，返回值总为 1

echo ， print 都是一个语言结构，使用的时候可以不用加括号，也可以加上括号： echo 或 echo()。


`echo` 可以输出变量：
```php
<?php
$txt1="学习 PHP";
$txt2="RUNOOB.COM";
$cars=array("Volvo","BMW","Toyota");

echo $txt1;
echo "<br>";
echo "在 $txt2 学习 PHP ";
echo "<br>";
echo "我车的品牌是 {$cars[0]}";
?>
```

## 编码方式
```PHP
declare(encoding='UTF-8');
```