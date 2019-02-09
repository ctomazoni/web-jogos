function Peca(id, pos) {
	this.id = id,
	this.cor = id.startsWith('b') ? 'branca' : 'preta',
	this.posicao = pos,
	this.dama = false,
	this.promocao = function() {
		this.dama = true;
		document.getElementById(this.id).innerHTML = '<span class="dama d-'+this.cor+'">&#10031;</span>';
	}
}
var vez;
var pecas = [];
var captP = [];
var captC = [];
var pecaSelecionada = '';
var casasSelecionadas = [];
var qtdPecasBrancas = 12;
var qtdPecasPretas = 12;
function mover(peca, destino) {
	document.getElementById(peca.posicao).innerHTML = '';
	document.getElementById(destino).innerHTML = '<div class="peca ' + peca.cor + '" id="' + peca.id + '"></div>';
	peca.posicao = destino;
	if (!peca.dama) {
		var pos = obterNumero(destino);
		if (pos < 9 || pos > 56) {
			peca.promocao();
		}
	} else {
		document.getElementById(peca.id).innerHTML = '<span class="dama d-'+peca.cor+'">&#10031;</span>';
	}
	if (peca.cor == 'branca') {
		vez = 'p';
	} else {
		vez = 'b';
	}
	atualizarPlacar('info');
	if (document.getElementById(destino).classList.contains('capt')) {
		removerPecaTabuleiro(destino);
	}
	desmarcarPossiveisCapturas();
}
function removerPecaTabuleiro(pos) {
	var codPecaCapt;
	for (var i = 0; i <= captC.length; i++) {
		if (captC[i] == pos) {
			codPecaCapt = i;
			break;
		}
	}
	var peca = captP[codPecaCapt];
	document.getElementById(peca.posicao).innerHTML = '';
	if (peca.cor == 'branca') {
		qtdPecasBrancas--;
	} else {
		qtdPecasPretas--;
	}
	atualizarPlacar('pont');
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
function desmarcarCasasSelecionadas() {
	while (casasSelecionadas.length > 0) {
		document.getElementById(casasSelecionadas.pop()).classList.remove('c-selecionada');
	}
}
function marcarPossivelCaptura(peca, casa) {
	captP.push(peca);
	captC.push(casa);
	document.getElementById(casa).classList.add('capt');
}
function desmarcarPossiveisCapturas() {
	while (captC.length > 0) {
		document.getElementById(captC.pop()).classList.remove('capt');
		captP = [];
	}
}
function selecionarP(p) {
	if (pecaSelecionada == '') {
		pecaSelecionada = p;
	}
	if (pecaSelecionada != p) {
		var pecaAnterior = pecaSelecionada;
		pecaSelecionada = p;
		document.querySelector('#'+pecaAnterior).classList.remove('p-selecionada');
		document.querySelector('#'+pecaSelecionada).classList.add('p-selecionada');
		selecionarC(obterObjPeca(p).posicao);
	} else {
		if (document.querySelector('#'+p).classList.contains('p-selecionada')) {
			pecaSelecionada = '';
		} else {
			selecionarC(obterObjPeca(p).posicao);
		}
		document.querySelector('#'+p).classList.toggle('p-selecionada');
	}
}
function selecionarC(c) {
	var peca = obterObjPeca(obterIdPecaPosicao(c));
	var coord = obterCoordPosicao(peca);
	if (coord.coluna > 1 && coord.linha < 8 && (peca.cor == 'branca' || peca.dama)) {
		var casa = 'c'+(coord.numPos+7);
		if (!obterSePecaPosicao(casa)) {
			casasSelecionadas.push(casa);
		} else {
			var peca2 = obterObjPeca(obterIdPecaPosicao(casa));
			var coord2 = obterCoordPosicao(peca2);
			if (coord2.coluna > 1 && coord2.linha < 8) {
				casa = 'c'+(coord2.numPos+7);
				if (!obterSePecaPosicao(casa) && peca.cor != peca2.cor) {
					casasSelecionadas.push(casa);
					marcarPossivelCaptura(peca2, casa);
				}
			}
		}
	}
	if (coord.coluna < 8 && coord.linha < 8 && (peca.cor == 'branca' || peca.dama)) {
		var casa = 'c'+(coord.numPos+9);
		if (!obterSePecaPosicao(casa)) {
			casasSelecionadas.push(casa);
		} else {
			var peca2 = obterObjPeca(obterIdPecaPosicao(casa));
			var coord2 = obterCoordPosicao(peca2);
			if (coord2.coluna < 8 && coord2.linha < 8) {
				casa = 'c'+(coord2.numPos+9);
				if (!obterSePecaPosicao(casa) && peca.cor != peca2.cor) {
					casasSelecionadas.push(casa);
					marcarPossivelCaptura(peca2, casa);
				}
			}
		}
	}
	if (coord.coluna > 1 && coord.linha > 1 && (peca.cor == 'preta' || peca.dama)) {
		var casa = 'c'+(coord.numPos-9);
		if (!obterSePecaPosicao(casa)) {
			casasSelecionadas.push(casa);
		} else {
			var peca2 = obterObjPeca(obterIdPecaPosicao(casa));
			var coord2 = obterCoordPosicao(peca2);
			if (coord2.coluna > 1 && coord2.linha > 1) {
				casa = 'c'+(coord2.numPos-9);
				if (!obterSePecaPosicao(casa) && peca.cor != peca2.cor) {
					casasSelecionadas.push(casa);
					marcarPossivelCaptura(peca2, casa);
				}
			}
		}
	}
	if (coord.coluna < 8 && coord.linha > 1 && (peca.cor == 'preta' || peca.dama)) {
		var casa = 'c'+(coord.numPos-7);
		if (!obterSePecaPosicao(casa)) {
			casasSelecionadas.push(casa);
		} else {
			var peca2 = obterObjPeca(obterIdPecaPosicao(casa));
			var coord2 = obterCoordPosicao(peca2);
			if (coord2.coluna < 8 && coord2.linha > 1) {
				casa = 'c'+(coord2.numPos-7);
				if (!obterSePecaPosicao(casa) && peca.cor != peca2.cor) {
					casasSelecionadas.push(casa);
					marcarPossivelCaptura(peca2, casa);
				}
			}
		}
	}
	for (var i = 0; i < casasSelecionadas.length; i++) {
		document.getElementById(casasSelecionadas[i]).classList.toggle('c-selecionada');
	}
}
function selecionar() {
	if (obterSePecaPosicao(this.id)) {
		desmarcarCasasSelecionadas();
		selecionarP(obterIdPecaPosicao(this.id));
	} else {
		if (document.getElementById(this.id).classList.contains('c-selecionada')) {
			mover(obterObjPeca(pecaSelecionada), this.id);
			desmarcarCasasSelecionadas();
		}
	}
}
function atualizarPlacar(cod) {
	if (cod == 'info') {
		document.getElementById('info').innerHTML = 'Vez de '+document.getElementById(vez == 'b' ? 'djb' : 'djp').innerHTML+'.';
	} else if (cod == 'pont') {
		document.getElementById('pjb').innerHTML = 12 - qtdPecasPretas;
		document.getElementById('pjp').innerHTML = 12 - qtdPecasBrancas;
		if (qtdPecasPretas == 0) {
			document.getElementById('info').innerHTML = document.getElementById('djb').innerHTML+' venceu a partida.';
		} else if (qtdPecasBrancas == 0) {
			document.getElementById('info').innerHTML = document.getElementById('djp').innerHTML+' venceu a partida.';
		}
	} else if (cod == 'desc') {
		document.getElementById('djb').innerHTML = 'J1';
		document.getElementById('djp').innerHTML = 'J2';
		if (vez != undefined) {
			atualizarPlacar('info');
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