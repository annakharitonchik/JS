// находим корни квадратного уравнения
// возвращает массив корней
function squareRoots(a, b, c) {
  const d = b * b - 4 * a * c; // дискриминант

  if (d < 0) return []; // нет корней

  if (d == 0) return [-b / (2 * a)]; // один корень
  if (d == b * b) return [-c / b];//ДОБАВИЛА УСЛОВИЕ 
  const x1 = (-b + Math.sqrt(d)) / (2 * a);
  const x2 = (-b - Math.sqrt(d)) / (2 * a);
  return [x1, x2]; // два корня
}

function squareRootsTests() {
  {
    console.log("тест 1,1,1 -> нет корней");
    const roots = squareRoots(1, 1, 1);
    console.log(roots.length == 0 ? "пройден" : "НЕ ПРОЙДЕН!");
  }

  {
    console.log("тест 1,-2,-3 -> два корня 3,-1");
    const roots = squareRoots(1, -2, -3);
    console.log(
      roots.length == 2 && roots[0] == 3 && roots[1] == -1
        ? "пройден"
        : "НЕ ПРОЙДЕН!"
    );
  }

  {
    console.log("тест -1,-2,15 -> два корня -5,3");
    const roots = squareRoots(-1, -2, 15);
    console.log(
      roots.length == 2 && roots[0] == -5 && roots[1] == 3
        ? "пройден"
        : "НЕ ПРОЙДЕН!"
    );
  }

  {
    console.log("тест 1,12,36 -> один корень -6");
    const roots = squareRoots(1, 12, 36);
    console.log(
      roots.length == 1 && roots[0] == -6 ? "пройден" : "НЕ ПРОЙДЕН!"
    );
  }

  {
    console.log("тест 0,5,-10 -> один корень 2");
    const roots = squareRoots(0, 5, -10);
    console.log(roots.length == 1 && roots[0] == 2 ? "пройден" : "НЕ ПРОЙДЕН!");
  }
}

function ttt() {
  const a = Number(prompt("Введите a"));
  const b = Number(prompt("Введите b"));
  const c = Number(prompt("Введите c"));
  const roots = squareRoots(a, b, c);

  if (!roots.length) alert("корней нет!");
  else if (roots.length == 1) alert("один корень: " + roots[0]);
  else alert("два корня: " + roots[0] + " и " + roots[1]);
}
