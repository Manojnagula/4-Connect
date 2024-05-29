var playerRed = "r";
var playerYellow = "y"; // Changed to lowercase 'y' for consistency
var currPlayer = playerRed;

var gameOver = false;
var board;
var currColumns;

var columns = 7;
var rows = 6;

window.onload = function () {
    setGame();
};

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // Initialize the board with empty spaces
            row.push(' ');

            // Create HTML elements for the game board
            let title = document.createElement("div");
            title.id = r.toString() + "-" + c.toString();
            title.classList.add('title');
            title.onclick = setPiece; // Assigned event directly
            document.getElementById('board').append(title);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (currColumns[c] < 0) { // Check if column is full
        return;
    }

    r = currColumns[c];
    board[r][c] = currPlayer;

    let title = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        title.classList.add("red-piece");
        currPlayer = playerYellow;
    } else {
        title.classList.add("yellow-piece");
        currPlayer = playerRed;
    }
    currColumns[c]--; // Decrement r before updating the board
    checkWinner(); // Check for a winner after each move
}

function checkWinner() {
    // Check horizontally
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (
                    board[r][c] == board[r][c + 1] &&
                    board[r][c] == board[r][c + 2] &&
                    board[r][c] == board[r][c + 3]
                ) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    //vertically
    for(let c = 0;c < columns; c++){
        for(let r = 0 ; r<rows-3; r++){ // Fixed the loop boundary
            if(board[r][c]!=' '){
                if(board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    // anti - diagonally
    for(let r = 0; r<rows -3; r++){
        for(let c = 0; c<columns-3; c++){
            if(board[r][c] != ' '){
                if(board[r][c]==board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) // Fixed the typo here
                {
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    // diagonally
    for(let r =3; r<rows; r++){
        for(let c=0; c<columns-3; c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r-1][c+1] && board[r-1][c+1]==board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = "Red wins";
    } else {
        winner.innerText = "Yellow wins";
    }
    gameOver = true;
}
