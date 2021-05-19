<?php
    fwrite(fopen("js/pontuacao.json", "w"),json_encode($_POST['info']));
?>
Recorde: <?php print_r($_POST['info']['pontuacao'])?>
    
