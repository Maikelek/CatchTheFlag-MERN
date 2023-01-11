<?php
session_start();
require './config/config.php';

if(isset($_SESSION["token"])){
    $id = $_SESSION["token"];
} else {
    $id = null;
}?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    <title>Prihlás sa</title>
</head>
<body>

    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
            <a href="https://github.com/maikelek" class="navbar-brand">Michal Priemerny</a>
            

            <ul class="navbar-nav">
            <?php if($id >= 1): ?>
                    <li class="nav-item">
                        <a href="profil.php" class="nav-link">Profil</a>
                    </li>
                    <li class="nav-item">
                        <a href="read.php" class="nav-link">Najdi</a>
                    </li>
                    <li class="nav-item">
                        <a href="./backend/logout.php" class="nav-link">Odhlás sa</a>
                    </li>
            <?php else: ?>
                <li class="nav-item">
                    <a href="register.php" class="nav-link">Registruj sa</a>
                </li>
                <li class="nav-item">
                    <a href="index.php" class="nav-link active">Prihlás sa</a>
                </li>
            <?php endif; ?>
            </ul>
        </div>
    </nav>

    <div class="container mt-4">

        <div class="card card shadow p-3 mb-5 bg-body rounded">
            <div class="card-body">
                <h2 class="card-title">Prihlás sa!</h2>
                <div class="card-text mt-3">
                    Keď si sa zaregistroval teraz sa môžeš prihlásiť.
                </div>
            </div>
        </div>


        <?php include('./components/alertSuccess.php')?>
        <?php include('./components/alertDanger.php')?>

        <div class="card">
            <form action="./backend/loginUser.php" method="POST">
                <div class="p-3">
                    <label for="fname" class="form-label">Meno</label>
                    <input type="text" class="form-control" name="fname">
                    <div class="form-text">Zadaj svoje meno!</div>
                </div>
                <div class="p-3">
                    <label for="pass" class="form-label">Heslo</label>
                    <input type="password" class="form-control" name="pass">
                    <div class="form-text">Zadaj svoje heslo!</div>
                </div>
                <div class="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" name="login" class="btn btn-success mb-5">Prihlás sa !</button>
                </div>
            </form>
        </div>
    
</body>
</html>