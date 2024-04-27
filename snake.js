//Define snake board
var blockSize = 35;
var rows = 18;
var cols = 18;
var board;
var context;
var snakeHeadImage = new Image();
snakeHeadImage.src = "Snake.jpg";

// Snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

//Snake speed
var velocityX = 0;
var velocityY = 0;

//Snake body
 var snakeBody = [];

//Food
var foodX;
var foodY;
var centerX
var centerY
var radius = 1.2*blockSize/2;
var gameOver = false;

window.onload = function() {
    board = document.getElementById("snakeboard")
    board.width = cols * blockSize;
    board.height = rows * blockSize;
    context = board.getContext("2d"); // Used to draw on the board
    placeFood();
    document.addEventListener("keyup", changeDirection);
    //update();
    setInterval(update, 1500/10); //Update runs every 200ms
}

function update() {
    if(gameOver) {
        alert("Game Over!");
        snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    placeFood();
    gameOver = false;
    }
    context.fillStyle = "black";
    context.fillRect(0,0,board.width,board.height);

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, Math.PI * 2); // Full circle
    context.fillStyle = "orange";
    context.fill(); // Fill the circle with lime color
    context.closePath();

    if(snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        console.log(snakeBody);
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.drawImage(snakeHeadImage, snakeX, snakeY, blockSize, blockSize);
    for(let i=0; i<snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }
    //Game over
    if(snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("Game Over!");
    }
    for(let i = 0; i < snakeBody.length; i++) {
        if(snakeX == snakeBody[i][0] && snakeY== snakeBody[i][1]){
            gameOver = true;
            alert("Game over!");      
          }
    }
}

function changeDirection(e) {
    if(e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * (cols)) * blockSize;
    foodY = Math.floor(Math.random() * (rows)) * blockSize;
    centerX = foodX + blockSize/2;
    centerY = foodY + blockSize/2;
}