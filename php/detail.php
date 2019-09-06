<?php
header('content-type:text/html;charset=utf-8');//设置字符编码
require("conn.php");

if(isset($_GET['sid'])){
    $sid=$_GET['sid'];
    $result=$conn->query("select * from hotlist1 where sid=$sid ");
    echo json_encode($result->fetch_assoc());
}