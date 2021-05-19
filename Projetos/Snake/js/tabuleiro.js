class tabuleiro{

    bordas = true//Existêcia das bordas
    
    GerarMatMov(){
        let matMov = new Array(10);//geração da Matriz de movimento
        let cont = 0;
        for(let f1 = 0; f1 < 10;f1++){
            let arrayInterno = new Array(10);//Criação de um array temporario para salvar os valores futuros de MatMov
            for(let f2 = 0; f2 < 20; f2++){
                arrayInterno[f2] = cont; // geração de cada indice da MatMov
                cont++;
            }
            matMov[f1] = arrayInterno;//Transferencia do array interno para a MatMov
        }
        return matMov;
    } 

    ApagarBordas(){
        
        if(this.bordas){
            $(".quadrado").css('border','0');
        }else{
            $(".quadrado").css('border','1px solid white');
        }
        this.bordas = !this.bordas
    }

    GeracaoTabuleiro(){
        let cont = 0;
        for(let f1 = 0; f1 < 10;f1++){
            for(let f2 = 0; f2 < 20; f2++){
                $('#tabuleiro-id').append(`<div class="quadrado" id="qdd${cont}"></div>`)//Geração dos quadrados do tabuleiro
                cont++;
            }
        }
    }
}