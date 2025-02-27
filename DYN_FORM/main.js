function createForm(userForm) {
  const form = document.createElement("form");
  form.method = "post";
  form.action = "https://fe.it-academy.by/TestForm.php";
  let element;
  userForm.forEach((field) => {
    if (field.label) {
      const p = document.createElement("p");
      element = document.createTextNode(field["label"]);

      p.setAttribute(
        "style",
        "display: inline-block; width: 200px;margin: 8px 0;"
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
    form.appendChild(space);
  });
  const div = document.createElement("div");
  div.style = "border-top: solid gray; margin-bottom: 30px; padding-top:20px";
  div.appendChild(form);
  return document.body.appendChild(div);
}

const formDef2 = [
  { label: "Фамилия:", kind: "longtext", name: "lastname" },
  { label: "Имя:", kind: "longtext", name: "firstname" },
  { label: "Отчество:", kind: "longtext", name: "secondname" },
  { label: "Возраст:", kind: "number", name: "age" },
  { caption: "Зарегистрироваться", kind: "submit" },
];

const formDef1 = [
  { label: "Название сайта:", kind: "longtext", name: "sitename" },
  { label: "URL сайта:", kind: "longtext", name: "siteurl" },
  { label: "Посетителей в сутки:", kind: "number", name: "visitors" },
  { label: "E-mail для связи:", kind: "shorttext", name: "email" },
  {
    label: "Рубрика каталога:",
    kind: "dropdown",
    name: "division",
    variants: [
      { text: "здоровье", value: 1 },
      { text: "домашний уют", value: 2 },
      { text: "бытовая техника", value: 3 },
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

createForm(formDef1);

createForm(formDef2);
