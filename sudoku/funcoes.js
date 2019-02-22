function Quadrante(qua, col, lin) {
	this.q = qua,
	this.c = col,
	this.l = lin
}
var sudoku;
var restantes;
var reiniciar = true;
function get(col, lin) {
	return sudoku[col-1][lin-1];
}
function set(col, lin, val) {
	sudoku[col-1][lin-1] = val;
	verificarPossibRestantes(col, lin);
	reiniciar = true;
}
function obterNumQuad(c, l) {
	if ([1, 2, 3].includes(l)) {
		if ([1, 2, 3].includes(c)) {
			return 1;
		} else if ([4, 5, 6].includes(c)) {
			return 2;
		} else {
			return 3;
		}
	} else if ([4, 5, 6].includes(l)) {
		if ([1, 2, 3].includes(c)) {
			return 4;
		} else if ([4, 5, 6].includes(c)) {
			return 5;
		} else {
			return 6;
		}
	} else {
		if ([1, 2, 3].includes(c)) {
			return 7;
		} else if ([4, 5, 6].includes(c)) {
			return 8;
		} else {
			return 9;
		}
	}
}
function obterQuadrante(qua) {
	var colA = 7;
	if ([1, 4, 7].includes(qua)) {
		colA = 1;
	} else if ([2, 5, 8].includes(qua)) {
		colA = 4;
	}
	var linA = 7;
	if ([1, 2, 3].includes(qua)) {
		linA = 1;
	} else if ([4, 5, 6].includes(qua)) {
		linA = 4;
	}
	var colB = colA+1;
	var linB = linA+1;
	var colC = colB+1;
	var linC = linB+1;
	var quadro = [];
	quadro.push(get(colA, linA));
	quadro.push(get(colA, linB));
	quadro.push(get(colA, linC));
	quadro.push(get(colB, linA));
	quadro.push(get(colB, linB));
	quadro.push(get(colB, linC));
	quadro.push(get(colC, linA));
	quadro.push(get(colC, linB));
	quadro.push(get(colC, linC));
	var colQ = [];
	colQ.push(colA);
	colQ.push(colA);
	colQ.push(colA);
	colQ.push(colB);
	colQ.push(colB);
	colQ.push(colB);
	colQ.push(colC);
	colQ.push(colC);
	colQ.push(colC);
	var linQ = [];
	linQ.push(linA);
	linQ.push(linB);
	linQ.push(linC);
	linQ.push(linA);
	linQ.push(linB);
	linQ.push(linC);
	linQ.push(linA);
	linQ.push(linB);
	linQ.push(linC);
	return new Quadrante(quadro, colQ, linQ);
}
function analiseSimultanea(col, lin) {
	if (!get(col, lin)) {
		var possibilidades = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
		var quadrante = obterQuadrante(obterNumQuad(col, lin));
		for (var i = 1; i <= 9; i++) {
			var valor = get(col, i);
			if (valor) {
				removeArrayElementByValue(possibilidades, valor);
			}
			valor = get(i, lin);
			if (valor) {
				removeArrayElementByValue(possibilidades, valor);
			}
			valor = quadrante.q[i-1];
			if (valor) {
				removeArrayElementByValue(possibilidades, valor);
			}
		}
		if (possibilidades.length == 1) {
			set(col, lin, possibilidades[0]);
		}
	}
}
function verificarQuadrante(qua) {
	var possibilidades = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
	var posicao;
	var quadrante = obterQuadrante(qua);
	for (var i = 0; i < 9; i++) {
		var valor = quadrante.q[i];
		if (valor) {
			removeArrayElementByValue(possibilidades, valor);
		} else {
			posicao = i;
		}
	}
	if (possibilidades.length == 1) {
		set(quadrante.c[posicao], quadrante.l[posicao], possibilidades[0]);
	}
}
function verificarColuna(col) {
	var possibilidades = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
	var posicao;
	for (var i = 1; i <= 9; i++) {
		var valor = get(col, i);
		if (valor) {
			removeArrayElementByValue(possibilidades, valor);
		} else {
			posicao = i;
		}
	}
	if (possibilidades.length == 1) {
		set(col, posicao, possibilidades[0]);
	}
}
function verificarLinha(lin) {
	var possibilidades = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
	var posicao;
	for (var i = 1; i <= 9; i++) {
		var valor = get(i, lin);
		if (valor) {
			removeArrayElementByValue(possibilidades, valor);
		} else {
			posicao = i;
		}
	}
	if (possibilidades.length == 1) {
		set(posicao, lin, possibilidades[0]);
	}
}
function montarSudokuEmTela() {
	for (var i = 1; i <= 9; i++) {
		for (var j = 1; j <= 9; j++) {
			document.getElementById('col'+i+'_lin'+j).value = get(i, j);
		}
	}
}
function verificarPossibRestantes(col, lin) {
	var valor = sudoku[col][lin];
	if (valor) {
		var quad = obterQuadrante(obterNumQuad(col+1, lin+1));
		for (var i = 0; i < 9; i++) {
			removeArrayElementByValue(restantes[col][i], valor);
			removeArrayElementByValue(restantes[i][lin], valor);
			removeArrayElementByValue(restantes[quad.c[i]-1][quad.l[i]-1], valor);
		}
	}
}
function inicializarMatriz() {
	sudoku = [];
	restantes = [];
	for (var i = 1; i <= 9; i++) {
		var linhas = [];
		var restantesAux = [];
		for (var j = 1; j <= 9; j++) {
			linhas.push(document.getElementById('col'+i+'_lin'+j).value);
			restantesAux.push(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
		}
		sudoku.push(linhas);
		restantes.push(restantesAux);
	}
}
function solucionarSudoku() {
	//inicializarMatriz();
	while (reiniciar) {
		reiniciar = false;
		for (var i = 1; i <= 9; i++) {
			verificarLinha(i);
			verificarColuna(i);
			verificarQuadrante(i);
		}
		if (!reiniciar) {
			for (var i = 1; i <= 9; i++) {
				for (var j = 1; j <= 9; j++) {
					analiseSimultanea(i, j);
				}
			}
			if (!reiniciar) {
				for (var i = 0; i < 9; i++) {
					for (var j = 0; j < 9; j++) {
						verificarPossibRestantes(i, j);
					}
				}
			}
		}
	}
	//montarSudokuEmTela();
}