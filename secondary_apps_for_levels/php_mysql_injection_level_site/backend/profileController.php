<?php
    session_start();
    require '../config/config.php';

    if(isset($_POST["dataEdit"])){
        $id = $_POST["dataEdit"];
        $fname = $_POST["fname"];
        $motto = $_POST["motto"];
        $pass = $_POST["pass"];
        $passRep = $_POST["passRep"];


        if (!$pass || !$passRep){
            $query = "UPDATE users SET fname='$fname', motto='$motto' WHERE id=$id";
            $result = mysqli_query($conn, $query);
            if ($result) {
                $_SESSION['messageSuccess'] = "Aktualizoval si svoj profil!";
                header("Location: ../profil.php");
                exit(0);
            } else {
                $_SESSION['messageDanger'] = "Chyba skús znova!";
                header("Location: ../profil.php");
                exit(0);
            }
        }

        if ($pass == $passRep) {
            $hashedPass = password_hash($pass, PASSWORD_BCRYPT);
            $query = "UPDATE users SET fname='$fname', motto='$motto', pass='$hashedPass' WHERE id=$id";
            $result = mysqli_query($conn, $query);
            if ($result) {
                $_SESSION['messageSuccess'] = "Aktualizoval si sa!";
                header("Location: ../profil.php");
                exit(0);
            } else {
                $_SESSION['messageDanger'] = "Chyba skús znova!";
                header("Location: ../profil.php");
                exit(0);
            }
        }
    }
?>
