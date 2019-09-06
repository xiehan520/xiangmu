<?php

require "conn.php";

if(isset($_POST['phone']) && isset($_POST['password'])){
    $phone=$_POST['phone'];
    $password=$_POST['password'];

    $result=$conn->query("select * from login where phone='$phone' and password='$password'");


    if($result->fetch_assoc()){//匹配成功
        echo true;//1
    }else{
        echo false;//空隙
    };
    
};
if(isset($_POST['phone']) && isset($_POST['password'])){
    $phone=$_POST['phone'];
    $password=$_POST['password'];

    $result=$conn->query("select * from login where email='$phone' and password='$password'");


    if($result->fetch_assoc()){//匹配成功
        echo true;//1
    }else{
        echo false;//空隙
    };
    
};
