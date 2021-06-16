//------Variáveis e constantes------//
tabuleiro = new tabuleiro();

const matMov = tabuleiro.GerarMatMov();
tabuleiro.GeracaoTabuleiro();
tabuleiro.GirarTabuleiro();

var primeiroClique = true;
var posicaoMinas = Array.apply(null,Array(32));
var valoresQuadrados = Array.apply(null,Array(200)) 
var minasRestantes = 32;
var possiveisMinas = 0
var quadradosAbertos = 0

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
    
    if(e.target.dataset.status != "bandeira" && e.target.dataset.status != "Aberto"){
        let quadradoClicado = e.currentTarget.id;
        if(primeiroClique){
            posicaoMinas.forEach((element,index)=>{
            posicaoMinas[index] = VerificarPosicionamentoBombas(quadradoClicado);       
            })
            primeiroClique = false;
            let vetor = [];
            let vetor_2 = [];
            posicaoMinas.forEach((element)=>{
                valoresQuadrados[element] = "Bomba"

                let [row,col] = tabuleiro.AcharIndicePorValor(element,matMov);

                if(row > 0 && col > 0) vetor.push(matMov[row-1][col-1]);
                if(row > 0) vetor.push(matMov[row-1][col]);
                if(row > 0 && col < 19) vetor.push(matMov[row-1][col+1]);

                if(col > 0) vetor.push(matMov[row][col-1]);
                if(col < 19) vetor.push(matMov[row][col+1]);

                if(row < 9 && col > 0) vetor.push(matMov[row+1][col-1]);
                if(row < 9) vetor.push(matMov[row+1][col]);
                if(row < 9 && col < 19) vetor.push(matMov[row+1][col+1]);
      
            })

            let vetorOrganizado = vetor.sort();
            let contador = 0;
            let anterior = vetorOrganizado[0];
            vetorOrganizado.forEach((element, index)=>{
                if(element == anterior){
                    contador++;
                }else{
                    vetor_2.push([anterior,contador])
                    anterior = element;
                    contador = 1;
                }
                if(vetorOrganizado.length - 1 == index){
                    vetor_2.push([anterior,contador])
                }
            })
            console.log(vetor_2)
            vetor_2.forEach((element)=>{
                if(!posicaoMinas.includes(element[0])){
                    valoresQuadrados[element[0]] = element[1]
                }
                
            })
        }
        
        if($(`#${quadradoClicado}`).attr('data-status') == "meia-bandeira"){
            possiveisMinas--;
            $('.possiveisMinas').text(`Possiveis Minas Marcadas: ${possiveisMinas}`)
        }
        $(`#${quadradoClicado}`).css("box-shadow",'none')
        $(`#${quadradoClicado}`).css("background-color",'#404040')
        $(`#${quadradoClicado}`).text(valoresQuadrados[quadradoClicado.substr(3)])
        $(`#${quadradoClicado}`).attr('data-status','Aberto')

        if(valoresQuadrados[quadradoClicado.substr(3)] == undefined){
            LimparBrancos(quadradoClicado)
        }
        quadradosAbertos++;
        VerificarDerrota(quadradoClicado);
    }
    VerificarVitoria()
})

$('.quadrado').contextmenu(e=>{
    e.preventDefault();
    let quadradoClicado = e.target;
    
    if(quadradoClicado.dataset.status == ""){
        $(`#${quadradoClicado.id}`).attr("data-status","bandeira");
        minasRestantes--;
    }else if(quadradoClicado.dataset.status == "bandeira"){
        $(`#${quadradoClicado.id}`).attr("data-status","meia-bandeira");
        minasRestantes++;
        possiveisMinas++;
    }else if(quadradoClicado.dataset.status == "meia-bandeira"){
        $(`#${quadradoClicado.id}`).attr("data-status","");
        possiveisMinas--;
    }
    $('.minasRestantes').text(`Minas Restantes : ${minasRestantes}`)
    $('.possiveisMinas').text(`Possiveis Minas Marcadas: ${possiveisMinas}`)
})

function VerificarPosicionamentoBombas(clique){
    let novaPosicaoBomba = Math.floor(Math.random()*200);
    let interferenciaIncial = SpawnBranco(clique, novaPosicaoBomba);

    if(clique != `qdd${novaPosicaoBomba}` && !interferenciaIncial){
        let posicaoJaExiste = false;
        posicaoJaExiste = posicaoMinas.includes(novaPosicaoBomba);
        if(!posicaoJaExiste){
            return novaPosicaoBomba;
        }
    }
    return VerificarPosicionamentoBombas(clique)
}

function SpawnBranco(clique, novaPosicaoBomba){
    let [row,col] = tabuleiro.AcharIndicePorValor(clique.substr(3),matMov);

    if(clique == `qdd${novaPosicaoBomba}`) return true
    if(row > 0 && col > 0 ){if (novaPosicaoBomba == matMov[row-1][col-1]){ return true}}
    if(row > 0 ){if (novaPosicaoBomba == matMov[row-1][col]){ return true}}
    if(row > 0 && col < 19 ){if (novaPosicaoBomba == matMov[row-1][col+1]){ return true}}
    if(col > 0 ){if (novaPosicaoBomba == matMov[row][col-1]){ return true}}
    if(col < 19 ){if (novaPosicaoBomba == matMov[row][col+1]){ return true}}
    if(row < 9 && col > 0 ){if (novaPosicaoBomba == matMov[row+1][col-1]){ return true}}
    if(row < 9 ){if (novaPosicaoBomba == matMov[row+1][col]){ return true}}
    if(row < 9  && col < 19 ){if (novaPosicaoBomba == matMov[row+1][col+1]){ return true}}
                
    return false
}

function LimparBrancos(clique){
    let [row,col] = tabuleiro.AcharIndicePorValor(clique.substr(3),matMov)
    
    if(row > 0 && col > 0 ){$(`#qdd${matMov[row-1][col-1]}`).click()}
    if(row > 0 ){$(`#qdd${matMov[row-1][col]}`).click()}
    if(row > 0 && col < 19 ){$(`#qdd${matMov[row-1][col+1]}`).click()}
    if(col > 0 ){$(`#qdd${matMov[row][col-1]}`).click()}
    if(col < 19 ){$(`#qdd${matMov[row][col+1]}`).click()}
    if(row < 9 && col > 0 ){$(`#qdd${matMov[row+1][col-1]}`).click()}
    if(row < 9 ){$(`#qdd${matMov[row+1][col]}`).click()}
    if(row < 9 && col < 19 ){$(`#qdd${matMov[row+1][col+1]}`).click()}
}
function VerificarVitoria(){
    if(minasRestantes == 0 && quadradosAbertos == 168){
        $('.quadrado').off('click')
        alert("Você Ganhou!")
    }
}
function VerificarDerrota(clique){
    if(posicaoMinas.includes(parseInt(clique.substr(3)))){
        $('.quadrado').off('click')
        $(`#${clique}`).css('background-color','red')
        $(`#${clique}`).css('box-shadow','inset 2px 2px 2px 2px rgba(255,255,255,.3),inset -2px -2px 2px 2px rgba(0,0,0,.5)')
        $(`#${clique}`).css('color','red')
        setTimeout(() => {
            alert("Você Perdeu!")  
        }, 100);
    }
}