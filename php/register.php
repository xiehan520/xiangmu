<?php

require "conn.php";

//检测用户名
if(isset($_GET['checkphone']) ){
    $phone=$_GET['checkphone'];
    
    //通过查询方式来测试是否存在用户名。
    $result=$conn->query("select * from login where phone='$phone' ");

    if($result->fetch_assoc()){//存在
        echo true;//1
    }else{//不存在
        echo false;//空隙
    }
}
if(isset($_GET['checkemail']) ){
    $email=$_GET['checkemail'];
    
    //通过查询方式来测试是否存在用户名。
    $result=$conn->query("select * from login where email='$email' ");

    if($result->fetch_assoc()){//存在
        echo true;//1
    }else{//不存在
        echo false;//空隙
    }
}
if(isset($_GET['checkpe']) ){
    $pe=$_GET['checkpe'];
    
    //通过查询方式来测试是否存在用户名。
    $result=$conn->query("select * from login where phone='$pe'");

    if($result->fetch_assoc()){//存在
        echo true;//1
    }else{//不存在
        echo false;//空隙
    }
}
if(isset($_GET['checkpe']) ){
    $pe=$_GET['checkpe'];
    
    //通过查询方式来测试是否存在用户名。
    $result=$conn->query("select * from login where email='$pe'");

    if($result->fetch_assoc()){//存在
        echo true;//1
    }else{//不存在
        echo false;//空隙
    }
}



//前端用户点击了submit按钮。接收前端传入表单的值。
if(isset($_POST['submit'])){
    $phone=$_POST['phone'];
    $password=$_POST['password'];//加密
    $email=$_POST['email'];
    //添加数据库
    $conn->query("insert login values(null,'$phone','$email','$password',NOW())");

    //php的跳转
    header('location:http://10.31.157.32/js-1907/xiangmu/dist/index.html');
}