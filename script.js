let N_SIZE = 3;
let EMPTY = '&nbsp;'
let boxes = [];
let turn = 'X';
let score = "";
let moves = "";
let Xwins = 0;
let Owins = 0;

/**
 * Initializes the Tic Tac Toe board and starts the game.
 */
function init() {
    let board = document.createElement('table');
    board.setAttribute('border', 1);
    board.setAttribute('cellspacing', 0);

    let identify = 1;
    for (let i = 0; i < N_SIZE; i++) {
        let row = document.createElement('tr');
        board.appendChild(row);
        for (let j = 0; j < N_SIZE; j++) {
            let cell = document.createElement('td');
            cell.setAttribute('height', 120);
            cell.setAttribute('width', 120);
            cell.setAttribute('align', 'center');
            cell.setAttribute('valign', 'center');
            cell.classList.add('col' + j, 'row' + i);
            if (i == j) {
                cell.classList.add('diagonal0');
            }
            if (j == N_SIZE - i - 1) {
                cell.classList.add('diagonal1');
            }
            cell.identifier = identify;
            cell.addEventListener('click', set);
            row.appendChild(cell);
            boxes.push(cell);
            identify += identify;
        }
    }

    document.getElementById('tictactoe').appendChild(board);
    startNewGame();
}

/**
 * New game
 */
function startNewGame() {
    score = {
        'X': 0,
        'O': 0
    };
    moves = 0;
    turn = 'X';
    boxes.forEach(function (square) {
        square.innerHTML = EMPTY;
    });
}

function win(clicked) {
    // Get all cell classes
    let memberOf = clicked.className.split(/\s+/);
    for (let i = 0; i < memberOf.length; i++) {
        let testClass = '.' + memberOf[i];
        let items = contains('#tictactoe ' + testClass, turn);
        // winning condition: turn == N_SIZE
        if (items.length == N_SIZE) {
            return true;
        }
    }
    return false;
}

function contains(selector, text) {
    let elements = document.querySelectorAll(selector);
    return [].filter.call(elements, function (element) {
        return RegExp(text).test(element.textContent);
    });
}

function set() {
    if (this.innerHTML !== EMPTY) {
        return;
    }
    this.innerHTML = turn;
    moves += 1;
    score[turn] += this.identifier;
    if (win(this) && turn == "X") {
        document.getElementById("winnerX").textContent = (`PLAYER X HAS WON ${Xwins + 1} GAMES`)
        Xwins++;
        document.getElementById("winner").textContent = (`WINS`);
    } else if (win(this) && turn == "O") {
        document.getElementById("winnerO").textContent = (`PLAYER O HAS WON ${Owins + 1} GANES`)
        Owins++;
        document.getElementById("winner").textContent = (`WINS`);
    } else if (moves === N_SIZE * N_SIZE) {
        document.getElementById("winner").textContent = (``);
        document.getElementById("turn").textContent = (`DRAW`);
    } else {
        turn = turn === 'X' ? 'O' : 'X';
        document.getElementById('turn').textContent = 'Player ' + turn;
    }
}

init();
