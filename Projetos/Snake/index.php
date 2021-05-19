<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <title>Snake</title>
        <!-- Metadata -->
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- Links -->
        <link rel="stylesheet" href="css/index.css"></link>
        <!-- Scripts -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="js/tabuleiro.js" defer></script>
        <script type="module" src="js/index.js" defer></script>
    </head>
    <body>
        <div class="fundo fundo-esquerda">
            <div class="menu">
                <div id="recorde"></div>
                <div>Pressione "b" para ativar/desativar a grade</div>
                <div>Pressione "r" par modo de velocidade aleatória</div>
            </div> 
        </div>
        <div class="fundo fundo-centro">
            <div class="tabuleiro" id="tabuleiro-id"></div>
        </div>
        <div class="fundo fundo-direita">
            <div class="menu">
                <div class="pontuacao"></div>
                <input type="range" name="veloc" id="velocidade" min="100" max="1000">

            </div>
        </div>    
    </body>
</html>