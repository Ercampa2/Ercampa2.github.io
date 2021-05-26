//------Variáveis e constantes------//
tabuleiro = new tabuleiro();

const matMov = tabuleiro.GerarMatMov();
tabuleiro.GeracaoTabuleiro();

var direcao = null;//Direção que a cobra irá se mover
var ultimaDirecao = null;//Direcao da cobra na ultima movimentação
var tick = 500;//Tempo entre cada movimento
var tamanhoCobra = 1;//Tamanho da cobra
var posicaoMaca = null;//Posição atual da maçã
var posicao = new Array(200)//geração matriz das posicoes da cobra
var recordePontuacao = 200;//Recorde atual
var derrota = false;
var velocAleatoria = false;

//------Setup------//
   
$('#velocidade').on('input',(e)=>tick = e.currentTarget.value)
$('#recorde').text(`Recorde: ${recordePontuacao}`);
$('#qdd90').css('background-color','lime');//Desenha o inicio da cobra na tela
posicao[0] = 90;//Salva a posição inicial da cobra no array posicao
var posicaoMaca = GerarMaca()//Gera a maçã

logicaDoJogo();

//------Leitura de teclas------//

$(document).keydown((e)=>{
    switch(e.key){
        case "ArrowUp":
            if(ultimaDirecao != "ArrowDown"){
                direcao = "ArrowUp";
            }
            break;
        case "ArrowDown":
            if(ultimaDirecao != "ArrowUp"){
                direcao = "ArrowDown";
            }
            break;
        case "ArrowLeft":
            if(ultimaDirecao != "ArrowRight"){
                direcao = "ArrowLeft";
            }
            break;    
        case "ArrowRight":
            if(ultimaDirecao != "ArrowLeft"){
                direcao = "ArrowRight";
            }
            break;
        case "b":
            tabuleiro.ApagarBordas();
            break;
        case "r":
            velocAleatoria = !velocAleatoria
            break;
        case "n":
            tabuleiro.NumerarTabuleiro();
            break;
        case "t":
            tabuleiro.GirarTabuleiro();
            break;
    }
})


//------Funções------//

function AcharIndicePorValor(num){
    for(let f1 = 0; f1 < 10; f1++){
        for(let f2 = 0; f2 < 20; f2++){
            if(matMov[f1][f2] == num){
                return [f1,f2];//Retorna a posicao do valor inserido no array matMov
            }
        }
    }
}

function GerarMaca(){
    while(true){
        let possivelPosicao = Math.floor(Math.random()*200);//Randomiza a posição da maçã
        let a = posicao.filter((index)=>index == possivelPosicao);//Verifica se a maçã está na mesma posição que a cobra
        if(a.length == 0){
            AcharIndicePorValor(possivelPosicao);
            $('#qdd'+possivelPosicao).css('background-color','red');//Marca a maçã no tabuleiro
            return possivelPosicao;
        }    
    }
}   

function AtualizarTabuleiro(row,col){

    for(let f1 = tamanhoCobra-1;f1 > 0;f1--){
        posicao[f1] = posicao[f1-1]; //Atualiza o array de posições
    }
    posicao[0] = matMov[row][col]; // A posição da cabeça no array posições
    matMov.forEach(element => {
        element.forEach(element2=>{
            $("#qdd"+element2).css('background-color','transparent'); //Pinta o tabuleiro com sua cor de fundo
        })
    });

    posicao.forEach((element,index)=>{
        if(index % 2 == 0){ // Define qual cor pintar a cobra
            $("#qdd"+element).css('background-color','green');//Pinta a cobra
        }else{
            $("#qdd"+element).css('background-color','rgb(34,177,77)');//Pinta a cobre
        }
    })
    $("#qdd"+posicaoMaca).css('background-color','red');//Pinta a cabeça da cobra
    $("#qdd"+posicao[0]).css('background-color','lime');//Pinta a cabeça da cobra 
    
}
function Derrota(motivo){
    derrota = true
    alert(`Você perdeu por ${motivo}`);
}

function logicaDoJogo(){
    var [row,col] = AcharIndicePorValor(posicao[0]);//Pega a posição da cabeça da cobra
    if(posicao[0] == posicaoMaca){//Verfifca se houve colsçao entre a cobra e a maçã
        tamanhoCobra++;//Aumenta o tamnaho da cobra
        posicaoMaca = GerarMaca();//gera a maçã
        $(".pontuacao").text(`Pontuação: ${tamanhoCobra}`);
        if(velocAleatoria){
            tick = Math.random() * (1001 - 100) + 100
            $('#velocidade').val(tick);
        }
    }
    posicao.forEach((element,index)=>{
        if((element == posicao[0]) && index != 0){
            Derrota("passar por cima de si mesmo");//Chama a derrota e envia seu motivo
        }
    })
    switch(direcao){
        case"ArrowUp":
            if (row > 0){
                row--;
                AtualizarTabuleiro(row,col);//Atualiza o tabuleiro                    
            }else{
                Derrota("Sair do tabuleiro");//Chama a derrota e envia seu motivo
            }
            ultimaDirecao = "ArrowUp";
            break;
        case"ArrowDown":
            if (row < 9){
                row++;
                AtualizarTabuleiro(row,col);//Atualiza o tabuleiro
            }else{
                Derrota("Sair do tabuleiro");//Chama a derrota e envia seu motivo
            }
           ultimaDirecao = "ArrowDown";
           break;
        case"ArrowLeft":
            if (col > 0){
                col--;
                AtualizarTabuleiro(row,col);//Atualiza o tabuleiro
            }else{
                Derrota("Sair do tabuleiro");//Chama a derrota e envia seu motivo
            }
           ultimaDirecao = "ArrowLeft";
           break;
        case"ArrowRight":
            if (col < 19){
                col++;
                AtualizarTabuleiro(row,col);//Atualiza o tabuleiro
            }else{
                Derrota("Sair do tabuleiro");//Chama a derrota e envia seu motivo
            }
          ultimaDirecao = "ArrowRight";
          break;
    }

    !derrota?setTimeout(logicaDoJogo,tick):0;
}
$('#controles').click(()=>{
    new WinBox("Controles do jogo", {
        url: "./controles.html",
        height:"100%",
        width:"20%",
        background: "linear-gradient(90deg, rgba(11,177,39,1) 0%, rgba(79,252,8,1) 50%, rgba(27,136,58,1) 100%)",
    });
})
