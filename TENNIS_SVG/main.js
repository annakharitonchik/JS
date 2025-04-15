const DIV = document.createElement("div");
const DIV_HEIGHT = 70;
const DIV_WIDTH = 80 + 0.3 + 0.3;
DIV.style = "display:flex; margin:10vh auto; flex-direction:column; gap:1vh";
DIV.style.height = DIV_HEIGHT + "vh";
DIV.style.width = DIV_WIDTH + "vh";
document.body.appendChild(DIV);

const TOP_DIV = document.createElement("div");
TOP_DIV.style = "display:flex; justify-content: space-between; height:10vh";
DIV.appendChild(TOP_DIV);
const BUTT_START = document.querySelector("#backgroundText");
const TEXT = document.querySelector("#text");
TEXT.setAttribute("x", "15%");
TEXT.setAttribute("y", "70%");
BUTT_START.type = "button";
BUTT_START.onclick = start;
BUTT_START.value = "старт!";
BUTT_START.style =
  " border:none; background-color:#d9d9d3; display:inline; font-family: 'Bebas Neue', sans-serif; font-weight: 400; font-style: normal; width: 20%; height: 60%; font-size: 4vh; align-self: center;";
TOP_DIV.appendChild(BUTT_START);
const COUNT = document.createElement("div");
let countLeft = 0;
let countRight = 0;
// COUNT.textContent = `${countLeft}:${countRight}`;
COUNT.style =
  "margin-right: 45%; width:10%; text-align: center; font-family: 'Bebas Neue', sans-serif; font-weight: 400; font-style: normal; font-size: 6vh;";
TOP_DIV.appendChild(COUNT);

const FIELD = document.querySelector("#svg_1");
const HEIGHT_FIELD = 60; //vh
const WIDTH_FIELD = 80; //vh
FIELD.style =
  " border: solid black 0.3vh; position: relative; background-color: #f0ee7e;";
FIELD.style.height = HEIGHT_FIELD + "vh";
FIELD.style.width = WIDTH_FIELD + "vh";
DIV.appendChild(FIELD);

const LEFT_RACKET = document.querySelector("#left");
const RIGHT_RACKET = document.querySelector("#right");
const BALL = document.querySelector("#ball");
const RACKET_WIDTH = 4;
const RACKET_HEIGHT = HEIGHT_FIELD * 0.3;
LEFT_RACKET.style = "position:absolute; ";
LEFT_RACKET.style.width = RACKET_WIDTH + "vh";
LEFT_RACKET.style.height = RACKET_HEIGHT + "vh";
RIGHT_RACKET.style = "position:absolute";
RIGHT_RACKET.style.width = RACKET_WIDTH + "vh";
RIGHT_RACKET.style.height = RACKET_HEIGHT + "vh";
const DIAMETER_BALL = 8;
BALL.style = "position:absolute;";
BALL.setAttribute("rx", DIAMETER_BALL / 2 + "vh");
BALL.setAttribute("ry", DIAMETER_BALL / 2 + "vh");
FIELD.appendChild(LEFT_RACKET);
FIELD.appendChild(RIGHT_RACKET);
FIELD.appendChild(BALL);

setInterval(updateGame, 1000 / 150);
function start() {
  resetBall();
  BUTT_START.style.display = "none";
  COUNT.style.margin = "auto";
}
let RACKET_SPEED = 0.5;
let ballH = {
  posX: WIDTH_FIELD / 2,
  posY: HEIGHT_FIELD / 2,
  speedX: 0,
  width: DIAMETER_BALL,
  height: DIAMETER_BALL,

  update: function () {
    BALL.setAttribute("cx", this.posX + "vh");
    BALL.setAttribute("cy", this.posY + "vh");
    COUNT.textContent = `${countLeft}:${countRight}`;
  },
};

let areaH = {
  width: WIDTH_FIELD,
  height: HEIGHT_FIELD,
};

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
  ballH.speedX = 0.5;
  RACKET_SPEED = 0.5;
  startTime = Date.now();
}

function tick() {
  ballH.posX += ballH.speedX * Math.cos(alfa);
  ballH.posY += ballH.speedX * Math.sin(alfa);

  if (ballH.posX + ballH.width - DIAMETER_BALL / 2 > areaH.width) {
    ballH.posX = areaH.width - ballH.width + DIAMETER_BALL / 2;
    countLeft++;
    BUTT_START.style.display = "inline";
    COUNT.style.marginRight = "45%";
    ballH.speedX = 0;
    RACKET_SPEED = 0;
  }
  if (ballH.posY + ballH.height - DIAMETER_BALL/2 > areaH.height) {
    ballH.posY = areaH.height - ballH.height + DIAMETER_BALL/2;
    console.log(ballH.posY);
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
    ballH.posX + ballH.width - DIAMETER_BALL / 2 >= rightRacket.posX &&
    ballH.posY + ballH.height >= rightRacket.posY &&
    ballH.posY <= rightRacket.posY + rightRacket.height
  ) {
    ballH.posX = rightRacket.posX - ballH.width + DIAMETER_BALL / 2;
    alfa = Math.PI - alfa;
    ballH.speedX += 0.01;
  }

  if (
    ballH.posX < leftRacket.posX + leftRacket.width + DIAMETER_BALL / 2 &&
    ballH.posY + ballH.height >= leftRacket.posY &&
    ballH.posY <= leftRacket.posY + leftRacket.height
  ) {
    alfa = Math.PI - alfa;
    ballH.posX = leftRacket.posX + leftRacket.width + DIAMETER_BALL / 2;
    ballH.speedX += 0.01;
  }

  ballH.update();
}

ballH.update();

let keys = {
  ShiftLeft: false,
  ControlLeft: false,
  ArrowUp: false,
  ArrowDown: false,
};

let leftRacket = {
  posX: 0,
  posY: (HEIGHT_FIELD - RACKET_HEIGHT) / 2,

  width: RACKET_WIDTH,
  height: RACKET_HEIGHT,

  update: function () {
    LEFT_RACKET.setAttribute("x", this.posX + "vh");
    LEFT_RACKET.setAttribute("y", this.posY + "vh");
  },
};
leftRacket.update();

let rightRacket = {
  posX: WIDTH_FIELD - RACKET_WIDTH,
  posY: (HEIGHT_FIELD - RACKET_HEIGHT) / 2,

  width: RACKET_WIDTH,
  height: RACKET_HEIGHT,

  update: function () {
    RIGHT_RACKET.setAttribute("x", this.posX + "vh");
    RIGHT_RACKET.setAttribute("y", this.posY + "vh");
  },
};
rightRacket.update();

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
    leftRacket.update();
  }
  if (keys["ArrowUp"] && rightRacket.posY > 0) {
    rightRacket.posY -= RACKET_SPEED;
    rightRacket.update();
  }
  if (
    keys["ControlLeft"] &&
    leftRacket.posY + leftRacket.height < areaH.height
  ) {
    leftRacket.posY += RACKET_SPEED;
    leftRacket.update();
  }
  if (
    keys["ArrowDown"] &&
    rightRacket.posY + rightRacket.height < areaH.height
  ) {
    rightRacket.posY += RACKET_SPEED;
    rightRacket.update();
  }
}

document.addEventListener("keydown", checkKey);
document.addEventListener("keyup", stopPress);

function updateGame() {
  tick();
  pressKey();
}
