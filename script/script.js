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

const inputAddTitle = document.getElementById("add_title");
const inputAddImage = document.getElementById("add_image");

const inputTitle = document.querySelector(".popup__input_type_title");
const inputSubTitle = document.querySelector(".popup__input_type_subtitle");

const title = document.querySelector(".profile__title");
const subTitle = document.querySelector(".profile__subtitle");

const list = document.querySelector(".cards__list");

// получаем template
const cardTemplate = document.querySelector(".template").content;

function createCard(item) {
  // клонируем элемент
  const element = cardTemplate.querySelector(".card").cloneNode(true);

  // получаем img
  const image = element.querySelector(".card__image");
  // получаем заголовок
  const descriptionTitle = element.querySelector(".card__description-title");

  // тегу img добавляем значение элемента массива link в src
  image.src = item.link;
  // тегу img добавляем значение элемента массива name в link
  image.alt = item.name;

  // вставляем текст в заголовок, текст из элемента массива
  descriptionTitle.textContent = item.name;

  return element;
}

//функция создания карточек
function renderCards() {
  // цикл для прохождения по элементам массива карточек
  initialCards.forEach((item) => {
    const element = createCard(item);
    list.appendChild(element);
  });
}

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

function addCard(event) {
  event.preventDefault();
  const name = inputAddTitle.value;
  const link = inputAddImage.value;

  const card = createCard({
    name,
    link,
  });

  list.prepend(card);

  closePopup(addPopup);
  inputAddTitle.value = "";
  inputAddImage.value = "";
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
addForm.addEventListener("submit", addCard);

renderCards();
