//your JS code here. If required.
const submitBtn = document.getElementById("submit");
const formDiv = document.getElementById("player-form");
const gameDiv = document.getElementById("game");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "x";
let gameOver = false;

const winningCombinations = [
  [1,2,3],[4,5,6],[7,8,9],
  [1,4,7],[2,5,8],[3,6,9],
  [1,5,9],[3,5,7]
];

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player1").value;
  player2 = document.getElementById("player2").value;

  if (!player1 || !player2) return;

  formDiv.style.display = "none";
  gameDiv.style.display = "block";
  messageDiv.textContent = `${player1}, you're up`;
});

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (cell.textContent || gameOver) return;

    cell.textContent = currentPlayer;

    if (checkWinner()) {
      gameOver = true;
      messageDiv.textContent =
        `${currentPlayer === "x" ? player1 : player2} congratulations you won!`;
      highlightWinner();
      return;
    }

    currentPlayer = currentPlayer === "x" ? "o" : "x";
    messageDiv.textContent =
      `${currentPlayer === "x" ? player1 : player2}, you're up`;
  });
});

function checkWinner() {
  return winningCombinations.some(combo => {
    const [a, b, c] = combo;
    return (
      document.getElementById(a).textContent &&
      document.getElementById(a).textContent === document.getElementById(b).textContent &&
      document.getElementById(a).textContent === document.getElementById(c).textContent
    );
  });
}

function highlightWinner() {
  winningCombinations.forEach(combo => {
    const [a, b, c] = combo;
    const cellA = document.getElementById(a);
    const cellB = document.getElementById(b);
    const cellC = document.getElementById(c);

    if (
      cellA.textContent &&
      cellA.textContent === cellB.textContent &&
      cellA.textContent === cellC.textContent
    ) {
      cellA.classList.add("winner");
      cellB.classList.add("winner");
      cellC.classList.add("winner");
    }
  });
}
