<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    <title>Pridaj sa</title>
</head>
<body>

    <nav class="navbar navbar-expand navbar-dark bg-dark">
            <div class="container">
                <a href="https://github.com/maikelek" class="navbar-brand">Michal Priemerny</a>
                
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a href="create.php" class="nav-link active">Pridaj sa</a>
                    </li>
                    <li class="nav-item">
                        <a href="read.php" class="nav-link">Nájdi</a>
                    </li>
                </ul>
            </div>
        </nav>

    <div class="container mt-4">

        <div class="card card shadow p-3 mb-5 bg-body rounded">
            <div class="card-body">
                <h2 class="card-title">Používatelia</h2>
                <div class="card-text mt-3">
                    Pridaj sa aj ty do mojej databázy!
                </div>
            </div>
        </div>


        <?php include('./components/alertSuccess.php')?>
        <?php include('./components/alertDanger.php')?>

        <div class="card">
            <form action="../backend/add.php" method="POST">
                <div class="p-3">
                    <label for="fname" class="form-label">Meno</label>
                    <input type="text" class="form-control" name="fname">
                    <div class="form-text">Zadaj svoje meno!</div>
                </div>
                <div class="p-3">
                    <label for="lname" class="form-label">Priezvisko</label>
                    <input type="text" class="form-control" name="lname">
                    <div class="form-text">Zadaj svoje priezvisko!</div>
                </div>
                <div class="p-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="text" class="form-control" name="email">
                    <div class="form-text">Zadaj svoj email!</div>
                </div>
                <div class="p-3">
                    <label for="fname" class="form-label">Vek</label>
                    <input type="number" class="form-control" name="age">
                    <div class="form-text">Zadaj svoj vek!</div>
                </div>
                <div class="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" name="add" class="btn btn-success mb-5">Pridaj sa !</button>
                </div>
            </form>
        </div>
    
</body>
</html>