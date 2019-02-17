function Quadrante(qua, col, lin) {
	this.q = qua,
	this.c = col,
	this.l = lin
}
var sudoku;
var continuar = true;
function get(col, lin) {
	return sudoku[col-1][lin-1];
}
function set(col, lin, val) {
	sudoku[col-1][lin-1] = val;
	continuar = true;
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
function verificaQuadrante(qua) {
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
function verificaColuna(col) {
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
function verificaLinha(lin) {
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
function inicializarMatriz() {
	sudoku = [];
	for (var i = 1; i <= 9; i++) {
		var linhas = [];
		for (var j = 1; j <= 9; j++) {
			linhas.push(document.getElementById('col'+i+'_lin'+j).value);
		}
		sudoku.push(linhas);
	}
}
function solucionarSudoku() {
	//inicializarMatriz();
	while (continuar) {
		for (var i = 1; i <= 9; i++) {
			continuar = false;
			verificaLinha(i);
			verificaColuna(i);
			verificaQuadrante(i);
			if (!continuar) {
				//
			}
		}
	}
	//montarSudokuEmTela();
}