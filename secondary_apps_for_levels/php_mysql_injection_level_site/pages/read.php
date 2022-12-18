<?php
session_start();
if(isset($_POST['find']))
{
    $id = $_POST['id'];

    if(!$id) {
        $_SESSION['messageDanger'] = "Je potrebné vyplniť všetky polia";
        exit(0);
    }

    $query = "SELECT * FROM `users` WHERE `id`=$id";
    $search_result = filterTable($query);
    
}
 else {
    $query = "SELECT * FROM `users` WHERE `id`=0";
    $search_result = filterTable($query);
}

function filterTable($query)
{
    require '../config/config.php';
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
                    <li class="nav-item">
                        <a href="create.php" class="nav-link">Pridaj sa</a>
                    </li>
                    <li class="nav-item">
                        <a href="read.php" class="nav-link active">Nájdi</a>
                    </li>
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
            <input required type="text" class="form-control" name="id" placeholder="Zadaj ID používateľa">
            <button class="btn btn-outline-secondary" type="text" name="find">Nájdi</button>
        </div>

        <div class="container">
            <table class="table table-striped table-hover mt-5 shadow p-3 mb-5 bg-body rounded">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>MENO</th>
                        <th>PRIEZVISKO</th>
                        <th>EMAIL</th>
                        <th>VEK</th>
                    </tr>
                </thead>
                <tbody>
                <?php while($row = mysqli_fetch_array($search_result)):?>
                <tr>
                    <td><?php echo $row['id'];?></td>
                    <td><?php echo $row['fname'];?></td>
                    <td><?php echo $row['lname'];?></td>
                    <td><?php echo $row['email'];?></td>
                    <td><?php echo $row['age'];?></td>
                </tr>
                <?php endwhile;?>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
    
</body>
</html>