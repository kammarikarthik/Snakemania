//Game Constants & variables
let inputDir={x:0,y:0};
const foodSound=new Audio("music/food.mp3");
const gameOverSound=new Audio("music/gameover.mp3");
const moveSound=new Audio("music/move.mp3");
const musicSound=new Audio("music/music.mp3");
let speed=5;
let score=0;
let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}
]
let food={
    x:6,y:7
}

//Game Functions
function main(ctime)
{
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<1/speed)
    {
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(sarr)
{ //if snake bump into itself
    for(let i=1;i<sarr.length;i++)
    {
        if(sarr[i].x===sarr[0].x && sarr[i].y===sarr[0].y)
        {
            return true;
        }
    }
    //if snake bump into the wall
    if(sarr[0].x<=0 || sarr[0].x>=18 || sarr[0].y<=0 || sarr[0].y>=18 )
    return true;    
}


function gameEngine()
{     musicSound.play();
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0; 
    }
     // If you have eaten the food, increment the score and regenerate the food
     if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }
    //Moving the Snake
   
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
     //part 2:display snake 
    board.innerHTML="";
   snakeArr.forEach((e,index)=>{
    snakeElement=document.createElement('div');
    snakeElement.style.gridRowStart=e.x;
    snakeElement.style.gridColumnStart=e.y;
    if(index==0)
    snakeElement.classList.add('head');
    else
    snakeElement.classList.add('snake');
    board.appendChild(snakeElement);
 })
 //Display food
FoodElement=document.createElement('div');
   FoodElement.style.gridRowStart=food.x;
   FoodElement.style.gridColumnStart=food.y;
   FoodElement.classList.add('food');
    board.appendChild(FoodElement);
}

//Main Logic Starts here

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
        
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        default:
            break;
    }

});
