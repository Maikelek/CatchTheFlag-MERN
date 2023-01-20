<?php
session_start();
require './config/config.php';

if(isset($_SESSION["token"])){
    $id = $_SESSION["token"];
    $result = mysqli_query($conn, "SELECT * FROM users WHERE id=$id");
    $data = mysqli_fetch_assoc($result);
} else {
    $id = null;
    header("Location: index.php");
}?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    <title>Profil</title>
</head>
<body>

    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
            <a href="https://github.com/maikelek" class="navbar-brand">Michal Priemerny</a>
            

            <ul class="navbar-nav">
            <?php if($id >= 1): ?>
                    <li class="nav-item">
                        <a href="profil.php" class="nav-link active">Profil</a>
                    </li>
                    <li class="nav-item">
                        <a href="read.php" class="nav-link">Najdi</a>
                    </li>
                    <li class="nav-item">
                        <a href="./backend/logout.php" class="nav-link">Odhlás sa</a>
                    </li>
            <?php else: ?>
                <li class="nav-item">
                    <a href="index.php" class="nav-link">Prihlás sa</a>
                </li>
            <?php endif; ?>
            </ul>
        </div>
    </nav>

    <div class="container mt-4">

        <div class="card card shadow p-3 mb-5 bg-body rounded">
            <div class="card-body">
                <h2 class="card-title">Toto je tvoj profil.</h2>
                <div class="card-text mt-3">
                    Tu si vieš prezrieť svoje údaje a prípadne ich zmeniť.
                </div>
            </div>
        </div>

        <form action="../../backend/profileController.php" class="card p-5" method="POST">

            <div class="d-flex justify-content-center mb-4">
                <h1 class="fw-bolder">Profil</h1>
            </div>

            <div class="input-group input-group-sm m-3">
                <span class="input-group-text">Meno</span>
                <input type="text" class="form-control" name='fname' value=<?=$data['fname']?>>
            </div>


            <div class="input-group input-group-sm m-3">
                <span class="input-group-text">Motto</span>
                <textarea class="form-control" name="motto"><?=$data['motto']?></textarea>
            </div>

            <div class="row">

                <div class="col input-group input-group-sm m-3">
                    <span class="input-group-text">Heslo</span>
                    <input type="password" name='pass' class="form-control">
                </div>

                <div class="col input-group input-group-sm m-3">
                    <span class="input-group-text">Zopakuj heslo</span>
                    <input type="password" name='passRep' class="form-control">
                </div>

            </div>

            <div class="d-grid gap-2 col-6 mx-auto">
                <button type="submit" name="dataEdit" value=<?=$id?> class="btn btn-success m-3">Uprav</button>
            </div>

            <?php include('./components/alertSuccess.php')?>
            <?php include('./components/alertDanger.php')?>

    </form>
    
</body>
</html>