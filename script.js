// Create the chessboard
const board = document.getElementById('chessboard');

// Initialize the board as a 2D array
let boardState = [
    ['rookB', 'knightB', 'bishopB', 'queenB', 'kingB', 'bishopB', 'knightB', 'rookB'],
    ['pawnB', 'pawnB', 'pawnB', 'pawnB', 'pawnB', 'pawnB', 'pawnB', 'pawnB'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['pawnW', 'pawnW', 'pawnW', 'pawnW', 'pawnW', 'pawnW', 'pawnW', 'pawnW'],
    ['rookW', 'knightW', 'bishopW', 'queenW', 'kingW', 'bishopW', 'knightW', 'rookW']
];

// Define piece symbols
const pieceSymbols = {
    'rookB': '♜', 'knightB': '♞', 'bishopB': '♝', 'queenB': '♛', 'kingB': '♚', 'pawnB': '♟',
    'rookW': '♜', 'knightW': '♞', 'bishopW': '♝', 'queenW': '♛', 'kingW': '♚', 'pawnW': '♟'
};

// Generate the board
for (let i = 0; i < 8; i++) {
    let row = document.createElement('tr');
    for (let j = 0; j < 8; j++) {
        let cell = document.createElement('td');
        cell.id = i + '-' + j;
        if ((i + j) % 2 === 0) {
            cell.className = 'light';
        } else {
            cell.className = 'dark';
        }
        if (boardState[i][j] !== '') {
            cell.innerHTML = pieceSymbols[boardState[i][j]];
        }
        row.appendChild(cell);
    }
    board.appendChild(row);
}

// Variables to keep track of selected piece and possible moves
let selectedPiece = null;
let possibleMoves = [];

// Function to handle cell click
function cellClick(event) {
    const id = event.target.id;
    const coords = id.split('-').map(Number);
    const row = coords[0];
    const col = coords[1];

    // If a piece is already selected, try to move it
    if (selectedPiece !== null) {
        // Move the piece if the move is valid
        // For simplicity, currently moves any piece freely
        // Replace this with actual move validation
        boardState[selectedPiece.row][selectedPiece.col] = '';
        boardState[row][col] = selectedPiece.piece;
        // Update the board display
        document.getElementById(selectedPiece.row + '-' + selectedPiece.col).innerHTML = '';
        document.getElementById(id).innerHTML = pieceSymbols[boardState[row][col]];
        // Deselect the piece
        selectedPiece = null;
        // Remove possible moves highlighting
        possibleMoves.forEach(cell => cell.classList.remove('moveable'));
        possibleMoves = [];
    } else {
        // Select a piece
        if (boardState[row][col] !== '') {
            selectedPiece = { row: row, col: col, piece: boardState[row][col] };
            // Highlight possible moves
            // For simplicity, highlight all possible moves for any piece
            // Replace this with actual move generation
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    if ((i !== row || j !== col) && boardState[i][j] === '') {
                        document.getElementById(i + '-' + j).classList.add('moveable');
                        possibleMoves.push(document.getElementById(i + '-' + j));
                    }
                }
            }
        }
    }
}

// Add click event listener to all cells
const cells = document.getElementsByTagName('td');
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', cellClick);
}