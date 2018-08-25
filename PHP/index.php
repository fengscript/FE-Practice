<?php
function test(){
  static $x = 0;
  echo $x;
  $x++;
}

test();

$a = "I'm a";
$b = "I'm b";
echo "</br>";
echo "I'm a","I'm b";
echo "</br>";
// array

$arr = array('time' => 100,'time'=>200);
print count($arr);

echo "</br>";
$arr2 = [1,2,3];
print($arr2);
echo "</br>";


?>