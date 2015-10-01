<?php 
session_start();
json_encode(print_r($_SESSION["uid"]));
?>