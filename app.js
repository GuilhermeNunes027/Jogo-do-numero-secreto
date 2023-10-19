let listaDeNumeros = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatoria();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Famale', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela ('h1', 'Jogo do número secreto');
    exibirTextoNaTela ('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    console.log(numeroSecreto);
    if (chute == numeroSecreto){
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa'
        let mensagemTentativas = `Você descobriu o número secreto ${numeroSecreto} com ${tentativas} ${palavraTentativas}.`
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', mensagemTentativas); 
        document.getElementById('reiniciarJogo()').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', `O número secreto é menor que ${chute}`);
            exibirTextoNaTela('h1', 'Errou!');
        } else {
            exibirTextoNaTela('p',`O número secreto é maior que ${chute}`);
            exibirTextoNaTela('h1', 'Errou!');
        }
        tentativas++;
        limparCampo();
    } 
}

function gerarNumeroAleatoria() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumeros.length;

    if(quantidadeDeElementosNaLista == numeroEscolhido){
        listaDeNumeros = [];
    }

    if (listaDeNumeros.includes(numeroEscolhido)){
        return gerarNumeroAleatoria();
    }else {
        listaDeNumeros.push(numeroEscolhido);
        console.log(listaDeNumeros);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    exibirMensagemInicial();
    numeroSecreto = gerarNumeroAleatoria();
    limparCampo();
    tentativas = 1;
    document.getElementById('reiniciarJogo()').setAttribute('disabled',true);
}