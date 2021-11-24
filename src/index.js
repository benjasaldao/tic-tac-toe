
function TicTacToe(gameConfig) {
    this.turn = "";
    this.turnIndicator  = gameConfig.turnIndicator;
    this.gameContainer = gameConfig.gameContainer;
    this.buttonContainer = gameConfig.buttonContainer;
    this.X = gameConfig.X;
    this.O = gameConfig.O;
    this.initGame = this.initGame.bind(this);
    this.putMark = this.putMark.bind(this);
    this.gameMatrix = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]
}

TicTacToe.prototype.initGame = function() {
    this.buttonContainer.style.display = "none";
    this.gameContainer.style.display = "flex";

    this.addClickEvent()
    this.setFirstTurn()
}

TicTacToe.prototype.setFirstTurn = function() {
    const randomNum = Math.floor(Math.random() * 2)
    if (randomNum === 0) {
        this.turn = "X";
    } else if (randomNum === 1) {
        this.turn = "O";
    } else {
        alert("Algo salio mal! mejor recarga la pagina!")
    }
    this.showTurn()
}

TicTacToe.prototype.showTurn = function() {
    this.turnIndicator.innerHTML = this.turn;
}

TicTacToe.prototype.changeTurn = function() {
    if (this.turn === "X") {
        this.turn = "O";
    } else if (this.turn === "O") {
        this.turn = "X";
    } else {
        alert("Algo salio muy mal! mejor recarga la pagina!")
    }
    this.showTurn()
}

TicTacToe.prototype.addClickEvent = function () {
    this.gameContainer.addEventListener("click", this.putMark)
}

TicTacToe.prototype.removeClickEvent = function() {
    this.gameContainer.removeEventListener("click", this.putMark);
}

TicTacToe.prototype.putMark = function(ev) {
    const targetCage = ev.target.dataset.id;
    if (targetCage) {
        const mark = this[this.turn].cloneNode(true);
        const targetDiv = document.getElementById(targetCage)
        targetDiv.appendChild(mark);
        this.completeMatrix(targetCage);
        if (this.didSomebodyWin()) {
            this.finishGame(true)
        } else if(this.isMatrixFull()) {
            this.finishGame(false)
        } else {
            this.changeTurn()
        }
    }
}

TicTacToe.prototype.completeMatrix = function(cageId) {
    switch (cageId) {
        case "1":
            this.gameMatrix[0][0] = this.turn;
            break
        case "2":
            this.gameMatrix[0][1] = this.turn;
            break
        case "3":
            this.gameMatrix[0][2] = this.turn;
            break
        case "4":
            this.gameMatrix[1][0] = this.turn;
            break
        case "5":
            this.gameMatrix[1][1] = this.turn;
            break
        case "6":
            this.gameMatrix[1][2] = this.turn;
            break
        case "7":
            this.gameMatrix[2][0] = this.turn;
            break
        case "8":
            this.gameMatrix[2][1] = this.turn;
            break
        case "9":
            this.gameMatrix[2][2] = this.turn;
            break  
    }
}

TicTacToe.prototype.didSomebodyWin = function() {
    if (this.isHorizontalLine() || this.isVerticalLine() || this.isDiagonal()) {
        return true
    } else {
        return false
    }
}

TicTacToe.prototype.isHorizontalLine = function() {
    for (let i = 0; i < this.gameMatrix.length; i++ ) {
        if (this.gameMatrix[i].every(currentValue => currentValue === this.turn)) {
            return true
        }
    }
    return false;
}

TicTacToe.prototype.isVerticalLine = function () {
    let verticalLine = [];
    for (let i = 0; i < this.gameMatrix.length; i++) {
        for (let j = 0; j < this.gameMatrix.length; j++) {
            if (j === 0) {
                verticalLine = []
            }
            verticalLine.push(this.gameMatrix[j][i]);
            if(verticalLine.length === 3) {
                if (verticalLine.every(currentValue => currentValue === this.turn)) {
                    return true;
                }
            }
        }
    }
}

TicTacToe.prototype.isDiagonal = function() {
    const matrix = this.gameMatrix;

    if (matrix[0][0] === this.turn && matrix[1][1] === this.turn && matrix[2][2] === this.turn) {
        return true;
    } else if (matrix[0][2] === this.turn && matrix[1][1] === this.turn && matrix[2][0] === this.turn) {
        return true;
    } else {
        return false;
    }
}
TicTacToe.prototype.isMatrixFull = function() {
    let matrixInAList = [];
    for (let i = 0; i < this.gameMatrix.length; i++) {
        for (let j = 0; j < this.gameMatrix[i].length; j++) {
            matrixInAList.push(this.gameMatrix[i][j]);
        }
    }
    return !matrixInAList.includes("");
}

TicTacToe.prototype.finishGame = function(isWinner) {
    this.removeClickEvent()
    if(isWinner) {
        alert(this.turn + " gano la partida");
    } else {
        alert("Empate!")
    }
}

const initGameButton = document.getElementById("init-game");

const gameConfig = {
    turnIndicator: document.getElementById("turn"),
    gameContainer: document.getElementById("game-container"),
    buttonContainer: document.getElementById("button-container"),
    X: document.getElementById("X"),
    O: document.getElementById("O"),
}

const game = new TicTacToe(gameConfig);

initGameButton.onclick = game.initGame;
