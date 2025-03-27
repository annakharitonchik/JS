const tags = document.querySelectorAll(".center"); //стили для входных параметров
tags.forEach(
  (tag) =>
    (tag.style =
      "display: flex; margin: 10px auto; justify-content: center; font-family: 'Gidole', serif; font-weight: 400;")
);

const yellowCircle = document.querySelector("#yellowCircle"); //стили для диаметра циферблата
yellowCircle.style =
  " width: 200px; border-radius: 50%; display: none; margin: 120px auto; justify-content: center; background-color: #fcca66; position:relative";

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
    yellowCircle.style.width = diameterCircle + "px"; //размеры желтого циферблата
    yellowCircle.style.height = diameterCircle + "px"; //размеры желтого циферблата
    yellowCircle.style.display = "flex";
    errMessage.style.display = "none";
    let diameterGreenCircle = diameterCircle / 8;
    let R = diameterCircle / 2; //радиус большого желтого круга
    let r = diameterGreenCircle / 2; //радиус маленокой зеленого круга

    for (i = 1; i <= numClock; i++) {
      const grinCircle = document.createElement("div");
      grinCircle.style =
        "background:#47b281; border-radius: 50%; z-index:100; display: flex; justify-content: center; align-items: center; font-family: 'Gidole', serif; font-weight: 400;position:absolute";
      grinCircle.style.width = diameterGreenCircle + "px";
      grinCircle.style.height = diameterGreenCircle + "px";
      grinCircle.textContent = i;
      grinCircle.style.fontSize = diameterGreenCircle / 1.5 + "px";
      let top = Math.sin(Alfa) * (R - 2 * r) + R - r;
      let left = Math.cos(Alfa) * (R - 2 * r) + R - r;
      grinCircle.style.top = top + "px";
      grinCircle.style.left = left + "px";
      Alfa += singularAngle;
      yellowCircle.appendChild(grinCircle);
    }
    const hourArrow = document.createElement("div");
    const minuteArrow = document.createElement("div");
    const secondArrow = document.createElement("div");
    hourArrow.style =
      " opacity:0.8; background-color:black; z-index:200;  align-self: center; position: absolute; transform-origin: 50% 90%;";
    hourArrow.style.width = diameterCircle / 40 + "px";
    hourArrow.style.height = diameterCircle * 0.3 + "px";
    hourArrow.style.marginBottom = diameterCircle * 0.3 * 0.8 + "px";
    hourArrow.style.borderRadius = diameterCircle / 4 + "px";
    minuteArrow.style =
      " opacity:0.8; background-color:black; z-index:200;  align-self: center; position: absolute; transform-origin: 50% 90%;";
    minuteArrow.style.width = diameterCircle / 50 + "px";
    minuteArrow.style.height = diameterCircle * 0.35 + "px";
    minuteArrow.style.marginBottom = diameterCircle * 0.35 * 0.8 + "px";
    minuteArrow.style.borderRadius = diameterCircle / 4 + "px";
    secondArrow.style =
      " opacity:0.8; background-color:black; z-index:200;  align-self: center; position: absolute; transform-origin: 50% 90%;";
    secondArrow.style.width = diameterCircle / 60 + "px";
    secondArrow.style.height = diameterCircle * 0.45 + "px";
    secondArrow.style.marginBottom = diameterCircle * 0.45 * 0.8 + "px";
    secondArrow.style.borderRadius = diameterCircle / 4 + "px";
    yellowCircle.appendChild(secondArrow);
    yellowCircle.appendChild(minuteArrow);
    yellowCircle.appendChild(hourArrow);
    tags.forEach((tag) => (tag.style.display = "none"));
    let time = document.createElement("div");
    time.style = "font-family: 'Gidole', serif; font-weight: 800; ";
    time.style.fontSize = diameterGreenCircle / 1.5 + "px";
    time.style.marginTop = "30%";
    yellowCircle.appendChild(time);
    setInterval(updateTime, 1000 / 60);
    let hours;
    let minutes;
    let seconds;
    let milliSeconds;
    function updateTime() {
      const currTime = new Date();
      const currTimeStr = formatTime(currTime);
      time.innerHTML = currTimeStr;
      let secondDeg = (seconds / 60 + milliSeconds / 1000 / 60) * 360;
      let minuteDeg = (minutes / 60 + seconds / 60 / 60) * 360;
      let hourDeg =
        (hours / 12 + minutes / 60 / 12 + seconds / 3600 / 12) * 360;
      secondArrow.style.transform = `rotate( ${secondDeg}deg)`;
      minuteArrow.style.transform = `rotate( ${minuteDeg}deg)`;
      hourArrow.style.transform = `rotate( ${hourDeg}deg)`;
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
