const SURNAME = prompt("Введите фамилию");
while (!SURNAME) {
  alert("Введите корректную фамилию");
  SURNAME = prompt("Введите фамилию");
}
const NAME = prompt("Введите имя");
while (!NAME) {
  alert("Введите корректное имя");
  NAME = prompt("Введите корректное имя");
}
const MIDDLE_NAME = prompt("Введите отчество");
while (!MIDDLE_NAME) {
  alert("Введите корректное отчество");
  MIDDLE_NAME = prompt("Введите отчество");
}
const AGE = parseInt(prompt("Введите возраст"));
while (AGE == 0 || Number.isNaN(AGE)) {
  alert("Введите корректный возраст");
  AGE = parseInt(prompt("Введите возраст"));
}
const genderQuestion = confirm(
  "Ваш пол - мужской? (нажмите OK, если да и нажмите ОТМЕНА, если нет)"
);
let pension;
let gender;

//Пусть женщины выходят на пенсию в 55, а мужчины в 60

if (genderQuestion) {
  gender = "мужской";
  if (AGE < 60) {
    pension = "нет";
  } else {
    pension = "да";
  }
} else {
  gender = "женский";
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
ваш пол: ${gender}\n
вы на пенсии: ${pension}`);
