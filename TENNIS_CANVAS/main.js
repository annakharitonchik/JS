const DIV = document.createElement("div");
const DIV_HEIGHT = 70;
const DIV_WIDTH = 80 + 0.3 + 0.3;
DIV.style = "display:flex; margin:10vh auto; flex-direction:column; gap:1vh";
DIV.style.height = DIV_HEIGHT + "vh";
DIV.style.width = DIV_WIDTH + "vh";
document.body.appendChild(DIV);

const TOP_DIV = document.createElement("div");
TOP_DIV.style = "display:flex; justify-content: space-between";
DIV.appendChild(TOP_DIV);
const BUTT_START = document.createElement("input");
BUTT_START.type = "button";
BUTT_START.onclick = start;
BUTT_START.value = "старт!";
BUTT_START.style =
  " border:none; background-color:#d9d9d3; display:inline; font-family: 'Bebas Neue', sans-serif; font-weight: 400; font-style: normal; width: 25%; height: 70%; font-size: 4vh; align-self: center;";
TOP_DIV.appendChild(BUTT_START);
const COUNT = document.createElement("div");
let countLeft = 0;
let countRight = 0;
COUNT.textContent = `${countLeft}:${countRight}`;
COUNT.style =
  "margin-right: 45%; width:10%; text-align: center; font-family: 'Bebas Neue', sans-serif; font-weight: 400; font-style: normal; font-size: 6vh;";
TOP_DIV.appendChild(COUNT);
const canvas = document.createElement("canvas");

const HEIGHT_FIELD = 6000; //vh
const WIDTH_FIELD = 8000; //vh
const RACKET_WIDTH = 400;
const RACKET_HEIGHT = 0.3 * HEIGHT_FIELD;
canvas.setAttribute("height", HEIGHT_FIELD + "vh");
canvas.setAttribute("width", WIDTH_FIELD + "vh");
DIV.appendChild(canvas);
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#f0ee7e";
ctx.fillRect(0, 0, WIDTH_FIELD, HEIGHT_FIELD);

const DIAMETER_BALL = 800;
let ballH = {
  posX: WIDTH_FIELD / 2,
  posY: HEIGHT_FIELD / 2,
};
ctx.beginPath();
ctx.arc(ballH.posX, ballH.posY, DIAMETER_BALL / 2, 0, Math.PI * 2);
ctx.fillStyle = "#f02137";
ctx.fill();


let leftRacket = {
  posX: 0,
  posY: (HEIGHT_FIELD - RACKET_HEIGHT) / 2,
};

ctx.fillStyle = "#09aa57";
ctx.fillRect(leftRacket.posX, leftRacket.posY, RACKET_WIDTH, RACKET_HEIGHT);
let rightRacket = {
  posX: WIDTH_FIELD - RACKET_WIDTH,
  posY: (HEIGHT_FIELD - RACKET_HEIGHT) / 2,
};

ctx.fillStyle = "#191497";
ctx.fillRect(rightRacket.posX, rightRacket.posY, RACKET_WIDTH, RACKET_HEIGHT);

let RACKET_SPEED = 50;
function start() {
    setInterval(updateGame, 1000 / 60);
  resetBall();
  BUTT_START.style.display = "none";
  COUNT.style.margin = "auto";
}

function randomDiap(n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}

let alfa = randomDiap(0, 359);
let angle = 30;
while (
  (alfa > angle && alfa < 180 - angle) ||
  (alfa > 180 + angle && alfa < 360 - angle)
) {
  alfa = randomDiap(0, 359);
}

alfa *= Math.PI / 180;

function resetBall() {
  ballH.posX = WIDTH_FIELD / 2;
  ballH.posY = HEIGHT_FIELD / 2;
  function randomDiap(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
  }

  let newAlfa = randomDiap(0, 359);
  let angle = 30;
  while (
    (newAlfa > angle && newAlfa < 180 - angle) ||
    (newAlfa > 180 + angle && newAlfa < 360 - angle)
  ) {
    newAlfa = randomDiap(0, 359);
  }

  alfa = (newAlfa * Math.PI) / 180;
  ballH.speedX = 50;
  RACKET_SPEED = 50;
  startTime = Date.now();
}

