let Num = parseInt(prompt("введите количество цветов"));

function randomDiap(n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}

function mood(colorsCount) {
  const colors = [
    "",
    "красный",
    "оранжевый",
    "жёлтый",
    "зелёный",
    "голубой",
    "синий",
    "фиолетовый",
  ];

  console.log("цветов: " + colorsCount);
  let obj = new Object();
  for (let i = 1; i <= colorsCount; i++) {
    let n = randomDiap(1, 7);
    let colorName = colors[n];
    while (colorName in obj) {
      n = randomDiap(1, 7);
      colorName = colors[n];
    }
    obj[colorName] = true;
    console.log(colorName);
  }
}

mood(Num);
