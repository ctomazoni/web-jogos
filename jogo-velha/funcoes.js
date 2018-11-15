var vez = 'O';
var jogadas = ['', '', '', '', '', '', '', '', ''];
var terminou = false;

function obterVez() {
	if (vez == 'X') {
		vez = 'O';
	} else {
		vez = 'X';
	}
	return vez;
}

function venceuPartida(x, y, z) {
	document.getElementById(x).style.color = '#FF0000';
	document.getElementById(y).style.color = '#FF0000';
	document.getElementById(z).style.color = '#FF0000';
	terminou = true;
	alert('Jogador ' + vez + ' ganhou!');
}

function verificaPartida() {
	if (!terminou) {
		if ((jogadas[0] == 'X' && jogadas[1] == 'X' && jogadas[2] == 'X') || (jogadas[0] == 'O' && jogadas[1] == 'O' && jogadas[2] == 'O')) {
			venceuPartida(0, 1, 2);
		} else if ((jogadas[3] == 'X' && jogadas[4] == 'X' && jogadas[5] == 'X') || (jogadas[3] == 'O' && jogadas[4] == 'O' && jogadas[5] == 'O')) {
			venceuPartida(3, 4, 5);
		} else if ((jogadas[6] == 'X' && jogadas[7] == 'X' && jogadas[8] == 'X') || (jogadas[6] == 'O' && jogadas[7] == 'O' && jogadas[8] == 'O')) {
			venceuPartida(6, 7, 8);
		} else if ((jogadas[0] == 'X' && jogadas[3] == 'X' && jogadas[6] == 'X') || (jogadas[0] == 'O' && jogadas[3] == 'O' && jogadas[6] == 'O')) {
			venceuPartida(0, 3, 6);
		} else if ((jogadas[1] == 'X' && jogadas[4] == 'X' && jogadas[7] == 'X') || (jogadas[1] == 'O' && jogadas[4] == 'O' && jogadas[7] == 'O')) {
			venceuPartida(1, 4, 7);
		} else if ((jogadas[2] == 'X' && jogadas[5] == 'X' && jogadas[8] == 'X') || (jogadas[2] == 'O' && jogadas[5] == 'O' && jogadas[8] == 'O')) {
			venceuPartida(2, 5, 8);
		} else if ((jogadas[0] == 'X' && jogadas[4] == 'X' && jogadas[8] == 'X') || (jogadas[0] == 'O' && jogadas[4] == 'O' && jogadas[8] == 'O')) {
			venceuPartida(0, 4, 8);
		} else if ((jogadas[2] == 'X' && jogadas[4] == 'X' && jogadas[6] == 'X') || (jogadas[2] == 'O' && jogadas[4] == 'O' && jogadas[6] == 'O')) {
			venceuPartida(2, 4, 6);
		}
	}
}

function marcar(campo) {
	if (!terminou && jogadas[campo] == '') {
		jogadas[campo] = obterVez();
		document.getElementById(campo).innerHTML = jogadas[campo];
		verificaPartida();
	}
}

function reiniciarPartida() {
	jogadas[0] = '';
	jogadas[1] = '';
	jogadas[2] = '';
	jogadas[3] = '';
	jogadas[4] = '';
	jogadas[5] = '';
	jogadas[6] = '';
	jogadas[7] = '';
	jogadas[8] = '';
	document.getElementById('0').innerHTML = '';
	document.getElementById('1').innerHTML = '';
	document.getElementById('2').innerHTML = '';
	document.getElementById('3').innerHTML = '';
	document.getElementById('4').innerHTML = '';
	document.getElementById('5').innerHTML = '';
	document.getElementById('6').innerHTML = '';
	document.getElementById('7').innerHTML = '';
	document.getElementById('8').innerHTML = '';
	document.getElementById('0').style.color = '#000000';
	document.getElementById('1').style.color = '#000000';
	document.getElementById('2').style.color = '#000000';
	document.getElementById('3').style.color = '#000000';
	document.getElementById('4').style.color = '#000000';
	document.getElementById('5').style.color = '#000000';
	document.getElementById('6').style.color = '#000000';
	document.getElementById('7').style.color = '#000000';
	document.getElementById('8').style.color = '#000000';
	terminou = false;
}