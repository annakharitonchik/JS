const tags = document.querySelectorAll(".center"); //стили для входных параметров
tags.forEach(
  (tag) =>
    (tag.style =
      "display: flex; margin: 10px auto; justify-content: center; font-family: 'Gidole', serif; font-weight: 400;")
);
const svg = document.querySelector("svg");

const divForYellowCircle = document.querySelector("#yellowCircle");
divForYellowCircle.style =
  "display: flex; justify-content: center; margin: 120px auto;";
const yellowCircle = document.querySelector("#svg_1"); //стили для диаметра циферблата
yellowCircle.style = "display: none; position:relative";
const errMessage = document.querySelector("#errMess"); //сообщение об ошибке ввода диаметра
errMessage.style =
  "opacity:0.5; display: flex; margin: 10px auto; justify-content: center; font-family: 'Gidole', serif; font-weight: 400; color:red ";

const numClock = 12; //цифры на циферблате
let singularAngle = (2 * Math.PI) / numClock; //угол между цифрами
let Alfa = singularAngle * -2; //12 вверху
function enterDiameter(eo) {
  eo = eo || window.event;
  eo.preventDefault();
  let diameterCircle = Number(document.querySelector("input").value); //значение диаметра
  if (diameterCircle !== "" && 200 <= diameterCircle && diameterCircle <= 800) {
    svg.setAttribute("width", diameterCircle);
    svg.setAttribute("height", diameterCircle);
    yellowCircle.setAttribute("cy", diameterCircle / 2);
    yellowCircle.setAttribute("cx", diameterCircle / 2);
    yellowCircle.setAttribute("ry", diameterCircle / 2); //размеры желтого циферблата
    yellowCircle.setAttribute("rx", diameterCircle / 2); //размеры желтого циферблата
    yellowCircle.style.display = "flex";
    errMessage.style.display = "none";
    let diameterGreenCircle = diameterCircle / 8;
    let R = diameterCircle / 2; //радиус большого желтого круга
    let r = diameterGreenCircle / 2; //радиус маленокой зеленого круга

    for (i = 1; i <= numClock; i++) {
      let top = Math.sin(Alfa) * (R - r - (1 / 2) * r) + R;
      let left = Math.cos(Alfa) * (R - r - (1 / 2) * r) + R;
      const grinCircle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "ellipse"
      );
      const svgText = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      svgText.textContent = i;
      svgText.setAttribute("fill", "black");
      svgText.setAttribute("font-size", diameterCircle / 15);
      svgText.setAttribute("x", left);
      svgText.setAttribute("y", top + (1 / 3) * r);
      svgText.setAttribute("font-family", "Gidole");
      svgText.setAttribute("font-family", "Gidole");
      svgText.setAttribute("text-anchor", "middle");
      grinCircle.setAttribute("fill", "#08b348");
      grinCircle.setAttribute("cy", top);
      grinCircle.setAttribute("cx", left);
      grinCircle.setAttribute("ry", diameterGreenCircle / 2);
      grinCircle.setAttribute("rx", diameterGreenCircle / 2);
      Alfa += singularAngle;
      svg.appendChild(grinCircle);
      svg.appendChild(svgText);
    }
    const hourArrow = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    const minuteArrow = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    const secondArrow = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    hourArrow.setAttribute("width", diameterCircle / 40);
    hourArrow.setAttribute("height", diameterCircle * 0.33);
    hourArrow.setAttribute("x", diameterCircle / 2 - diameterCircle / 80);
    hourArrow.setAttribute("y", diameterCircle / 2 - diameterCircle * 0.3);
    hourArrow.setAttribute("rx", diameterCircle / 80);
    hourArrow.setAttribute("opacity", 0.8);

    minuteArrow.setAttribute("width", diameterCircle / 50);
    minuteArrow.setAttribute("height", diameterCircle * 0.38);
    minuteArrow.setAttribute("x", diameterCircle / 2 - diameterCircle / 80);
    minuteArrow.setAttribute("y", diameterCircle / 2 - diameterCircle * 0.35);
    minuteArrow.setAttribute("rx", diameterCircle / 80);
    minuteArrow.setAttribute("opacity", 0.8);

    secondArrow.setAttribute("width", diameterCircle / 60);
    secondArrow.setAttribute("height", diameterCircle * 0.48);
    secondArrow.setAttribute("x", diameterCircle / 2 - diameterCircle / 80);
    secondArrow.setAttribute("y", diameterCircle / 2 - diameterCircle * 0.45);
    secondArrow.setAttribute("rx", diameterCircle / 80);
    secondArrow.setAttribute("opacity", 0.8);

    svg.appendChild(secondArrow);
    svg.appendChild(minuteArrow);
    svg.appendChild(hourArrow);
    tags.forEach((tag) => (tag.style.display = "none"));
    let time = document.createElementNS("http://www.w3.org/2000/svg", "text");
    time.setAttribute("x", diameterCircle / 2);
    time.setAttribute("y", diameterCircle / 3);
    time.setAttribute("text-anchor", "middle");
    time.style = "font-family: 'Gidole', serif; font-weight: 800; ";
    time.style.fontSize = diameterGreenCircle / 1.5 + "px";

    svg.appendChild(time);

    setInterval(updateTime, 1000);

    let hours;
    let minutes;
    let seconds;
    let milliSeconds;
    updateTime();
    function updateTime() {
      const currTime = new Date();
      const currTimeStr = formatTime(currTime);
      time.innerHTML = currTimeStr;
      let secondDeg = (seconds / 60) * 360;
      let minuteDeg = (minutes / 60 + seconds / 60 / 60) * 360;
      let hourDeg =
        (hours / 12 + minutes / 60 / 12 + seconds / 3600 / 12) * 360;
      secondArrow.setAttribute(
        "transform",
        `rotate(${secondDeg}, ${diameterCircle / 2}, ${diameterCircle / 2})`
      );
      minuteArrow.setAttribute(
        "transform",
        `rotate(${minuteDeg}, ${diameterCircle / 2}, ${diameterCircle / 2})`
      );
      hourArrow.setAttribute(
        "transform",
        `rotate(${hourDeg}, ${diameterCircle / 2}, ${diameterCircle / 2})`
      );
    }
    function formatTime(dt) {
      hours = dt.getHours();
      minutes = dt.getMinutes();
      seconds = dt.getSeconds();
      milliSeconds = dt.getMilliseconds();

      return (
        str0l(hours, 2) + ":" + str0l(minutes, 2) + ":" + str0l(seconds, 2)
      );
    }

    function str0l(val, len) {
      let strVal = val.toString();
      while (strVal.length < len) strVal = "0" + strVal;
      return strVal;
    }
  } else if (diameterCircle < 200) {
    errMessage.textContent = "Слишком маленькое значение!";
    document.querySelector("input").focus();
  } else if (diameterCircle > 800) {
    errMessage.textContent = "Слишком большое значение";
    document.querySelector("input").focus();
  }
}
