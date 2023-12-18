let blockSize = 22;
let rows = 18;
let cols = 18;
let board;
let context;
let scoreValue = 0;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let snakeBody = [];

let foodX = blockSize * 10;
let foodY = blockSize * 10;

let velocityX = 0;
let velocityY = 0;

let gameOver = false;

window.onload = function () {
  board = document.getElementById("board");

  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  placeFood();
  document.addEventListener("keydown", changeDirection);
  setInterval(update, 1000 / 10);
};

function update() {
  if (gameOver) {
    return;
  }

  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) [(snakeBody[0] = [snakeX, snakeY])];

  context.fillStyle = "lime";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.lineCap = "round";
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  if (
    snakeX < 0 ||
    snakeX > cols * blockSize ||
    snakeY < 0 ||
    snakeY > rows * blockSize
  ) {
    gameOver = true;
    alert("Game Over! Press F5 to restart");
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over! Press F5 to restart");
    }
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  }
  if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  }
  if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  }
  if (e.code == "ArrowRight" && velocityX != 1) {
    velocityX = 1;
    velocityY = 0;
  }
}
