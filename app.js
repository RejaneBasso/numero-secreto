let listaDeNumerosSorteados = [];
let numeroLimite = 10;

let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 0;

function manipularHtml(tag, conteudo) {
    let campo = document.querySelector(tag);
    campo.innerHTML = conteudo;
    responsiveVoice.speak(conteudo, 'Brazilian Portuguese Female', {rate:1.2});
}

exibirMensagemInicial();

function verificarChute() {
    tentativas++;
    let chute = document.querySelector('input').value;

    console.log(chute == numeroSecreto);
    if (chute == numeroSecreto) {

        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemSucesso = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;

        manipularHtml('h1', 'Acertou');
        manipularHtml('p', mensagemSucesso);

        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else {
        if (chute > numeroSecreto)
            manipularHtml('p', 'O número secreto é menor!');
        else
            manipularHtml('p', 'O número secreto é maior!');
        
        limparChute();
        
    }
}

function gerarNumeroAleatorio() {
     let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparChute(){
    chute = document.querySelector('input')
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparChute();
    tentativas = 0;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

function exibirMensagemInicial() {
    manipularHtml('h1', 'Jogo do Número Secreto');
    manipularHtml('p', 'Escolha um número entre 1 e 10');
}