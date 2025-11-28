"use strict";
import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });

// Board tiles
const PLAYER = "*";
const EMPTY = "░";
const HOLE = "O";
const HAT = "^";

// Hardcoded board
let board = [
	[PLAYER, EMPTY, HOLE],
	[EMPTY, HOLE, EMPTY],
	[EMPTY, HAT, EMPTY],
];

// Game state
let playerRow = 0;
let playerCol = 0;
let playing = true;

// Print board
function printBoard(board) {
	console.clear(); // call console.clear() before print each move
	for (let row of board) {
		console.log(row.join(" "));
		}
}


// Movement function
function movePlayer(direction) {
    board[playerRow][playerCol] = EMPTY;

	if (direction === "w") {
        playerRow--;
    } else if (direction === "s") {
        playerRow++;
    } else if (direction === "a") {
        playerCol--;
    } else if (direction === "d") {
        playerCol++;
    } else {
        console.log("Invalid input");
        return;
    }

    // Out of bounds
    if (newRow < 0 || newRow >= board.length ||
        newCol < 0 || newCol >= board[0].length) {
        console.log("Cannot move out of the board!");
        return;
    }

	// Game rule

    let tile = board[newRow][newCol];
	if (tile === HOLE) {
        console.log("You fell in a hole! Game over.");
    } else if (tile === HAT) {
        console.log("You found the hat! You win.");
    }

	// update position
    playerRow = newRow;
    playerCol = newCol;
    board[playerRow][playerCol] = PLAYER;
}



// Game play loop
printBoard(board);

const input = prompt("Which way? (w/a/s/d): ");

movePlayer(input);
printBoard(board);