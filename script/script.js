const initialCards = [
  {
    name: "Австрия",
    link: "./images/avstria.jpeg",
  },
  {
    name: "Черногория",
    link: "./images/chernogorija.jpeg",
  },
  {
    name: "Эстония",
    link: "./images/estonia.jpeg",
  },
  {
    name: "Греция",
    link: "./images/gretsiya.jpeg",
  },
  {
    name: "Корея",
    link: "./images/korea.jpeg",
  },
  {
    name: "Венеция",
    link: "./images/venesia.jpeg",
  },
];

const editButton = document.querySelector(".profile__button-edit");
const addButton = document.querySelector(".profile__button-add");
const closeButton = document.querySelector(".popup__button-close");
const closeButtonNewPlace = document.querySelector(".close_new_place");

const editPopup = document.querySelector(".popup");
const addPopup = document.querySelector(".new_place");
const createPopup = document.querySelector(".new_place");

const formElement = document.getElementById("profile_form");
const addForm = document.getElementById("create_form");

const inputTitle = document.querySelector(".popup__input_type_title");
const inputSubTitle = document.querySelector(".popup__input_type_subtitle");

const title = document.querySelector(".profile__title");
const subTitle = document.querySelector(".profile__subtitle");

//функция создания карточек
function createCards() {
  // получаем ul лист для отрисовки в него карточек
  const list = document.querySelector(".cards__list");

  // цикл для прохождения по элементам массива карточек
  initialCards.forEach((item) => {
    // создаем li - корневой элемент карточки
    const element = document.createElement("li");
    // добавляем ему нужный класс
    element.classList.add("card");

    // создаем элемент img
    const imageEl = document.createElement("img");
    // добавляем ему класс для валидного отображения
    imageEl.classList.add("card__image");
    // тегу img добавляем значение элемента массива link в src
    imageEl.src = item.link;
    // тегу img добавляем значение элемента массива name в link
    imageEl.alt = item.name;

    // создаем div (контейнер) для отрисовки значений
    const description = document.createElement("div");
    // добавляем ему класс
    description.classList.add("card__description");

    // создаем заголовок карточки
    const descriptionTitle = document.createElement("p");
    // добавляем класс
    descriptionTitle.classList.add("card__description-title");
    // вставляем текст в заголовок, текст из элемента массива
    descriptionTitle.textContent = item.name;

    // создаем кнопку "нравится"
    const likeButton = document.createElement("button");
    // добавляем ей класс
    likeButton.classList.add("card__like-button");

    // ниже добавляем заголовок и кнопку нравится в контейнер описания
    description.appendChild(descriptionTitle);
    description.appendChild(likeButton);

    // в корневой элемент карточки (li) добавляем изображение, которое мы создали
    element.append(imageEl);
    // так же добавляем desciption, appendChild добавляет в конец (описание должно быть под изображением)
    element.appendChild(description);

    // в конце добавляем готовый элемент в лист (ul)
    list.appendChild(element);
  });
}

createCards();

function closePopup(popupRef) {
  popupRef.classList.remove("popup_opened");
}

function openPopup(popupRef) {
  popupRef.classList.add("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  const titleValue = inputTitle.value;
  const subTitleValue = inputSubTitle.value;

  title.textContent = titleValue;
  subTitle.textContent = subTitleValue;
  closePopup(editPopup);
}

editButton.addEventListener("click", () => {
  openPopup(editPopup);
  inputTitle.value = title.textContent;
  inputSubTitle.value = subTitle.textContent;
});

addButton.addEventListener("click", () => {
  openPopup(addPopup);
});

closeButton.addEventListener("click", () => closePopup(editPopup));
closeButtonNewPlace.addEventListener("click", () => closePopup(addPopup));
formElement.addEventListener("submit", formSubmitHandler);
