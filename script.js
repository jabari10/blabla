// Define shared dependencies
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
const addEventListener = document.addEventListener.bind(document);
const Math_floor = Math.floor;
const Math_random = Math.random;
const setInterval = window.setInterval.bind(window);
const clearInterval = window.clearInterval.bind(window);

// Define game variables
let snake = [{x: 10, y: 10}];
let food = {x: Math_floor(Math_random() * 20), y: Math_floor(Math_random() * 20)};
let dx = 0;
let dy = 0;
let score = 0;
let intervalId = null;

// Define game constants
const GRID_SIZE = 20;
const GAME_SPEED = 100;

// Draw a square at the given (x, y) coordinates
function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
}

// Draw the snake
function drawSnake() {
  snake.forEach(segment => drawSquare(segment.x, segment.y, "green"));
}

// Draw the food
function drawFood() {
  drawSquare(food.x, food.y, "red");
}

// Move the snake
function moveSnake() {
  // Add a new head to the snake
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);

  // Check if the snake has collided with the food
  if (head.x === food.x && head.y === food.y) {
    // Increase the score and generate new food
    score++;
    food = {x: Math_floor(Math_random() * 20), y: Math_floor(Math_random() * 20)};
  } else {
    // Remove the tail of the snake
    snake.pop();
  }
}

// Check if the snake has collided with the walls or itself
function checkCollision() {
  const head = snake[0];

  // Check if the snake has collided with the walls
  if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
    return true;
  }

  // Check if the snake has collided with itself
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

// Update the game state
function update() {
  // Move the snake
  moveSnake();

  // Check for collisions
  if (checkCollision()) {
    // Stop the game
    clearInterval(intervalId);
    alert(`Game over! Your score is ${score}.`);
  }
}

// Handle keydown events
function handleKeyDown(event) {
  switch (event.keyCode) {
    case 37: // left arrow
      dx = -1;
      dy = 0;
      break;
    case 38: // up arrow
      dx = 0;
      dy = -1;
      break;
    case 39: // right arrow
      dx = 1;
      dy = 0;
      break;
    case 40: // down arrow
      dx = 0;
      dy = 1;
      break;
    default:
      break;
  }
}

// Start the game
function startGame() {
  // Draw the initial game state
  drawSnake();
  drawFood();

  // Start the game loop
  intervalId = setInterval(() => {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update the game state
    update();

    // Draw the game state
    drawSnake();
    drawFood();
  }, GAME_SPEED);

  // Add event listener for keydown events
  addEventListener("keydown", handleKeyDown);
}
