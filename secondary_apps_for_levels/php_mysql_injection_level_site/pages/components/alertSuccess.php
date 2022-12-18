<?php
    if(isset($_SESSION['messageSucess'])) :
?>

<div class="alert alert-success alert-dismissible fade show mt-5" role="alert">
     <?=  $_SESSION['messageSucess']; ?>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>  

<?php
    unset($_SESSION['messageSucess']);
    endif;
?>