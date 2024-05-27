



var playerRed = "r"
var playerYellow = "Y"
var currPlayer = playerRed;

var gameOver = false
var board;
var currColumns;

var columns = 7
var rows = 6;

window.onload = function(){
    setGame();
}

function setGame(){
    board = [];
    currColumns = [5,5,5,5,5,5,5]

    for(let r = 0; r< rows; r++){
        let row=[]
        for(let c=0; c<columns;c++){
            //JS
            row.push(' ');

            //HTML
            let title = document.createElement("div")
            title.id = r.toString() + "-" + c.toString();
            title.classList.add('title')
            title.addEventListener('click',setPiece);
            document.getElementById('board').append(title)


        }
        board.push(row);
    }   
}

function setPiece(){
    if(gameOver){
        return;
    }
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currColumns[c];
    if(r<0){
        return;
    }

    board[r][c] = currPlayer;
    let title = document.getElementById(r.toString()+"-"+c.toString());
    if(currPlayer == playerRed){
        title.classList.add("red-piece");
        currPlayer = playerYellow;
    }
    else{
        title.classList.add("yellow-piece")
        currPlayer = playerRed;
    }
    r -= 1;
    currColumns[c] = r;
}

function checkWinner(){
    for(let r=0; r<row; r++)
    {
        for(let c=0; c<columns-3; c++)
        {
            if(board[r][c] != ' '){
                if(board[r][c] == board[r][c+1] && board[r][c+2] && board[r][c+2])
            }
        }
    }
}