function deleteSpaces(s1) {
  let start = 0; //first index = 0
  let end = s1.length - 1; //last index = 47 - 1 = 46
  while (start < s1.length && s1[start] === " ") {
    start++;
  }
  while (end > start && s1[end] === " ") {
    end--;
  }
  let stringNoGaps = "";
  for (i = start; i < end + 1; i++) {
    stringNoGaps = stringNoGaps + s1[i];
  }
  return stringNoGaps;
}

let string1 = prompt(
  "Enter a string",
  "        Example: Hello, my name is Anna        "
);
alert("#" + deleteSpaces(string1) + "#");
