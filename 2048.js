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
		[16, 16, 2, 8],
		[2, 2, 2, 0],
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

function moveLeftAndUpdate() {
	for (let i = 0; i < rows; ++i) {
		board[i] = moveLeft(i, board[i]);
		updateTiles(i);
	}
	document.getElementById("score").innerText = score;
}

function moveLeft(i, row) {
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
	return row;
}

function moveRightAndUpdate() {
	for (let i = 0; i < rows; ++i) {
		board[i] = moveRight(i, board[i]);
		updateTiles(i);
	}
	document.getElementById("score").innerText = score;
}

function moveRight(i, row) {
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
	return row;
}

function moveUpAndUpdate() {
	for (let i = 0; i < rows; ++i) {
		let column = [];
		moveUp(i, column);
	}
	for (let i = 0; i < rows; ++i) {
		updateTiles(i);	
	}
	document.getElementById("score").innerText = score;
}

function moveUp(i, column) {
	for (let j = 0; j < columns; ++j) {
		column.push(board[j][i]);
	}
	column = moveLeft(i, column);
	updateColumn(i, column);
}

function updateColumn(i, column) {
	for (let j = 0; j < columns; ++j) {
		board[j][i] = column[j];
	}
}

function moveDownAndUpdate() {
	for (let i = 0; i < rows; ++i) {
		let column = [];
		moveDown(i, column);
	}
	for (let i = 0; i < rows; ++i) {
		updateTiles(i);	
	}
	document.getElementById("score").innerText = score;
}

function moveDown(i, column) {
	for (let j = 0; j < columns; ++j) {
		column.push(board[j][i]);
	}
	console.log(column);
	column = moveRight(i, column);
	updateColumn(i, column);
}

function filterZeros(row) {
	return row.filter(number => number != 0);
}

function updateTiles(i) {
	for (let j = 0; j < columns; j++) {
		let tile = document.getElementById(i.toString() + "_" + j.toString());
		let value = board[i][j];
		updateTile(tile, value);
	}
}
