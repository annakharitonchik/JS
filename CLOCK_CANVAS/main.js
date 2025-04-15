const tags = document.querySelectorAll(".center"); //стили для входных параметров
tags.forEach(
  (tag) =>
    (tag.style =
      "display: flex; margin: 10px auto; justify-content: center; font-family: 'Gidole', serif; font-weight: 400;")
);
const canvas = document.querySelector("#yellowCircle");
canvas.style = "display: flex; margin: 120px auto;";
const ctx = canvas.getContext("2d");

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
    errMessage.style.display = "none";
    let diameterGreenCircle = diameterCircle / 8;
    let R = diameterCircle / 2; //радиус большого желтого круга
    let r = diameterGreenCircle / 2; //радиус маленького зеленого круга
    canvas.setAttribute("width", diameterCircle + "px");
    canvas.setAttribute("height", diameterCircle + "px");
    ctx.beginPath();
    ctx.arc(R, R, R, 0, 2 * Math.PI);
    ctx.fillStyle = "#fcca66";
    ctx.fill();
    for (i = 1; i <= numClock; i++) {
      let top = Math.sin(Alfa) * (R - 1.5 * r) + R;
      let left = Math.cos(Alfa) * (R - 1.5 * r) + R;
      ctx.beginPath();
      ctx.arc(left, top, r, 0, Math.PI * 2);
      ctx.fillStyle = "#48b382";
      ctx.fill();
      ctx.fillStyle = "black";
      ctx.font = `${diameterGreenCircle / 1.5}px Gidole`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(i.toString(), left, top);
      Alfa += singularAngle;
    }

    function roundedRect(ctx, x, y, width, height, radius, angle) {
      console.log(ctx.origin);
      ctx.translate(R, R);
      ctx.globalAlpha = 0.8;
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(x, y + radius);
      ctx.arcTo(x, y + height, x + radius, y + height, radius);
      ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
      ctx.arcTo(x + width, y, x + width - radius, y, radius);
      ctx.arcTo(x, y, x, y + radius, radius);
      ctx.stroke();
      ctx.fillRect(x + radius, y + height, 1, 1);
      ctx.rotate(-angle);
      ctx.translate(-R, -R);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    roundedRect(
      ctx,
      -diameterCircle / 80,
      -diameterCircle * 0.3,
      diameterCircle / 40,
      diameterCircle * 0.3,
      diameterCircle / 100
    );

    roundedRect(
      ctx,
      -diameterCircle / 50,
      -diameterCircle * 0.35,
      diameterCircle / 50,
      diameterCircle * 0.35,
      diameterCircle / 150
    );

    roundedRect(
      ctx,
      -diameterCircle / 60,
      -diameterCircle * 0.45,
      diameterCircle / 60,
      diameterCircle * 0.45,
      diameterCircle / 200
    );

    tags.forEach((tag) => (tag.style.display = "none"));

    setInterval(updateTime, 1000);

    let hours;
    let minutes;
    let seconds;
    let milliSeconds;
    updateTime();
    function updateTime() {
      const currTime = new Date();
      const currTimeStr = formatTime(currTime);
      ctx.beginPath();
      ctx.arc(R, R, R, 0, 2 * Math.PI);
      ctx.fillStyle = "#fcca66";
      ctx.fill();

      for (i = 1; i <= numClock; i++) {
        let top = Math.sin(Alfa) * (R - 1.5 * r) + R;
        let left = Math.cos(Alfa) * (R - 1.5 * r) + R;
        ctx.beginPath();
        ctx.arc(left, top, r, 0, Math.PI * 2);
        ctx.fillStyle = "#48b382";
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.font = `${diameterGreenCircle / 1.5}px Gidole`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(i.toString(), left, top);
        Alfa += singularAngle;
      }
      let secondDeg = (seconds / 60) * 360;
      let minuteDeg = (minutes / 60 + seconds / 60 / 60) * 360;
      let hourDeg =
        (hours / 12 + minutes / 60 / 12 + seconds / 3600 / 12) * 360;

      roundedRect(
        ctx,
        -diameterCircle / 80,
        -diameterCircle * 0.3,
        diameterCircle / 45,
        diameterCircle * 0.32,
        diameterCircle / 100,
        (hourDeg * Math.PI) / 180
      );

      roundedRect(
        ctx,
        -diameterCircle / 100,
        -diameterCircle * 0.35,
        diameterCircle / 50,
        diameterCircle * 0.38,
        diameterCircle / 150,
        (minuteDeg * Math.PI) / 180
      );

      roundedRect(
        ctx,
        -diameterCircle / 120,
        -diameterCircle * 0.45,
        diameterCircle / 60,
        diameterCircle * 0.48,
        diameterCircle / 200,
        (secondDeg * Math.PI) / 180
      );
      ctx.fillStyle = "black";
      ctx.font = `${diameterGreenCircle / 1.5}px Gidole`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(currTimeStr, R, R / 1.7);

      console.log(seconds);
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
