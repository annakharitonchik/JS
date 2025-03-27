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
const formElem = document.forms.info.elements;
formElem.developers.addEventListener("blur", () => validDev(false));
formElem.sitename.addEventListener("blur", () => validNameSite(false));
formElem.siteurl.addEventListener("blur", () => validURL(false));
formElem.sitedaterun.addEventListener("blur", () => validDate(false));
formElem.visitors.addEventListener("blur", () => validNumVisit(false));
formElem.email.addEventListener("blur", () => validEmail(false));
formElem.division.addEventListener("change", () => validRubric(false));
const arrButtons = formElem.payment;
arrButtons.forEach((button) =>
  button.addEventListener("change", () => validPayment(false))
);
formElem.votes.addEventListener("change", () => validVote(false));
formElem.description.addEventListener("blur", () => validDescription(false));
document.forms.info.addEventListener("submit", submit);

function validDev(isErr) {
  let errCount = 0;
  const message = formElem.developers.nextElementSibling;
  message.style.display = "inline-block";
  const value = formElem.developers.value;
  if (value.trim().length === 0) {
    message.textContent = "Поле пустое!";
    errCount++;

    if (isErr) {
      formElem.developers.focus();
    }
  } else if (value.trim().length > 20) {
    message.textContent = "Слишком длинный текст!";
    errCount++;
    if (isErr) {
      formElem.developers.focus();
    }
  } else {
    message.style.display = "none";
  }
  console.log(isErr);
  return errCount;
}
function validNameSite(isErr) {
  let errCount = 0;
  const message = formElem.sitename.nextElementSibling;
  message.style.display = "inline-block";
  const value = formElem.sitename.value;
  if (value.trim().length === 0) {
    message.textContent = "Поле пустое!";
    errCount++;
    if (isErr) {
      formElem.sitename.focus();
    }
  } else if (value.trim().length > 20) {
    message.textContent = "Слишком длинный текст!";
    errCount++;
    if (isErr) {
      formElem.sitename.focus();
    }
  } else {
    message.style.display = "none";
  }
  return errCount;
}
function validURL(isErr) {
  let errCount = 0;
  const message = formElem.siteurl.nextElementSibling;
  message.style.display = "inline-block";
  const value = formElem.siteurl.value;
  if (value.trim().length === 0) {
    message.textContent = "Поле пустое!";
    errCount++;
    if (isErr) {
      formElem.siteurl.focus();
    }
  } else if (value.trim().length > 20) {
    message.textContent = "Слишком длинный текст!";
    errCount++;
    if (isErr) {
      formElem.siteurl.focus();
    }
  } else {
    message.style.display = "none";
  }
  return errCount;
}
function validDate(isErr) {
  let errCount = 0;
  const message = formElem.sitedaterun.nextElementSibling;
  message.style.display = "inline-block";
  const value = formElem.sitedaterun.value;
  if (value.trim().length === 0) {
    message.textContent = "Поле пустое!";
    errCount++;
    if (isErr) {
      formElem.sitedaterun.focus();
    }
  } else {
    message.style.display = "none";
  }
  return errCount;
}
function validNumVisit(isErr) {
  let errCount = 0;
  const message = formElem.visitors.nextElementSibling;
  message.style.display = "inline-block";
  const value = formElem.visitors.value;
  if (Number(value) <= 0) {
    message.textContent = "Значение некорректно! ";
    errCount++;
    if (isErr) {
      formElem.visitors.focus();
    }
  } else {
    message.style.display = "none";
  }
  return errCount;
}
function validEmail(isErr) {
  let errCount = 0;
  const message = formElem.email.nextElementSibling;
  message.style.display = "inline-block";
  const value = formElem.email.value;
  if (value.trim().length === 0) {
    message.textContent = "Поле пустое!";
    errCount++;
    if (isErr) {
      formElem.email.focus();
    }
  } else if (!value.includes("@")) {
    message.textContent = "Почта некорректна! ";
    errCount++;
    if (isErr) {
      formElem.email.focus();
    }
  } else {
    message.style.display = "none";
  }
  return errCount;
}
function validRubric(isErr) {
  let errCount = 0;
  const message = formElem.division.nextElementSibling;
  message.style.display = "inline-block";
  const value = formElem.division.value;
  if (value === "1") {
    message.textContent = "Поле пустое!";
    errCount++;
    if (isErr) {
      formElem.division.focus();
    }
  } else {
    message.style.display = "none";
  }
  return errCount;
}
function validPayment(isErr) {
  let errCount = 0;
  const message =
    formElem.payment[formElem.payment.length - 1].nextElementSibling;
  message.style.display = "inline-block";
  const value = formElem.payment.value;
  if (!value) {
    message.textContent = "Поле пустое!";
    errCount++;
    if (isErr) {
      formElem.payment[0].focus();
    }
  } else {
    message.style.display = "none";
  }
  return errCount;
}
function validVote(isErr) {
  let errCount = 0;
  const message = formElem.votes.nextElementSibling;
  message.style.display = "inline-block";
  const value = formElem.votes.value;
  if (formElem.votes.checked) {
    message.style.display = "none";
  } else {
    message.textContent = "Поле пустое!";
    errCount++;
    if (isErr) {
      formElem.votes.focus();
    }
  }
  return errCount;
}
function validDescription(isErr) {
  let errCount = 0;
  const message = formElem.description.nextElementSibling;
  message.style.display = "inline-block";
  const value = formElem.description.value;
  if (value.trim().length === 0) {
    message.textContent = "Поле пустое!";
    errCount++;
    if (isErr) {
      formElem.description.focus();
    }
  } else {
    message.style.display = "none";
  }
  return errCount;
}
function submit(eo) {
  let errCount = 0;
  errCount += validDev(!errCount);
  console.log(errCount);
  errCount += validNameSite(!errCount);
  console.log(errCount);
  errCount += validURL(!errCount);
  console.log(errCount);
  errCount += validDate(!errCount);
  console.log(errCount);
  errCount += validNumVisit(!errCount);
  console.log(errCount);
  errCount += validEmail(!errCount);
  console.log(errCount);
  errCount += validRubric(!errCount);
  console.log(errCount);
  errCount += validPayment(!errCount);
  console.log(errCount);
  errCount += validVote(!errCount);
  console.log(errCount);
  errCount += validDescription(!errCount);
  console.log(errCount);
  if (errCount) {
    eo.preventDefault();
  }
}
