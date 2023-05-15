<?php

session_start();
require '../config/config.php';

if(isset($_POST['add'])) {
    $fname = mysqli_real_escape_string($conn, $_POST['fname']);
    $lname = mysqli_real_escape_string($conn, $_POST['lname']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $age = mysqli_real_escape_string($conn, $_POST['age']);

    if (!$fname || !$lname || !$email || !$age) {
        $_SESSION['messageDanger'] = "Je potrebné vyplniť všetky polia";
        header("Location: ../pages/create.php");
        exit(0);
    }


    $query = "INSERT INTO users ( fname, lname, email, age) VALUES ('$fname', '$lname', '$email', '$age')";
    $result = mysqli_query($conn, $query);



    if ($result) {
        $_SESSION['messageSucess'] = "Pridal si sa do databázy!";
        header("Location: ../pages/create.php");
        exit(0);
    } else {
        $_SESSION['messageSucess'] = "Nastala chyba, skús znova!";
        header("Location: ../pages/create.php");
        exit(0);
    }
}


?>