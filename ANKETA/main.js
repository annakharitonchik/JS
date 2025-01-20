let surname = prompt("Введите фамилию");
while (!surname) {
  alert("Введите корректную фамилию");
  surname = prompt("Введите фамилию");
}
let name = prompt("Введите имя");
while (!name) {
  alert("Введите корректное имя");
  name = prompt("Введите корректное имя");
}
let middleName = prompt("Введите отчество");
while (!middleName) {
  alert("Введите корректное отчество");
  middleName = prompt("Введите отчество");
}
let age = parseInt(prompt("Введите возраст"));
while (age == 0 || Number.isNaN(age)) {
  alert("Введите корректный возраст");
  age = parseInt(prompt("Введите возраст"));
}
let genderQuestion = confirm(
  "Ваш пол - мужской? (нажмите OK, если да и нажмите ОТМЕНА, если нет)"
);
let pension;
let gender;

//Пусть женщины выходят на пенсию в 55, а мужчины в 60

if (genderQuestion) {
  gender = "мужской";
  if (age < 60) {
    pension = "нет";
  } else {
    pension = "да";
  }
} else {
  gender = "женский";
  if (age < 55) {
    pension = "нет";
  } else {
    pension = "да";
  }
}

//alert

alert(`ваше ФИО: ${surname} ${name} ${middleName}\n
ваш возраст в годах: ${age}\n
ваш возраст в днях: ${age * 365}\n
через 5 лет вам будет: ${age + 5}\n
ваш пол: ${gender}\n
вы на пенсии: ${pension}`);
