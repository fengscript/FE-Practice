<?php
$dbhost = 'localhost:3360';
$dbusr = 'root';
$dbpwd = '';
$con = mysqli_connect($dbhost, $dbusr, $dbpwd);
if(! $con){
  die('could not connect:'.mysqli_error());
}
echo '链接成功';
mysqli_close($con);
?> 