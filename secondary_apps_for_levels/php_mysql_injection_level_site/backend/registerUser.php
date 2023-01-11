<?php

session_start();
require '../config/config.php';

if(isset($_POST['register'])) {
    $fname = mysqli_real_escape_string($conn, $_POST['fname']);
    $motto = mysqli_real_escape_string($conn, $_POST['motto']);
    $pass = mysqli_real_escape_string($conn, $_POST['pass']);
    $passRep = mysqli_real_escape_string($conn, $_POST['passRep']);

    $userExists = mysqli_query($conn, "SELECT * FROM users WHERE fname = '$fname'");
    if(mysqli_num_rows($userExists) > 0){
        $_SESSION['messageDanger'] = "Používateľské meno už existuje!";
        header("Location: ../register.php");
        exit(0);
    }



    if (!$fname || !$motto || !$pass || !$passRep) {
        $_SESSION['messageDanger'] = "Je potrebné vyplniť všetky polia";
        header("Location: ../register.php");
        exit(0);
    }

    if($pass != $passRep) {
        $_SESSION['messageDanger'] = "Hesla sa nezhodujú";
        header("Location: ..register.php");
        exit(0);
    }

    if ($fname && $motto && $pass && $passRep && $pass == $passRep) {
        
        $hashedPass = password_hash($pass, PASSWORD_BCRYPT);
        $query = "INSERT INTO users ( fname, motto, pass) VALUES ('$fname', '$motto', '$hashedPass')";
        $result = mysqli_query($conn, $query);

       if ($result) {
            $_SESSION['messageSuccess'] = "Úspešne si sa registroval";
            header("Location: ../index.php");
            exit(0);
        } else {
            $_SESSION['messageDanger'] = "Pri registracii došlo k problemu skús to znova!";
            header("Location: ../register.php");
            exit(0);
        }
    }
}


?>