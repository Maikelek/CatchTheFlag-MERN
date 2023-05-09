<?php

$host = "localhost"; 
$user = "user"; 
$password = "password"; 
$db = "db_name"; 

$conn = mysqli_connect($host, $user, $password, $db);

if($conn ->connect_error) {
   die("Connection error, try again!");
}

?> 
