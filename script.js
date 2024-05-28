document.addEventListener("DOMContentLoaded", function() {
    const chessboard = document.getElementById("chessboard");

    // Create the chessboard
    for (let i = 0; i < 64; i++) {
        const square = document.createElement("div");
        square.className = "square";
        square.classList.add((i + Math.floor(i / 8)) % 2 === 0 ? "white" : "black");
        chessboard.appendChild(square);
    }

    // Initialize the knight position
    let knightPosition = Math.floor(Math.random() * 64);
    moveKnight(knightPosition);

    // Function to move the knight
    function moveKnight(newPosition) {
        const squares = document.querySelectorAll(".square");
        squares[knightPosition].innerHTML = ""; // Clear previous knight position
        squares[knightPosition].classList.remove("knight");

        squares[newPosition].innerHTML = "&#9822;"; // '&#9822;' is the HTML entity for the knight symbol
        squares[newPosition].classList.add("knight");

        knightPosition = newPosition; // Update knight position

        // Remove highlights from all squares
        squares.forEach(square => {
            square.classList.remove("highlight");
        });

        // Highlight possible moves
        const possibleMoves = getValidMoves(knightPosition);
        possibleMoves.forEach(move => {
            squares[move].classList.add("highlight");
        });
    }

    // Event listener to handle knight movement on click
    chessboard.addEventListener("click", function(event) {
        const target = event.target;
        if (target.classList.contains("square")) {
            const squares = document.querySelectorAll(".square");
            const newPosition = Array.from(squares).indexOf(target);
            if (isValidMove(knightPosition, newPosition)) {
                moveKnight(newPosition);
            }
        }
    });

    // Function to check if a move is valid according to knight's movement rules
    function isValidMove(currentPosition, newPosition) {
        const possibleMoves = getValidMoves(currentPosition);
        return possibleMoves.includes(newPosition);
    }

    // Function to get valid moves for the knight from a given position
    function getValidMoves(position) {
        const x = Math.floor(position / 8);
        const y = position % 8;
        const dx = [-2, -1, 1, 2, 2, 1, -1, -2];
        const dy = [1, 2, 2, 1, -1, -2, -2, -1];
        const validMoves = [];

        for (let i = 0; i < 8; i++) {
            const newX = x + dx[i];
            const newY = y + dy[i];
            if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
                validMoves.push(newX * 8 + newY);
            }
        }

        return validMoves;
    }
});
