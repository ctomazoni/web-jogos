var pecaAnterior;
var pecaSelecionada;
function mover(origem, destino, peca) {
	var cor = 'branca';
	if (peca.startsWith('p')) {
		cor = 'preta';
	}
	document.getElementById(origem).innerHTML = '';
	document.getElementById(destino).innerHTML = '<div class="peca ' + cor + '" id="' + peca + '"></div>';
}
function selecionar() {
	pecaAnterior = pecaSelecionada;
	pecaSelecionada = this.id;
	document.querySelector('#'+pecaSelecionada).classList.toggle('selecionada');
}
function adicionarEventos() {
	for (var i = 1; i <= 12; i++) {
		var branca = 'b'+i;
		var preta = 'p'+i;
		document.getElementById(preta).addEventListener('click',selecionar);
		document.getElementById(branca).onclick = selecionar;
	}
}