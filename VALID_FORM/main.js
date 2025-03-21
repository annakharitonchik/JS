//использую функцию с предыдущего ДЗ, чтобы создать форму
function createForm(userForm) {
  const form = document.createElement("form");
  form.name = "info";
  form.method = "post";
  form.action = "https://fe.it-academy.by/TestForm.php";
  let element;

  userForm.forEach((field) => {
    if (field.label) {
      const p = document.createElement("p");
      element = document.createTextNode(field["label"]);
      p.setAttribute(
        "style",
        "display: inline-block; width: 200px;margin: 5px 0;"
      );
      p.appendChild(element);
      form.appendChild(p);
    }

    if (field.kind == "dropdown") {
      select = document.createElement("select");
      select.name = field["name"];
      field.variants.forEach((optionText) => {
        element = document.createElement("option");
        element.value = optionText["value"];
        element.selected = optionText["selected"];
        element.disabled = optionText["disabled"];
        element.textContent = optionText["text"];
        select.appendChild(element);
      });
      form.appendChild(select);
    } else if (field.kind == "radio") {
      field.variants.forEach((radioText) => {
        element = document.createElement("input");
        element.name = field["name"];
        element.type = "radio";
        element.value = radioText["value"];
        form.appendChild(element);
        form.appendChild(document.createTextNode(radioText["text"]));
      });
    } else if (field.kind == "memo") {
      element = document.createElement("textarea");
      element.style = "display : block";
      form.appendChild(element);
      element.name = field["name"];
    } else {
      element = document.createElement("input");
      element.name = field["name"];

      switch (field.kind) {
        case "longtext":
        case "shorttext":
          element.setAttribute("type", "text");

          break;
        case "number":
          element.setAttribute("type", "number");

          break;
        case "date":
          element.setAttribute("type", "date");

          break;
        case "submit":
          element.setAttribute("type", "submit");
          element.value = field["caption"];

          break;
        case "check":
          element.type = "checkbox";

          break;
      }
      form.appendChild(element);
    }
    const space = document.createElement("br");
    const mess = document.createElement("p");
    mess.className = "message";
    mess.style = "display: none; margin:0 20px; color:red;font-weight:bold ";
    form.appendChild(mess);
    form.appendChild(space);
  });
  const div = document.createElement("div");
  div.textContent = "Для внесения вашего сайта в каталог, заполните форму: ";
  div.appendChild(form);
  return document.body.appendChild(div);
}
//сама форма
const FORM = [
  {
    label: "Разработчики:",
    kind: "longtext",
    name: "developers",
  },
  {
    label: "Название сайта:",
    kind: "longtext",
    name: "sitename",
  },
  { label: "URL сайта:", kind: "longtext", name: "siteurl" },
  { label: "Дата запуска сайта:	", kind: "date", name: "sitedaterun" },
  { label: "Посетителей в сутки:", kind: "number", name: "visitors" },
  { label: "E-mail для связи:", kind: "shorttext", name: "email" },
  {
    label: "Рубрика каталога:",
    kind: "dropdown",
    name: "division",
    variants: [
      {
        text: "выберите рубрику",
        value: 1,
        selected: "selected",
        disabled: "disabled",
      },
      { text: "здоровье", value: 2 },
      { text: "домашний уют", value: 3 },
      { text: "бытовая техника", value: 4 },
    ],
  },
  {
    label: "Размещение:",
    kind: "radio",
    name: "payment",
    variants: [
      { text: "бесплатное", value: 1 },
      { text: "платное", value: 2 },
      { text: "VIP", value: 3 },
    ],
  },
  { label: "Разрешить отзывы:", kind: "check", name: "votes" },
  { label: "Описание сайта:", kind: "memo", name: "description" },
  { caption: "Опубликовать", kind: "submit" },
];
//вывожу форму на страничку
createForm(FORM);

const formTag = document.forms.info;
const INPUTS = formTag.querySelectorAll("input, textarea, select");
INPUTS.forEach((input) => {
  input.addEventListener("blur", () => {
    let message = input.nextElementSibling;
    message.style.display = "inline-block";
    if (input.value.trim().length === 0) {
      message.textContent = "Поле пустое!";
    } else if (input.value.trim().length > 20 && input.type == "text") {
      message.textContent = "Слишком длинный текст!";
    } else if (Number(input.value) <= 0 && input.type == "number") {
      message.textContent = "Значение некорректно! ";
    } else if (input.type != "radio") {
      message.style.display = "none";
    } else if (input.type == "radio") {
      message = INPUTS[9].nextElementSibling;
      message.style.display = "none";
    }
  });
});
formTag.addEventListener("submit", (eo) => {
  eo = eo || window.event;
  let isValid = true;
  let isChecked = false;
  INPUTS.forEach((input) => {
    let message = input.nextElementSibling;
    message.style.display = "inline-block";

    if (input.value.trim().length === 0) {
      message.textContent = "Поле пустое!";
      isValid = false;
      input.focus();
    } else if (input.value.trim().length > 20 && input.type == "text") {
      message.textContent = "Слишком длинный текст!";
      isValid = false;
      input.focus();
    } else if (Number(input.value) <= 0 && input.type == "number") {
      message.textContent = "Значение некорректно! ";
      isValid = false;
      input.focus();
    } else if (input.type == "checkbox") {
      if (!input.checked) {
        message.textContent = "Поле пустое!";
        isValid = false;
        message.focus();
      } else {
        message.style.display = "none";
      }
    } else if (input.tagName == "SELECT" && input.value == "1") {
      message.textContent = "Поле пустое!";
      isValid = false;
    } else if (input.type != "radio") {
      message.style.display = "none";
    } else if (input.type == "radio") {
      if (input.checked) {
        isChecked = true;
      }
    }
  });
  message = INPUTS[9].nextElementSibling;
  if (!isChecked) {
    message.textContent = "Поле пустое!";
    message.focus();
    isValid = false;
  } else {
    message.style.display = "none";
  }

  if (!isValid) {
    eo.preventDefault();
  }
});
