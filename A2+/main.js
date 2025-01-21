function deleteGaps(string) {
  while (string[0] == " ") {
    string = string.slice(1);
  }
  while (string[string.length - 1] == " ") {
    string = string.slice(0, string.length - 1);
  }
  return string;
}

let s = prompt("Введите строку", "        hello my name is anna        ");
alert("#" + deleteGaps(s) + "#");
