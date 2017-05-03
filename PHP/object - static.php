<?php
class MyClass {
    const CONST_VALUE = 'A constant value';
    var $t = 'var property';
    var $q = 10;
    static $v = 'static property';
}

$classname = 'MyClass';

$a = new MyClass;
echo '1-'.$classname::CONST_VALUE."<br>"; // 自 PHP 5.3.0 起

echo '2-'.MyClass::CONST_VALUE."<br>";

echo '3-'.$a::CONST_VALUE."<br>";

echo '4-'.MyClass::$v."<br>";
// echo '5-'.$a -> $t;

// echo '6-'.$a :: $v;

// echo '7-'.$a->$q;


?>  