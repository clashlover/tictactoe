const pOneMark = "X";
const pTwoMark = "O";
const pThreeMark = "△";
const winCombination = [
  [0, 4, 8, 12],
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  [0, 5, 10, 15],
  [3, 6, 9, 12],
];
const cellElements = document.querySelectorAll(".blocks");
const playerOne_score = document.querySelector("#score-one");
const playerTwo_score = document.querySelector("#score-two");
const playerThree_score = document.querySelector("#score-three");
const start = document.querySelector("#start");
const restart = document.querySelector("#restart");
const win_message = document.querySelector(".winning-message");
const player = document.querySelectorAll(".player");
const score = document.querySelectorAll(".score");
let one_comb = [];
let two_comb = [];
let three_comb = [];
let playerOne_turn = true;
let playerTwo_turn = false;
let playerThree_turn = false;
let playerOneScore = 0;
let playerTwoScore = 0;
let playerThreeScore = 0;
player[0].classList.add("p-turn");
score[0].classList.add("p-turn");

for (let i = 0; i < cellElements.length; i++) {
  cellElements[i].addEventListener("click", (event) => {
    const targetCell = event.target;
    const isDisabled = targetCell.classList.contains("disabled");
    restart.disabled = false;
    if (!isDisabled && playerOne_turn) {
      one_comb.push(i);
      targetCell.classList.add("disabled");
      targetCell.textContent = pOneMark;
      checkWining(one_comb);
      playerOne_turn = false;
      playerTwo_turn = true;
      playerTurn(1);
    } else if (!isDisabled && playerTwo_turn) {
      two_comb.push(i);
      targetCell.classList.add("disabled");
      targetCell.textContent = pTwoMark;
      checkWining(two_comb);
      playerTwo_turn = false;
      playerThree_turn = true;
      playerTurn(2);
    } else if (!isDisabled && playerThree_turn) {
      three_comb.push(i);
      targetCell.classList.add("disabled");
      targetCell.textContent = pThreeMark;
      checkWining(three_comb);
      playerThree_turn = false;
      playerOne_turn = true;
      playerTurn(0);
    }
  });
}

function checkWining(array) {
  for (item of winCombination) {
    const winner = item.every((state) => array.includes(state));
    if (winner) {
      addDisabled();
      if (array === one_comb) {
        win_message.textContent = "Player One wins";
        playerOneScore++;
        document.querySelector("#score-one").textContent = playerOneScore;
        return win_message.textContent;
      } else if (array === two_comb) {
        win_message.textContent = "Player Two wins";
        playerTwoScore++;
        document.querySelector("#score-two").textContent = playerTwoScore;
        return win_message.textContent;
      } else if (array === three_comb) {
        win_message.textContent = "Player Three wins";
        playerThreeScore++;
        document.querySelector("#score-three").textContent = playerThreeScore;
        return win_message.textContent;
      }
    } else if (
      !winner &&
      document.querySelectorAll(".disabled").length === 16
    ) {
      win_message.textContent = "Match Draw!";
      return win_message.textContent;
    }
  }
}

function addDisabled() {
  cellElements.forEach((cell) => cell.classList.add("disabled"));
}

function playerTurn(i) {
  let pTurn = document.querySelectorAll(".p-turn");
  if (pTurn.length > 0) {
    pTurn.forEach((element) => element.classList.remove("p-turn"));
  }
  player[i].classList.add("p-turn");
  score[i].classList.add("p-turn");
}

restart.addEventListener("click", () => {
  cellElements.forEach((cell) => {
    cell.classList.remove("disabled");
    cell.innerHTML = "";
  });
  let pTurn = document.querySelectorAll(".p-turn");
  pTurn.forEach((element) => element.classList.remove("p-turn"));
  player[0].classList.add("p-turn");
  score[0].classList.add("p-turn");
  restart.disabled = true;
  win_message.textContent = "";
  playerOne_turn = true;
  playerTwo_turn = false;
  playerThree_turn = false;
  one_comb = [];
  two_comb = [];
  three_comb = [];
});
