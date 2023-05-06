const statusDisplay = document.querySelector('.status');

let gameActive = true;
let currentPlayer = "X";
let comp = "O";

//This is how we're linking the scores to the html classes
let aI = document.querySelector("#aI");
let player = document.querySelector("#player");
let draws = document.querySelector('#draws');

//Variables that hold the score incrimenting
let pScore = 0;
let aIscore = 0;
let ties = 0;

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    console.log("User moved to a cell");
    console.log(clickedCellIndex);
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
    console.log(currentPlayer);
}

function handleResultValidation() {
    //if theres no winner, the players are changed and the computer makes a move
    checkWin();

    if (gameActive) {
        handlePlayerChange();

        //handleComputerMove();
        //This creates a dely to make it seem like the computer is making a move
    setTimeout(() => {handleComputerMove()}, 800)
    }

}

function checkWin() {
    //checks to see if there is a winner
    //depending on that, it will run a set of instructons
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        
        //checks to see if 3 consecutive cells match, if not the game continues
        if (a === '' || b === '' || c === '') {
            continue;
        }
        //if they are equal, the game stops and the cells are highlighted
        if (a === b && b === c) {
            roundWon = true;
           
            //This highlights the winning cells and incriments the score board whenever theres a winner
            document.getElementById(winCondition[0]).style.backgroundColor = "#82ccdd";
            document.getElementById(winCondition[1]).style.backgroundColor = "#82ccdd";
            document.getElementById(winCondition[2]).style.backgroundColor = "#82ccdd";
            if(currentPlayer == "X"){
                pScore++;
                //console.log(pScore)
                player.innerHTML = `Player Score: ${pScore}`;
                statusDisplay.innerHTML = winningMessage();
                statusDisplay.style.color = "rgb(251,100,204)";
            }
            if(currentPlayer == comp){
                aIscore++;
                aI.innerHTML = `Ai Score: ${aIscore}`;
                statusDisplay.innerHTML = winningMessage();
                statusDisplay.style.color = "rgb(251,100,204)";
            }
            winningMessage();
            break;
        }
        
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        console.log(winningMessage()); //added change
        return 1;
    }

    //if theres a winner, display the winning message "__ is the winner"
    //if theres no winner, display the draw message "game ended in a draw"

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";

        //inciments and keeps track of ties
        ties++;
        draws.innerHTML = `Ties: ${ties}`;
        console.log(drawMessage()); //added change
        return;
    }
}

function handleComputerMove() {
    //computer moves randomly and checks to see if it made a winning move.
    //if not, it changes players and the game continues
    pickMove()
    if (!checkWin())
        handlePlayerChange()
    
    console.log("AI moved to a cell");
}


//added change
function pickMove(){

    //randomly finds available spot by looping through the gamespace
    while(true) {
        m = Math.floor(Math.random() * 8)
        if (gameState[m] == '')
            break;
    }

    gameState[m] = currentPlayer;
    document.getElementById(m).innerHTML = currentPlayer;


    // m will have the spot
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    //checks to see is the current cell is available and if the game is active
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.style.color = "rgb(65, 65, 65)";
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");

    //resets the background color of the game board to white
    document.querySelectorAll('.cell').forEach(cell => cell.style.backgroundColor = "white");
    console.log('game reset'); //added change
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);