let currentPlayer = 'X';
let cells = document.querySelectorAll('.cell');
let turn = document.getElementById('turn');
let result = document.getElementById('result');
let restartBtn = document.getElementById('restartBtn');
let popup = document.getElementById('popup');
let winnerMessage = document.getElementById('winnerMessage');
//load sound effects
let moveSound = new Audio("movesound.mp3");
let winSound = new Audio ("winsound.mp3");

function cellClicked(index) {
    if (!cells[index].textContent && !result.textContent) {
        cells[index].textContent = currentPlayer;
        moveSound.play();
        if (checkWinner()) {
            winnerMessage.textContent = "Player " + currentPlayer + " wins!";
            popup.style.display = 'block';
            winSound.play();
            return;
        }
        if (checkDraw()) {
            winnerMessage.textContent = "It's a draw!";
            popup.style.display = 'block';
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turn.textContent = "Player " + currentPlayer + "'s turn";
    }
}

function checkWinner() {
    let lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let line of lines) {
        let [a, b, c] = line;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return Array.from(cells).every(cell => cell.textContent);
}

function newGame() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    turn.textContent = "Player " + currentPlayer + "'s turn";
    result.textContent = '';
    popup.style.display = 'none'; // Hide the popup
}

function closePopup() {
    popup.style.display = 'none';
}

restartBtn.style.display = 'none'; // Initially hide the restart button

turn.textContent = "Player " + currentPlayer + "'s turn";