function tick() {
  ballH.posX += ballH.speedX * Math.cos(alfa);
  ballH.posY += ballH.speedX * Math.sin(alfa);

  if (ballH.posX + DIAMETER_BALL / 2 > WIDTH_FIELD) {
    ballH.posX = WIDTH_FIELD - DIAMETER_BALL / 2;
    countLeft++;
    BUTT_START.style.display = "inline";
    COUNT.style.marginRight = "45%";
    ballH.speedX = 0;
    RACKET_SPEED = 0;
  }
  if (ballH.posY + DIAMETER_BALL / 2 > HEIGHT_FIELD) {
    ballH.posY = HEIGHT_FIELD - DIAMETER_BALL / 2;
    alfa = -alfa;
  }

  if (ballH.posX < DIAMETER_BALL / 2) {
    ballH.posX = DIAMETER_BALL / 2;
    countRight++;
    BUTT_START.style.display = "inline";
    COUNT.style.marginRight = "45%";
    ballH.speedX = 0;
    RACKET_SPEED = 0;
  }
  if (ballH.posY < DIAMETER_BALL / 2) {
    ballH.posY = DIAMETER_BALL / 2;
    alfa = -alfa;
  }
  if (
    ballH.posX + DIAMETER_BALL / 2 >= rightRacket.posX &&
    ballH.posY + DIAMETER_BALL / 2 >= rightRacket.posY &&
    ballH.posY <= rightRacket.posY + RACKET_HEIGHT
  ) {
    ballH.posX = rightRacket.posX - DIAMETER_BALL / 2;
    alfa = Math.PI - alfa;
    ballH.speedX += 1;
  }

  if (
    ballH.posX < leftRacket.posX + RACKET_WIDTH + DIAMETER_BALL / 2 &&
    ballH.posY + DIAMETER_BALL / 2 >= leftRacket.posY &&
    ballH.posY <= leftRacket.posY + RACKET_HEIGHT
  ) {
    alfa = Math.PI - alfa;
    ballH.posX = leftRacket.posX + RACKET_WIDTH + DIAMETER_BALL / 2;
    ballH.speedX += 1;
  }
}

let keys = {
  ShiftLeft: false,
  ControlLeft: false,
  ArrowUp: false,
  ArrowDown: false,
};

function checkKey(event) {
  if (keys.hasOwnProperty(event.code)) {
    keys[event.code] = true;
  }
}
function stopPress(event) {
  keys[event.code] = false;
}

function pressKey() {
  if (keys["ShiftLeft"] && leftRacket.posY > 0) {
    leftRacket.posY -= RACKET_SPEED;
  }
  if (keys["ArrowUp"] && rightRacket.posY > 0) {
    rightRacket.posY -= RACKET_SPEED;
  }
  if (keys["ControlLeft"] && leftRacket.posY + RACKET_HEIGHT < HEIGHT_FIELD) {
    leftRacket.posY += RACKET_SPEED;
  }
  if (keys["ArrowDown"] && rightRacket.posY + RACKET_HEIGHT < HEIGHT_FIELD) {
    rightRacket.posY += RACKET_SPEED;
  }
}

document.addEventListener("keydown", checkKey);
document.addEventListener("keyup", stopPress);

function updateGame() {
  tick();
  pressKey();
  console.log('dfd')
  ctx.fillStyle = "#f0ee7e";
  ctx.fillRect(0, 0, WIDTH_FIELD, HEIGHT_FIELD);
  ctx.beginPath();
  ctx.arc(ballH.posX, ballH.posY, DIAMETER_BALL / 2, 0, Math.PI * 2);
  ctx.fillStyle = "#f02137";
  ctx.fill();
  ctx.fillStyle = "#09aa57";
  ctx.fillRect(leftRacket.posX, leftRacket.posY, RACKET_WIDTH, RACKET_HEIGHT);
  ctx.fillStyle = "#191497";
  ctx.fillRect(rightRacket.posX, rightRacket.posY, RACKET_WIDTH, RACKET_HEIGHT);
  COUNT.textContent = `${countLeft}:${countRight}`;
}

