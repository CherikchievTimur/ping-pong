const ball = document.getElementById("ball");
const puddle1 = document.getElementById("puddle-1");
const puddle2 = document.getElementById("puddle-2");
const gameField = document.getElementById("game-field");
const score1 = document.getElementById(`score-1`);
const score2 = document.getElementById(`score-2`);

let gameFieldBounds = gameField.getBoundingClientRect();

console.log(gameFieldBounds.height);
console.log(gameFieldBounds.width);

let initScore1 = 0;
let initScore2 = 0;
score1.textContent = initScore1;
score2.textContent = initScore2;

let xPos = gameFieldBounds.width / 2 - 20;
let yPos = gameFieldBounds.height / 2 - 20;

let speedX = getRandomDirection() * 2;
let speedY = getRandomDirection() * 2;

function getRandomDirection() {
	return Math.random() < 0.5 ? -1 : 1;
}

let yPuddle1 = gameFieldBounds.height / 2 - 50;
let yPuddle2 = gameFieldBounds.height / 2 - 50;

let isBallMoving = false;

function resetBall() {
	xPos = gameFieldBounds.width / 2 - 20;
	yPos = gameFieldBounds.height / 2 - 20;
	isBallMoving = false;
}
const move = () => {
	if (isBallMoving) {
		if (yPos <= 0 || yPos + 40 >= gameFieldBounds.height) speedY *= -1;

		if (xPos <= 10 && yPos + 40 >= yPuddle1 && yPos <= yPuddle1 + 100)
			speedX *= -1;

		if (
			xPos + 40 + 10 >= gameFieldBounds.width &&
			xPos + 40 <= gameFieldBounds.width &&
			yPos + 40 >= yPuddle2 &&
			yPos <= yPuddle2 + 100
		)
			speedX *= -1;

		if (xPos <= 0) {
			initScore2++;
			score2.textContent = initScore2;
			console.log(initScore2);
			resetBall();
		} else if (xPos + 40 >= gameFieldBounds.width) {
			initScore1++;
			score1.textContent = initScore1;
			console.log(initScore1);
			resetBall();
		}

		ball.style.left = `${xPos}px`;
		ball.style.top = `${yPos}px`;

		yPos += speedY;
		xPos += speedX;

		requestAnimationFrame(move);
	}
};

let speedPuddleY = 30;

puddle2.style.right = "0px";

const keyUp = (e) => {
	if (e.code == "ArrowUp") {
		yPuddle2 = Math.max(0, yPuddle2 - speedPuddleY);
	} else if (e.code == "ArrowDown") {
		yPuddle2 = Math.min(gameFieldBounds.height - 100, yPuddle2 + speedPuddleY);
	}

	if (e.code == "KeyW") {
		yPuddle1 = Math.max(0, yPuddle1 - speedPuddleY);
	} else if (e.code == "KeyS") {
		yPuddle1 = Math.min(gameFieldBounds.height - 100, yPuddle1 + speedPuddleY);
	}
	puddle1.style.top = `${yPuddle1}px`;
	puddle2.style.top = `${yPuddle2}px`;
};

const keyDown = (e) => {
	if (e.code == "Space") {
		isBallMoving = true;
		console.log(`Space bar pressed: ${isBallMoving}`);
		requestAnimationFrame(move);
	}
};

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
