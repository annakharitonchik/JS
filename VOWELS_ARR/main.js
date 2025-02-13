let string = prompt("Введите строку", "в этой строке девять ГЛАСНЫХ БУКВ!");
string = string.toLowerCase().split(""); //преобразовала в массив

// 1 метод
function useForEach(s) {
  const arr = ["а", "е", "ё", "и", "о", "у", "э", "ю", "ы", "я"];
  let count = 0;
  s.forEach((v) => {
    let answer = arr.includes(v);
    if (answer) {
      count++;
    }
  });
  return count;
}

// 2 метод
function useFilter(s) {
  const arr = ["а", "е", "ё", "и", "о", "у", "э", "ю", "ы", "я"];
  let arr1 = s.filter((v) => arr.includes(v));
  return arr1.length;
}
// 3 метод
function useReduce(s) {
  const arr = ["а", "е", "ё", "и", "о", "у", "э", "ю", "ы", "я"];
  function vowel(r, v) {
    if (arr.includes(v)) {
      r++;
    }
    return r;
  }

  return s.reduce(vowel, 0);
}

console.log(
  `  количество гласных(useForEach): ${useForEach(string)}
  количество гласных(useFilter): ${useFilter(string)}
  количество гласных(useReduce): ${useReduce(string)}`
);
