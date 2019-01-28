function Peca(id, pos) {
	this.id = id,
	this.cor = id.startsWith('b') ? 'branca' : 'preta',
	this.posicao = pos,
	this.dama = false,
	this.promocao = function() { this.dama = true }
}
var pecas = [];
var pecaAnterior;
var pecaSelecionada;
var casasSelecionadas = [];
function mover(peca, destino) {
	document.getElementById(peca.posicao).innerHTML = '';
	document.getElementById(destino).innerHTML = '<div class="peca ' + peca.cor + '" id="' + peca.id + '"></div>';
	peca.posicao = destino;
}
function removerPecaTabuleiro(peca) {
	document.getElementById(peca.posicao).innerHTML = '';
}
function obterNumero(valor) {
	return parseInt(valor.split(valor.charAt(0))[1]);
}
function obterCoordPosicao(peca) {
	var pos = obterNumero(peca.posicao);
	var aux = pos;
	var linha = 1;
	while (aux > 8) {
		aux -= 8;
		linha++;
	}
	var coord = {
		casa: peca.posicao,
		numPos: pos,
		linha: linha,
		coluna: aux
	}
	return coord;
}
function obterObjPeca(idPeca) {
	if (idPeca.startsWith('b')) {
		return pecas[obterNumero(idPeca)-1];
	} else {
		return pecas[obterNumero(idPeca)+11];
	}
}
function obterSePecaPosicao(pos) {
	return document.getElementById(pos).innerHTML.trim() != '';
}
function obterIdPecaPosicao(pos) {
	return document.getElementById(pos).innerHTML.split('"')[3];
}
function selecionarP(p) {
	if (pecaSelecionada == undefined) {
		pecaSelecionada = p;
	}
	if (pecaSelecionada != p) {
		pecaAnterior = pecaSelecionada;
		pecaSelecionada = p;
		document.querySelector('#'+pecaAnterior).classList.remove('p-selecionada');
		document.querySelector('#'+pecaSelecionada).classList.add('p-selecionada');
	} else {
		document.querySelector('#'+p).classList.toggle('p-selecionada');
	}
}
function selecionarC(c) {
	var peca = obterObjPeca(obterIdPecaPosicao(c));
	var coord = obterCoordPosicao(peca);
	if (coord.coluna > 1 && coord.linha < 8 && (peca.cor == 'branca' || peca.dama)) {
		numCasa = coord.numPos+7;
		if (!obterSePecaPosicao('c'+numCasa)) {
			document.querySelector('#c'+numCasa).classList.toggle('c-selecionada');
			casasSelecionadas.push(numCasa);
		} else {
			var peca2 = obterObjPeca(obterIdPecaPosicao('c'+numCasa));
			var coord2 = obterCoordPosicao(peca2);
			if (coord2.coluna > 1 && coord2.linha < 8 && (peca.cor == 'branca' || peca.dama)) {
				numCasa = coord2.numPos+7;
				if (!obterSePecaPosicao('c'+numCasa) && peca2.cor == 'preta') {
					document.querySelector('#c'+numCasa).classList.toggle('c-selecionada');
					casasSelecionadas.push(numCasa);
				}
			}
		}
	}
	if (coord.coluna < 8 && coord.linha < 8 && (peca.cor == 'branca' || peca.dama)) {
		numCasa = coord.numPos+9;
		document.querySelector('#c'+numCasa).classList.toggle('c-selecionada');
	}
	if (coord.coluna > 1 && coord.linha > 1 && (peca.cor == 'preta' || peca.dama)) {
		numCasa = coord.numPos-9;
		document.querySelector('#c'+numCasa).classList.toggle('c-selecionada');
	}
	if (coord.coluna < 8 && coord.linha > 1 && (peca.cor == 'preta' || peca.dama)) {
		numCasa = coord.numPos-7;
		document.querySelector('#c'+numCasa).classList.toggle('c-selecionada');
	}
}
function selecionar() {
	if (obterSePecaPosicao(this.id)) {
		selecionarP(obterIdPecaPosicao(this.id));
		selecionarC(this.id);
	} else {
		if (document.getElementById(this.id).classList.contains('c-selecionada')) {
			mover(obterObjPeca(pecaSelecionada), this.id);
			while (casasSelecionadas.length > 0) {
				document.querySelector('#c'+casasSelecionadas.pop()).classList.remove('c-selecionada');
			}
		}
	}
}
function adicionarEventos() {
	for (var i = 1; i <= 64; i++) {
		var casa = 'c'+i;
		if (obterSePecaPosicao(casa)) {
			var idPeca = obterIdPecaPosicao(casa);
			var peca = new Peca(idPeca, casa);
			pecas.push(peca);
		}
		document.getElementById(casa).onclick = selecionar;
	}
}