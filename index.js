document.addEventListener("DOMContentLoaded", function() {
    const chessboard = document.getElementById("chessboard");
    let knightPosition = 1; // Starting position at the second square
    let automaticMove = false; // Variable to track automatic movement mode
    let moveCounter = 0; // Counter to track the number of knight movements
    const visitedSquares = new Set(); // Set to keep track of visited squares

    // Create the chessboard
    for (let i = 0; i < 64; i++) {
        const square = document.createElement("div");
        square.className = "square";
        square.classList.add((i + Math.floor(i / 8)) % 2 === 0 ? "white" : "black");
        chessboard.appendChild(square);
    }

    // Move the knight to the initial position and highlight valid moves
    moveKnight(knightPosition);

    // Function to move the knight and highlight the path
    function moveKnight(newPosition) {
        const squares = document.querySelectorAll(".square");
        squares[knightPosition].textContent = ""; // Clear previous knight position
        squares[knightPosition].classList.remove("knight"); // Remove knight class

        squares[newPosition].classList.add("knight", "visited"); // Add visited class to the new position

        knightPosition = newPosition; // Update knight position
        moveCounter++; // Increment movement counter
        updateMoveCounter(); // Update the display of movement counter
        visitedSquares.add(newPosition); // Add current position to visited squares

        // Highlight possible moves from the new position
        highlightPossibleMoves(newPosition);
    }

    // Function to update the display of the movement counter
    function updateMoveCounter() {
        const counterDisplay = document.getElementById("moveCounter");
        counterDisplay.textContent = moveCounter;
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

    // Function to highlight possible moves from a given position
    function highlightPossibleMoves(position) {
        const squares = document.querySelectorAll(".square");
        const possibleMoves = getValidMoves(position);
        squares.forEach((square, index) => {
            if (possibleMoves.includes(index)) {
                square.classList.add("highlight");
            } else {
                square.classList.remove("highlight");
            }
        });
    }

    // Event listener to handle knight movement on click
    chessboard.addEventListener("click", function(event) {
        if (!automaticMove) {
            const target = event.target;
            if (target.classList.contains("square")) {
                const squares = document.querySelectorAll(".square");
                const newPosition = Array.from(squares).indexOf(target);
                if (isValidMove(newPosition)) {
                    moveKnight(newPosition);
                }
            }
        }
    });

    // Function to check if a move is valid according to knight's movement rules
    function isValidMove(newPosition) {
        const possibleMoves = getValidMoves(knightPosition);
        return possibleMoves.includes(newPosition);
    }

    // Button event listener to toggle automatic movement mode
    const toggleButton = document.getElementById("toggleButton");
    toggleButton.addEventListener("click", function() {
        automaticMove = !automaticMove;
        if (automaticMove) {
            startAutomaticMove();
        }
    });

    // Function to start automatic movement
    function startAutomaticMove() {
        const totalSquares = 64;
        const interval = setInterval(() => {
            if (automaticMove) {
                const validMoves = getValidMoves(knightPosition);
                const unvisitedMoves = validMoves.filter(move => !visitedSquares.has(move));
                if (unvisitedMoves.length === 0) {
                    clearInterval(interval);
                    return;
                }
                const randomMove = unvisitedMoves[Math.floor(Math.random() * unvisitedMoves.length)];
                moveKnight(randomMove);
                if (visitedSquares.size === totalSquares) {
                    clearInterval(interval);
                }
            } else {
                clearInterval(interval);
            }
        }, 500); // Adjust the interval for smoother or faster animation
    }
});
