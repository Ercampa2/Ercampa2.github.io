class tabuleiro{

    bordas = false//Existêcia das bordas
    numeros = false//Numeração dos quadrados
    vertical = false//Rotação do Tabuleiro
    
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

    ApagarBordas(){//Apaga ou cria bordas nas células do tabuleiro
        if(this.bordas){
            $(".quadrado").css('border','0');
        }else{
            $(".quadrado").css('border','1px solid white');
        }
        this.bordas = !this.bordas;
    }

    GeracaoTabuleiro(){
        let cont = 0;
        for(let f1 = 0; f1 < 10;f1++){
            for(let f2 = 0; f2 < 20; f2++){
                $('#tabuleiro-id').append(`<div class="quadrado" data-status="" id="qdd${cont}"></div>`);//Geração dos quadrados do tabuleiro
                cont++;
            }
        }
    }

    NumerarTabuleiro(){//Função que numéra as células
        if(this.numeros){
            for(let cont = 0; cont < 200; cont++){
                $('#qdd'+cont).text('');
            }
        }else{
            for(let cont = 0; cont < 200; cont++){
                $('#qdd'+cont).text(cont);
            }
        }
        this.numeros = !this.numeros;
    }
    
    GirarTabuleiro(){//Função que rotaciona o tabuleiro
        if(this.vertical){
            $('#tabuleiro-id').css('transform', 'rotateZ(0deg)');
            $('.quadrado').css('transform', 'rotateZ(0deg)');
        }else{
            $('#tabuleiro-id').css('transform', 'rotateZ(90deg)');
            $('.quadrado').css('transform', 'rotateZ(-90deg)');
        }
        this.vertical = !this.vertical;
    }
    
    AcharIndicePorValor(num,matMov){
        for(let f1 = 0; f1 < 10; f1++){
            for(let f2 = 0; f2 < 20; f2++){
                if(matMov[f1][f2] == num){
                    return [f1,f2];//Retorna a posicao do valor inserido no array matMov
                }
            }
        }
    }
}