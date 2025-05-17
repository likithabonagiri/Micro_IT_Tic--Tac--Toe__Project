const board = document.getElementById("board");
const status = document.getElementById("status");
let currentPlayer = "X";
let gameActive = true;
let gameState = Array(9).fill("");

function createBoard() {
  board.innerHTML = "";
  gameState = Array(9).fill("");
  gameActive = true;
  status.textContent = "Player X's turn";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

function handleCellClick(event) {
  const index = event.target.dataset.index;
  if (!gameActive || gameState[index] !== "") return;

  gameState[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add("taken");

  if (checkWinner()) {
    status.textContent =' Player $ {currentPlayer} wins!';
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    status.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent ='Player ${currentPlayer} turn';
}

function checkWinner() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    );
  });
}

function resetGame() {
  currentPlayer = "X";
  createBoard();
}

createBoard();