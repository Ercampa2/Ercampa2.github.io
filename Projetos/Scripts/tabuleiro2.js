export default class tabuleiro2 {
    Gerartabuleiro(tamanho){
        $(".tabuleiro-container").css('grid-template-columns',`repeat(${tamanho}, auto)`);
        let cont = 0;
        for(let f1 = 0; f1 < tamanho*tamanho; f1++){
            $(".tabuleiro-container").append(`<div id='qdd${cont}'class='tabuleiro-quadrado'></div>`);
            cont++;
        }
    }
    
    Rotacionartabuleiro(){
        console.log('oi')
    }
}