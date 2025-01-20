let SURNAME = prompt("Введите фамилию");
while (!SURNAME) {
  alert("Введите корректную фамилию");
  SURNAME = prompt("Введите фамилию");
}
let NAME = prompt("Введите имя");
while (!NAME) {
  alert("Введите корректное имя");
  NAME = prompt("Введите корректное имя");
}
let MIDDLE_NAME = prompt("Введите отчество");
while (!MIDDLE_NAME) {
  alert("Введите корректное отчество");
  MIDDLE_NAME = prompt("Введите отчество");
}
let AGE = parseInt(prompt("Введите возраст"));
while (AGE == 0 || Number.isNaN(AGE)) {
  alert("Введите корректный возраст");
  AGE = parseInt(prompt("Введите возраст"));
}
let GENDER = confirm(
  "Ваш пол - мужской? (нажмите OK, если да и нажмите ОТМЕНА, если нет)"
);
let pension;

//Пусть женщины выходят на пенсию в 55, а мужчины в 60

if (GENDER) {
  GENDER = "мужской";
  if (AGE < 60) {
    pension = "нет";
  } else {
    pension = "да";
  }
} else {
  GENDER = "женский";
  if (AGE < 55) {
    pension = "нет";
  } else {
    pension = "да";
  }
}

//alert

alert(`ваше ФИО: ${SURNAME} ${NAME} ${MIDDLE_NAME}\n
ваш возраст в годах: ${AGE}\n
ваш возраст в днях: ${AGE * 365}\n
через 5 лет вам будет: ${AGE + 5}\n
ваш пол: ${GENDER}\n
вы на пенсии: ${pension}`);
