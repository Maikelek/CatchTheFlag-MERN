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
}

if(isset($_POST['find']))
{
    $id = $_POST['id'];

    $query = "SELECT * FROM `users` WHERE id=$id";
    $search_result = filterTable($query);
    
}
 else {
    $query = "SELECT * FROM `users` WHERE id=0";
    $search_result = filterTable($query);
}

function filterTable($query)
{
    require './config/config.php';
    $filter_Result = mysqli_query($conn, $query);
    return $filter_Result;
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    <title>Nájdi</title>
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
                        <a href="read.php" class="nav-link active">Najdi</a>
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

        <div class="card shadow p-3 mb-5 bg-body rounded">
            <div class="card-body">
                <h2 class="card-title">Nájdi používateľov</h2>
                <div class="card-text mt-3">
                    Toto je moja prvá PHP stránka, môžeš si prezerať používateľov podľa ich ID
                </div>
            </div>
        </div>


        <form action="read.php" method="post" class="input-group mb-3">
            <input required type="number" class="form-control" name="id" placeholder="Zadaj ID používateľa">
            <button class="btn btn-outline-secondary" type="submit" name="find">Nájdi</button>
        </div>

        <div class="container">
            <table class="table table-striped table-hover mt-5 shadow p-3 mb-5 bg-body rounded">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>MENO</th>
                        <th>MOTTO</th>
                    </tr>
                </thead>
                <tbody>
                <?php while($row = mysqli_fetch_array($search_result)):?>
                <tr>
                    <td><?php echo $row['id'];?></td>
                    <td><?php echo $row['fname'];?></td>
                    <td><?php echo $row['motto'];?></td>
                </tr>
                <?php endwhile;?>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
    
</body>
</html>