function mover(origem, destino, peca) {
	var cor = 'branca';
	if (peca.startsWith('p')) {
		cor = 'preta';
	}
	document.getElementById(origem).innerHTML = '';
	document.getElementById(destino).innerHTML = '<div class="peca ' + cor + '" id="' + peca + '"></div>';
}