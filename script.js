
function GameBoard(){
    const board = [];
    const rows = 3;
    const columns = 3;
    
    
    for(let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < columns; j++){
            board[i].push(Cell());
        }
    }

    const getBoard = () => {
        console.log( "_______________________________________" );
        board.forEach(row => {
            let track = '| ';
            row.forEach(cell => {
                track = track + cell.getMark() + " | "
            });
            console.log(track);
        });
    };

    const isWin = (player, hor, vert, diag) => {

        for(let i = 0; i < hor.length; i++){
            let strike = 0;
            const win = hor[i];
            for(let j = 0; j < win.length; j++){
                const index = win[j]
                const cell = board[i][index];

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
                const cell = board[j][index];

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
                const cell = board[j][index];

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

    const putMarker = (player, x, y) => {
        board[x][y].markCell(player);
    }

    return {
        getBoard,
        putMarker,
        isWin
    }


}

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

function Player(player){
    this.player = player;
}

function GameController(){
    const playerOne = new Player('o');
    const playerTwo = new Player('x');
    const gameBoard = GameBoard();
    const winHor = [[0, 1, 2], [0, 1, 2], [0, 1, 2]];
    const winVert = [[0, 0 , 0], [1, 1, 1], [2, 2, 2]];
    const winDiag = [[0, 1, 2], [2, 1, 0]];

    currentPlayer = playerOne;

    const play = (x, y) => {
        gameBoard.putMarker(currentPlayer.player, x, y);
        checkWin();
        printBoard();
        //playNextRound();
    }

    const checkWin = () => {
        const win = gameBoard.isWin(currentPlayer.player, winHor, winVert, winDiag);
        console.log(`win: ${win}`);
        if(win){
            window.stop();
        }
    }

    const printBoard = () => {
        gameBoard.getBoard();
    }

    function playNextRound(a, b){
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        play(a, b);
    }


    return{
        play,
        playNextRound
    };

}

function playGame(){
    const game = GameController();
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            game.playNextRound(i, j);
        }
    }

}

playGame();