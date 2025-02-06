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
  let count = {};

  for (let i = 0; i < s.length; i++) {
    if (!(s[i] in count)) {
      count[s[i]] = 0;
    }
    count[s[i]]++;
  }
  let sum = 0;
  for (let i = 0; i < VOWELS.length; i++) {
    if (VOWELS[i] in count) {
      sum = sum + count[VOWELS[i]];
    }
  }
  return sum;
}
console.log("количество гласных: " + vowelCounter(string));
