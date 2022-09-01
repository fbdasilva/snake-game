let score = document.getElementById("score");
let level = document.getElementById("level");
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let scoreCount = 0;
let direction = "right";
let box = {
    x: canvas.width/16,
    y: canvas.height/16
}
let food = {
    x: Math.floor(Math.random()*15 + 1)*box.x,
    y: Math.floor(Math.random()*15 + 1)*box.y
}
let snake = [];
snake[0] = {
    x: 8*box.x,
    y: 8*box.y
}
let levelVelocity = {
    "1":350,
    "2":300,
    "3":200,
    "4":100,
    "5":50
}
let game = setInterval(runGame,levelVelocity["1"]);

document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction !='right' && snake[0].y>-1 && snake[0].y<16*box.y)
        direction = 'left';
    if(event.keyCode == 38 && direction !='down' && snake[0].x>-1 && snake[0].x<16*box.x)
        direction='up';
    if(event.keyCode == 39 && direction !='left' && snake[0].y>-1 && snake[0].y<16*box.y)
        direction='right';
    if(event.keyCode == 40 && direction !='up' && snake[0].x>-1 && snake[0].x<16*box.x)
        direction='down';
}

function restartGame(){
    clearInterval(game);
    snake = [];
    snake[0] = {
        x: 8*box.x,
        y: 8*box.y
    }
    direction = "right";
    level.innerText = "LEVEL: 1";
    score.innerText = "SCORE: 0000";
    game = setInterval(runGame, levelVelocity["1"]);
}

function drawField(){
    context.fillStyle = 'rgb(155,196,5)';
    context.fillRect(0,0,16*box.x,16*box.y);
}

function drawSnake(){
    for(i=0; i<snake.length;i++){
        context.fillStyle = "black";
        context.fillRect(snake[i].x,snake[i].y,box.x,box.y);
    }
}

function drawFood(){
    context.beginPath();
    context.arc(food.x + box.x/2,food.y + box.y/2,box.x/4,0,2*Math.PI);
    context.lineWidth = 6;
    context.stroke();
}

function updateScore(){
    scoreCount++;
    if(scoreCount<10){
        score.innerText = `SCORE: 000${scoreCount}`;
    }
    else if(scoreCount<100){
        score.innerText = `SCORE: 00${scoreCount}`;
    }
    else if(scoreCount<1000){
        score.innerText = `SCORE: 0${scoreCount}`;
    }
    else{
        score.innerText = `SCORE: ${scoreCount}`;
    }
}

function updateLevel(){
    if(scoreCount === 10){
        clearInterval(game);
        game = setInterval(runGame,levelVelocity["2"]);
        level.innerText = `LEVEL: ${2}`;
    }
    if(scoreCount === 20){
        clearInterval(game);
        game = setInterval(runGame,levelVelocity["3"]);
        level.innerText = `LEVEL: ${3}`;
    }
    if(scoreCount === 40){
        clearInterval(game);
        game = setInterval(runGame,levelVelocity["4"]);
        level.innerText = `LEVEL: ${4}`;
    }
    if(scoreCount === 80){
        clearInterval(game);
        game = setInterval(runGame,levelVelocity["5"]);
        level.innerText = `LEVEL: ${5}`;
    }
}

function hitTheWallTreatment(){
    if(snake[0].x > 15*box.x && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 15*box.x;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 15*box.y;
    if(snake[0].y > 15*box.y && direction == "down") snake[0].y = 0;
}


function hitTheSnakeBody(){
    for(let i = 1;i<snake.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            clearInterval(game);
            gameOverFlag();
            score.innerText = 'SCORE: 0000';
            level.innerText = 'LEVEL: 1';
            scoreCount = 0;
            return true;
        }
    }
    return false;
}

function gameOverFlag(){
    drawField();
    context.fillStyle = "#000";
    context.font = '800 20px verdana, sans-serif';
    context.fillText("GAME OVER", 5*box.x, 8*box.y);
}

function runGame(){

    if(hitTheSnakeBody())
        return;

    hitTheWallTreatment();

    drawField();
    drawSnake();
    drawFood();

    let snakeHeadX = snake[0].x;
    let snakeHeadY = snake[0].y;

    if(direction === "right") snakeHeadX += box.x;
    if(direction === "left") snakeHeadX -= box.x;
    if(direction === "up") snakeHeadY -= box.y;
    if(direction === "down") snakeHeadY += box.y;

    if(snakeHeadX != food.x || snakeHeadY != food.y){
        snake.pop();
    }
    else{
        food.x = Math.floor(Math.random()*15 + 1)*box.x;
        food.y = Math.floor(Math.random()*15 + 1)*box.y;
        updateScore();
        updateLevel();
    }

    let newHead = {
        x: snakeHeadX,
        y: snakeHeadY
    }

    snake.unshift(newHead);
}
