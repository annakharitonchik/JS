class LocStorageClass {
  constructor(keyStorage) {
    this.keyStorage = keyStorage;
    let value = localStorage.getItem(this.keyStorage);
    if (value) {
      this.Storage = JSON.parse(value);
    } else {
      this.Storage = {};
    }
  }
  //addValue(key,value)
  addValue(key, value) {
    this.Storage[key] = value;
    localStorage.setItem(this.keyStorage, JSON.stringify(this.Storage));
  }

  //getValue(key)
  getValue(key) {
    JSON.parse(localStorage.getItem(this.Storage[key]));
    return this.Storage[key];
  }

  //deleteValue(key)
  deleteValue(key) {
    if (this.Storage.hasOwnProperty(key)) {
      JSON.parse(localStorage.getItem(this.Storage[key]))
      delete this.Storage[key] ;
    localStorage.setItem(this.keyStorage, JSON.stringify(this.Storage));
      return true;
    } else {
      return false;
    }
  }

  //getKeys()
  getKeys() {
    return Object.keys(this.Storage);
  }
}
// объект drinkStorage класса ObjStorageClass
const drinkStorage = new LocStorageClass("drinks");
const mealStorage = new LocStorageClass("meals");

//«ввод информации о напитке»
function inputDrinkInfo() {
  let nameDrink = prompt("Введите название напитка", "Мохито");
  let alcohol = prompt("Напиток алкогольный(да/нет)?", "да");
  let recipe = prompt("Введите рецепт напитка", "ром, мята, сахар, лайм, лёд");
  let info = { alcohol, recipe };
  drinkStorage.addValue(nameDrink, info);
  alert(`Информация сохранена`);
}

//«получение информации о напитке»
function getDrinkInfo() {
  let nameDrink = prompt("Введите название напитка", "Мохито");

  //создала переменную, вызвала один раз
  let value = drinkStorage.getValue(nameDrink);
  if (value) {
    alert(
      `напиток ${nameDrink}
алкогольный: ${value.alcohol}
рецепт приготовления: ${value.recipe}`
    );
  } else {
    alert(`Такой напиток отсутствует`);
  }
}

//«удаление информации о напитке»
function deleteDrinkInfo() {
  let nameDrink = prompt("Введите название напитка", "Мохито");
  if (drinkStorage.deleteValue(nameDrink)) {
    alert(`Напиток удален`);
  } else {
    alert(`Такой напиток отсутствует`);
  }
}

//«перечень всех напитков»
function listDrinks() {
  let arrKeys = drinkStorage.getKeys();
  if (arrKeys.length === 0) {
    alert(`Напитки отсутствуют. Добавьте напиток`);
  } else {
    alert(arrKeys.join(", "));
  }
}

//«ввод информации о блюде»
function inputMealInfo() {
  let nameMeal = prompt("Введите название блюда", "Пицца");
  let kitchen = prompt("Вид кухни?", "Итальянская");
  let recipe = prompt(
    "Введите рецепт блюда",
    "мука, вода, дрожжи, соль, сахар, оливковое масло, томатный соус"
  );
  let info = { kitchen, recipe };
  mealStorage.addValue(nameMeal, info);
  alert(`Информация сохранена`);
}

//«получение информации о блюде»
function getMealInfo() {
  let nameMeal = prompt("Введите название блюда", "Пицца");

  //создала переменную, вызвала один раз
  let value = mealStorage.getValue(nameMeal);
  if (value) {
    alert(
      `блюдо: ${nameMeal}
кухня: ${value.kitchen}
рецепт приготовления: ${value.recipe}`
    );
  } else {
    alert(`Такое блюдо отсутствует`);
  }
}

//«удаление информации о блюде»
function deleteMealInfo() {
  let nameMeal = prompt("Введите название блюда", "Пицца");
  if (mealStorage.deleteValue(nameMeal)) {
    alert(`Блюдо удалено`);
  } else {
    alert(`Такое блюдо отсутствует`);
  }
}

//«перечень всех блюд»
function listMeals() {
  let arrKeys = mealStorage.getKeys();
  if (arrKeys.length === 0) {
    alert(`Блюда отсутствуют. Добавьте блюдо`);
  } else {
    alert(arrKeys.join(", "));
  }
}
