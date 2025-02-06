let string = prompt("Введите строку", "в этой строке девять ГЛАСНЫХ БУКВ!");

function vowelCounter(s) {
  const VOWELS = [
    "А",
    "а",
    "Е",
    "е",
    "Ё",
    "ё",
    "И",
    "и",
    "О",
    "о",
    "У",
    "у",
    "Э",
    "э",
    "Ю",
    "ю",
    "Ы",
    "ы",
    "Я",
    "я",
  ];
  let count = 0;
  for (let i = 0; i < string.length; i++) {
    if (VOWELS.indexOf(string[i]) != -1) {
      count++;
    }
  }
  return count;
}
function vowelCounter1(s) {
  const VOWELS = [
    "А",
    "а",
    "Е",
    "е",
    "Ё",
    "ё",
    "И",
    "и",
    "О",
    "о",
    "У",
    "у",
    "Э",
    "э",
    "Ю",
    "ю",
    "Ы",
    "ы",
    "Я",
    "я",
  ];
  let count = 0;
  for (let i = 0; i < string.length; i++) {
    if (VOWELS.includes(string[i])) {
      count++;
    }
  }
  return count;
}
console.log("количество гласных(indexOf): " + vowelCounter(string));
console.log("количество гласных(includes): " + vowelCounter1(string));
