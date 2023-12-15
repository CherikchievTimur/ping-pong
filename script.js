const ball = document.getElementById("ball");
const puddle1 = document.getElementById("puddle-1");
const puddle2 = document.getElementById("puddle-2");
const gameField = document.getElementById("game-field");

let gameFieldBounds = gameField.getBoundingClientRect();

console.log(gameFieldBounds.height);
console.log(gameFieldBounds.width);

let xPos = 100;
let yPos = 100;

let speedX = 5;
let speedY = 3;

let yPuddle1 = 100;
let yPuddle2 = 100;

const move = () => {
	if (yPos <= 0 || yPos + 40 >= gameFieldBounds.height) speedY *= -1;

	/*if (xPos <= 10)
        if(yPos <= yPuddle1 && yPos >= yPuddle1 - 100)
            speedX *= -1
        
    if (xPos + 40 + 10 >= gameFieldBounds.width)
        if (yPos <= yPuddle2 && yPos >= yPuddle2 - 100)
            speedX *= -1*/

	if (xPos <= 0 || xPos + 40 >= gameFieldBounds.width) speedX *= -1;

	ball.style.left = `${xPos}px`;
	ball.style.top = `${yPos}px`;

	yPos += speedY;
	xPos += speedX;
};

let speedPuddleY = 20;

puddle2.style.right = "0px";

const keyUp = (e) => {
	if (e.code == "ArrowUp") yPuddle2 -= speedPuddleY;
	else if (e.code == "ArrowDown") yPuddle2 += speedPuddleY;

	if (e.code == "KeyW") yPuddle1 -= speedPuddleY;
	else if (e.code == "KeyS") yPuddle1 += speedPuddleY;

	puddle1.style.top = `${yPuddle1}px`;
	puddle2.style.top = `${yPuddle2}px`;
	console.log(e);
};

document.addEventListener("keydown", keyUp);

// setInterval(move, 0)
