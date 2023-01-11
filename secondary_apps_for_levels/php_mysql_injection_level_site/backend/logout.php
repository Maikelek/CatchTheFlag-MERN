<?php
session_start();

if(isset($_SESSION["token"])){
    session_start();
    unset($_SESSION);
    session_destroy();
}
header("Location: ../index.php");

?>