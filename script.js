
const gameBoard = (function (){
    const board = [];
    const rows = 3;
    const columns = 3;
    
    const makeBoard = () => {
        for(let i = 0; i < rows; i++){
            board[i] = [];
            for(let j = 0; j < columns; j++){
                board[i][j] = Cell();
            }
        }
    }

    const clearBoard = () => {
        board.forEach(row => {
            row.forEach(cell => {
                let track = "";
                cell.markCell(track);
            });
        }); 
    }

    const getBoard = () => board;

    const putMarker = (player, cellBtn, x, y) => {
        cellBtn.textContent = player;
        board[x][y].markCell(player);
    }

    return {
        getBoard,
        makeBoard,
        clearBoard,
        putMarker
    }


})();

function Cell(){
    let mark = ' ';

    const markCell = (player) => {
        mark = player;
    }

    const getMark = () => mark;

    return{
        markCell,
        getMark
    };
}

function gameController(){

    const playerOne = {
        name: 'Player 1',
        mark: 'o',
        score: 0
    }

    const playerTwo = {
        name: 'Player 2',
        mark: 'x',
        score: 0
    }

    let currentPlayer = '';
    domLogic.populateDomCells();
    gameBoard.makeBoard();
    const domCellObj = domLogic.getDomCells();
    const gameBoardCells = gameBoard.getBoard();
    const toReset = domLogic.getResetBtn();
    const roundsBtn = domLogic.getRounds();
    const playerNamesBtn = domLogic.getToNamePlayer();
    const player1_name = document.getElementById('player1-name');
    const player2_name = document.getElementById('player2-name');
    const player1_score = document.getElementById('player1-score');
    const player2_score = document.getElementById('player2-score');
    let rounds = 0;

    const winHor = [[0, 1, 2], [0, 1, 2], [0, 1, 2]];
    const winVert = [[0, 0 , 0], [1, 1, 1], [2, 2, 2]];
    const winDiag = [[0, 1, 2], [2, 1, 0]];

    toReset.addEventListener('click', () => {
        clearAll();
    });

    roundsBtn.addEventListener('click', () => {
        rounds = Number(prompt("Enter number of rounds to play:"));
    });

    playerNamesBtn.addEventListener('click', () => {
        playerOne.name = prompt("Player 1's name:");
        playerTwo.name = prompt("Player 2's name:");
        player1_name.textContent = playerOne.name;
        player2_name.textContent = playerTwo.name;
    })

    const cellBtnClicked = function(cellBtn, index1, index2) {
        playNextRound(cellBtn, index1, index2);
    };

    domCellObj.forEach( (row, rowIndex) => {
        row.forEach( (cellButton, columnIndex) => {
            cellButton.addEventListener('click', function(){
                cellBtnClicked(cellButton, rowIndex, columnIndex);
            });
        })
    });

    const play = (cellBtn, x, y) => {
        if(!(cellBtn.textContent === "x" | cellBtn.textContent === "o")){
            gameBoard.putMarker(currentPlayer.mark, cellBtn, x, y);
            checkWin();
            printBoard();
        }
        else{
            return;
        }
        
    }

    const clearAll = () => {
        restart();
        playerOne.score = 0;
        playerTwo.score = 0;
        player1_score.textContent = `Score: 0`;
        player2_score.textContent = `Score: 0`;
        currentPlayer = playerTwo;
    }

    const restart = () => {
        gameBoard.clearBoard();
        domLogic.clearDomCells();

    }

    const checkWin = () => {
        const win = isWin(currentPlayer.mark, winHor, winVert, winDiag);
        if(win){
            currentPlayer.score++;
            if(currentPlayer.name === playerOne.name){
                player1_score.textContent = `Score: ${currentPlayer.score}`;
            }
            else{
                player2_score.textContent = `Score: ${currentPlayer.score}`;
            }
            rounds--;
            if(rounds === 0){
                if(playerOne.score > playerTwo.score){
                    alert(`${playerOne.name} wins by ${playerOne.score} - ${playerTwo.score}`);
                }
                else if(playerOne.score === playerTwo.score){
                    alert(`Game drawn by ${playerOne.score} - ${playerTwo.score}`);
                }
                else{
                    alert(`${playerTwo.name} wins by ${playerTwo.score} - ${playerOne.score}`);
                }
            }
            restart();
        }
    }

    const isWin = (player, hor, vert, diag) => {

        for(let i = 0; i < hor.length; i++){
            let strike = 0;
            const win = hor[i];
            for(let j = 0; j < win.length; j++){
                const index = win[j]
                const cell = gameBoardCells[i][index];

                if(cell.getMark() === player){
                    strike++;
                }
            }
            if(strike == 3){
                return true;
            }
        }

        for(let i = 0; i < vert.length; i++){
            let strike = 0;
            const win = vert[i];
            for(let j = 0; j < win.length; j++){
                const index = win[j]
                const cell = gameBoardCells[j][index];

                if(cell.getMark() === player){
                    strike++;
                }
            }
            if(strike == 3){
                return true;
            }
        }

        for(let i = 0; i < diag.length; i++){
            let strike = 0;
            const win = diag[i];
            for(let j = 0; j < win.length; j++){
                const index = win[j];
                const cell = gameBoardCells[j][index];

                if(cell.getMark() === player){
                    strike++;
                }
            }
            if(strike == 3){
                return true;
            }
        }
        return false;
    }

    const printBoard = () => {
        gameBoard.getBoard();
    }

    function playNextRound(cellBtn, a, b){
        if(rounds === 0){
            alert("Game over please Reset game and set rounds to play by pressing Rounds To Play!");
            return;
        }
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        play(cellBtn, a, b);
    }


    return{
        play,
        playNextRound
    };

}

const domLogic = (function (){

    const domCells = [];
    const resetBtn = document.querySelector(".reset-game");
    const roundsToPlay = document.querySelector('.rounds-to-play')
    const namePlayers = document.querySelector('.name-players')

    const populateDomCells = () => {
        for(let i = 0; i < 3; i++){
            domCells[i] = [];
            for(let j = 0; j < 3; j++){
                const id = "" + i + "" + j;
                const cell = window.document.getElementById(id);
                domCells[i][j] = cell;
            }
        }
    }

    const getDomCells = () => domCells;
    const getResetBtn = () => resetBtn;
    const getRounds = () => roundsToPlay;
    const getToNamePlayer = () => namePlayers;

    const clearDomCells = () => {
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                const cell = domCells[i][j];
                cell.textContent = "♥";
            }
        }
    }

    return{
        clearDomCells,
        getDomCells,
        populateDomCells,
        getResetBtn,
        getRounds,
        getToNamePlayer,
    }
})();

function playGame(){
    gameController();
   
}

playGame();