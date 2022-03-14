var nonograma;
var lin;
var col;
function getValue(lin, col) {
	return nonograma[lin][col];
}
function getCell(lin, col) {
	return document.getElementById((lin+1) + '_' + (col+1));
}
function gerar() {
	document.getElementById('gerar').style.display = 'none';
	nonograma = [];
	var tab = document.getElementById('grid');
	lin = document.getElementById('qtdLin').value;
	col = document.getElementById('qtdCol').value;
	document.getElementById('qtdLin').style.display = 'none';
	document.getElementById('qtdCol').style.display = 'none';
	for (var l = 1; l <= lin; l++) {
		var linhas = [];
		var tr = document.createElement('tr');
		for (var c = 1; c <= col; c++) {
			if (c > 1) {
				linhas.push('B');
			}
			var td = document.createElement('td');
			td.id = (l-1) + '_' + (c-1);
			tr.appendChild(td);
			if (c == 1 && l == 1) {
				td.classList.add('top-left_corner');
			}
			if (c == 1 ^ l == 1) {
				td.appendChild(document.createTextNode('\u2139'));
				td.classList.add('info');
			}
		}
		if (l > 1) {
			nonograma.push(linhas);
		}
		tab.appendChild(tr);
	}
	document.getElementById('valores').style.display = 'block';
	document.getElementById('definir').style.display = 'block';
	document.getElementById('definir').style.marginTop = '5px';
}
function montarNonogramaEmTela() {
	for (var l = 0; l < lin-1; l++) {
		for (var c = 0; c < col-1; c++) {
			if (getValue(l, c) != 'B') {
				var td = getCell(l, c);
				var div = document.createElement('div');
				if (getValue(l, c) == 'P') {
					div.classList.add('yes');
				} else if (getValue(l, c) == 'V') {
					div.classList.add('no');
				}
				td.appendChild(div);
			}
		}
	}
}