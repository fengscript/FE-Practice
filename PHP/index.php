<?php
function test(){
  static $x = 0;
  echo $x;
  $x++;
}

test();

?>