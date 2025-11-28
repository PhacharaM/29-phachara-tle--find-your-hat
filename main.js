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
    }
}

// update position
function checkStatus() {
     // Out of bounds
     if (playerRow < 0 || playerRow >= board.length ||
        playerCol < 0 || playerCol >= board[0].length)
        {
        console.log("Cannot move out of the board!");
        playing = false;
        return;
    }

	// Game rule
    let tile = board[playerRow][playerCol];

	if (tile === HOLE) {
        console.log("You fell in a hole! Game over.");
        playing = false;
    } else if (tile === HAT) {
        console.log("You found the hat! You win.");
        playing = false;
    } else {
        board[playerRow][playerCol] = PLAYER;
    }

 }



while (playing) {
    // Game play loop
    printBoard(board);

    const input = prompt("Which way? (w/a/s/d): ").toLowerCase();

    if (!["w", "a", "s", "d"].includes(input)) {
        console.log("Invalid input. Use w/a/s/d only.");
        playing = false;
    }


    movePlayer(input);
    checkStatus();
}

console.log("Game End");