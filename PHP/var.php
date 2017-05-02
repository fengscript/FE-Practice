<?php

  function myTest()
{
static $x=0;
echo $x;
$x++;
echo "<br>";
}

myTest();
myTest();
myTest();
// 

$a = 10;
var_dump($a);

$cars=array("Volvo","BMW","Toyota");
var_dump($cars);

// 
$b = array(1,2,3);
foreach ($b as $key => $value) {
  echo "key-".$key."value-".$value."<br>";
}

// 常量
define('name', 'fengyanggang');
echo name;

// 数组
$cars=array("Volvo","BMW","Toyota");
$arrlength=count($cars);
 
for($x=0;$x<$arrlength;$x++)
{
    echo $cars[$x];
    echo "<br>";
}

$age=array("Peter"=>"35","Ben"=>"37","Joe"=>"43");
echo "Peter is " . $age['Peter'] . " years old.";








?>