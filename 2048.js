var board;
var rows = 4;
var columns = 4;
var score = 0;

window.onload = function() {
	startGame();
}

function startGame() {
	board = [
		[4, 2, 2, 0],
		[16, 16, 8, 8],
		[0, 2, 2, 0],
		[0, 0, 4, 0]
	];

	for (let i = 0; i < rows; ++i) {
		for (let j = 0; j < columns; ++j) {
			let tile = document.createElement("div");
			tile.id = i.toString() + "_" + j.toString();
			let value = board[i][j];	
			updateTile(tile, value);
			document.getElementById("board").append(tile);
		}
	}
}

function updateTile(tile, value) {
	tile.innerText = "";
	tile.classList.value = "";
	tile.classList.add("tile");
	tile.innerText = value;
	if (value > 0) {
		tile.classList.add("tile" + value.toString());
		tile.style.userSelect = "auto";
	} else if (0 === value) {
		tile.style.userSelect = "none";
	}
}

function moveLeft() {
	for (let i = 0; i < rows; ++i) {
		let row = board[i];
		row = filterZeros(row);
		for (let j = 0; j < row.length; ++j) {
			if (row[j] === row[j + 1]) {
				row[j] *= 2;
				row[j + 1] = 0;
				score += row[j];
			}
		}
		row = filterZeros(row);
		while (row.length < columns) {
			row.push(0);
		}
		board[i] = row;

		for (let j = 0; j < columns; j++) {
			let tile = document.getElementById(i.toString() + "_" + j.toString());
			let value = board[i][j];
			updateTile(tile, value);
		}
	}
	document.getElementById("score").innerText = score;
}

function moveRight() {
	for (let i = 0; i < rows; ++i) {
		let row = board[i];
		row = filterZeros(row);
		for (let j = 0; j < row.length; ++j) {
			if (row[j] === row[j + 1]) {
				row[j + 1] *= 2;
				row[j] = 0;
				score += row[j + 1];
			}
		}
		row = filterZeros(row);
		while (row.length < columns) {
			row.unshift(0);
		}
		board[i] = row;

		for (let j = 0; j < columns; j++) {
			let tile = document.getElementById(i.toString() + "_" + j.toString());
			let value = board[i][j];
			updateTile(tile, value);
		}
	}
	document.getElementById("score").innerText = score;
}

function filterZeros(row) {
	return row.filter(number => number != 0);
}
