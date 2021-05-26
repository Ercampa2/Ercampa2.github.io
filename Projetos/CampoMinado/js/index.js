//------Variáveis e constantes------//
tabuleiro = new tabuleiro();

const matMov = tabuleiro.GerarMatMov();
tabuleiro.GeracaoTabuleiro();
tabuleiro.ApagarBordas();
tabuleiro.GirarTabuleiro();

var primeiroClique = true;
var posicaoMinas = Array.apply(null,Array(40));
var minasRestantes = 40;

$(document).keydown(e=>{
    switch(e.key){
        case 'b':
            tabuleiro.ApagarBordas();
        break;
            default:
            console.log(e.key);
    }
})

$('.quadrado').on('click',e=>{
    if(e.target.dataset.status != "bandeira"){
        let quadradoClicado = e.currentTarget.id;
        if(primeiroClique){
            posicaoMinas.forEach((element,index)=>{
            posicaoMinas[index] = VerificarPosicionamentoBombas(quadradoClicado);
            primeiroClique = false;
            })
        }
    }
})

$('.quadrado').contextmenu(e=>{
    e.preventDefault();
    let quadradoClicado = e.target;
    if(quadradoClicado.dataset.status == ""){
        $(`#${quadradoClicado.id}`).attr("data-status","bandeira");
        minasRestantes--;
    }else if(quadradoClicado.dataset.status == "bandeira"){
        $(`#${quadradoClicado.id}`).attr("data-status","");
        minasRestantes++;
    }
    $('.minasRestantes').text(`Minas Restantes : ${minasRestantes}`)
})
function VerificarPosicionamentoBombas(clique){
    let novaPosicaoBomba = Math.floor(Math.random()*200);
    if(clique != `qdd${novaPosicaoBomba}`){
        let posicaoJaExiste = false;
        posicaoJaExiste = posicaoMinas.includes(`qdd${novaPosicaoBomba}`);
        if(!posicaoJaExiste){
            return `qdd${novaPosicaoBomba}`;
        }
    }
    return VerificarPosicionamentoBombas(clique)
}