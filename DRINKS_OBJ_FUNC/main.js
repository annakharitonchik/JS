function ObjStorageFunc() {
  this.Storage = {};

  //addValue(key,value)
  this.addValue = function (key, value) {
    this.Storage[key] = value;
  };

  //getValue(key)
  this.getValue = function (key) {
    return this.Storage[key];
  };

  //deleteValue(key)
  this.deleteValue = function (key) {
    if (this.Storage.hasOwnProperty(key)) {
      delete this.Storage[key];
      return true;
    } else {
      return false;
    }
  };

  //getKeys()
  this.getKeys = function () {
    return Object.keys(this.Storage);
  };
}
//объект drinkStorage класса ObjStorageFunc
const drinkStorage = new ObjStorageFunc();
//добавила напитки и информацию
drinkStorage.addValue("Маргарита", {
  alcohol: "да",
  recipe: "текила, лайм, апельсиновый ликёр, соль, лёд",
});
drinkStorage.addValue("Пина Колада", {
  alcohol: "да",
  recipe: "ром, ананасовый сок, кокосовое молоко, лёд",
});
drinkStorage.addValue("Дайкири", {
  alcohol: "да",
  recipe: "ром, лаймовый сок, сахар, лёд",
});
drinkStorage.addValue("Клубничный Лимонад", {
  alcohol: "нет",
  recipe: "клубника, лимонный сок, сахар, газированная вода, лёд",
});
drinkStorage.addValue("Малиновый Фреш", {
  alcohol: "нет",
  recipe: "малина, мёд, лимонный сок, вода, лёд",
});
drinkStorage.addValue("Тропический Смузи", {
  alcohol: "нет",
  recipe: "манго, банан, ананасовый сок, йогурт, лёд",
});

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
  if (drinkStorage.getValue(nameDrink)) {
    alert(
      `напиток ${nameDrink}
алкогольный: ${drinkStorage.getValue(nameDrink).alcohol}
рецепт приготовления: ${drinkStorage.getValue(nameDrink).recipe}`
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
  if (drinkStorage.getKeys().length === 0) {
    alert(`Напитки отсутствуют. Добавьте напиток`);
  } else {
    alert(drinkStorage.getKeys().join(", "));
  }
}

// хочу доработать:
// убрать чувствительность к регистру
// не давать пользователю ввести пустую строку, что-то неверное
