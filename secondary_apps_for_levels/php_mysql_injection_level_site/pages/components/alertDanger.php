<?php
    if(isset($_SESSION['messageDanger'])) :
?>

<div class="alert alert-danger alert-dismissible fade show mt-5" role="alert">
     <?=  $_SESSION['messageDanger']; ?>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>  

<?php
    unset($_SESSION['messageDanger']);
    endif;
?>