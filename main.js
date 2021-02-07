var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

let snake = [
    {x:200, y:200},
    {x:190, y:200},
    {x:180, y:200}
];
let apples = [
    {
        x:Math.round(Math.random()*40)*10, 
        y:Math.round(Math.random()*40)*10
    }
];

var x_coor = 10;
var y_coor = 0;
var score = 0;

let snake_x = 0;
let snake_y = 0;
let apple_x = 0;
let apple_y = 0;

var isGameOver = false;

main();

function changeCoor(){   
    snake_x = snake[0].x;
    snake_y = snake[0].y;
    apple_x = apples[0].x;
    apple_y = apples[0].y;
    
    snake.unshift({x:snake_x + x_coor, y:snake_y + y_coor});
    snake.pop();
    
    if(snake_x === apple_x && snake_y === apple_y) {
        snake.push({x: snake[snake.length-1].x, y: snake[snake.length-1].y})
        apples.pop();
        score++;
    }  
}

function renderBoard(){
    context.fillStyle = "lightblue";
    context.strokeStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeRect(0, 0, canvas.width, canvas.height)
}

function draw(){
    context.fillStyle = "red";
    context.strokeStyle = "black";
    snake.forEach(element => {
        context.fillRect(element.x,element.y,10,10);
        context.strokeRect(element.x,element.y,10,10);
    });
    
    context.fillStyle = "green";
    context.strokeStyle = "green";
    apples.forEach(element => {
        context.fillRect(element.x,element.y,10,10);
    });   
    
    context.font = "30px Arial";
    context.fillText(score, 360, 40);
}

function createApple(){
    if(apples.length === 0){
        apples.push({x:Math.round(Math.random()*40)*10, y:Math.round(Math.random()*40)*10});
    }
}

function checkGameOver(){   
    for(i = 2; i < snake.length; i++){
        if(snake[i].x == snake_x && snake[i].y == snake_y){
            var crash = true;
        }
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > canvas.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > canvas.height - 10;
    isGameOver = hitLeftWall || hitRightWall || hitToptWall || hitBottomWall || crash;

    if(isGameOver){
        context.font = "20px Arial";
        context.fillStyle = "white";
        context.fillText("Game Over", 150, 170);
        context.fillText("Press Space for New Game", 80, 220);
    }
    return isGameOver;
}

function main(){   
    setTimeout(() => {
        if(checkGameOver()) return; 
        renderBoard()
        changeCoor();
        draw();
        createApple();
        main();      
    }, 35);
}

window.addEventListener('keydown', function(event){
    if(event.defaultPrevented){
        return;
    } 
    
    
    switch(event.key){
        case "ArrowUp":
            x_coor = 0;
            y_coor = -10; 
            break;
        case "ArrowDown":
            x_coor = 0;
            y_coor = 10; 
            break;
        case "ArrowRight":
            y_coor = 0;
            x_coor = 10;
            break;
        case "ArrowLeft":
            y_coor = 0;
            x_coor = -10;
            break;
        case " ":         
            window.location.reload();
            break;
        default:
            break;
    }

    event.preventDefault();
}, true);

