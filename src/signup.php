<?php
session_start();
include "../conn/conn.php";
$fullname = $_POST["fullname"];
$email = $_POST["email"];
$pw = md5($_POST["pw"]);
$priviledge = 0;
$q = "INSERT INTO users (fullname, email, pw, priviledge) VALUES :fullname, :email, :pw, :priviledge";
$sql = $conn->prepare($q);
$sql->BindParam(":fullname", $fullname);
$sql->BindParam(":email", $email);
$sql->BindParam(":pw", $pw);
$sql->BindParam(":priviledge", $priviledge);
?>