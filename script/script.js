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

const editPopup = document.querySelector(".popup_edit");
const addPopup = document.querySelector(".popup_add");
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

// получаем модальное окно изображения
const picturePopup = document.querySelector(".picture-popup");
// получаем элемент закрытия окна изоборжения
const picturePopupButtonClose = document.querySelector(".picture-popup__close");

// получаем template
const cardTemplate = document.querySelector(".template").content;

// функция закрытия модального окна
function closePopup(popupRef) {
  popupRef.classList.remove("popup_opened");
}

// функция открытия модального окна
function openPopup(popupRef) {
  popupRef.classList.add("popup_opened");
}

function handleLikeButton(event) {
  event.preventDefault();
  // получаем элемент по которому было произведено событие
  const likeButton = event.target;
  // переключаем этому элементу класс (добавляем/удаляем)
  likeButton.classList.toggle("card__like-button_ative");
}

function handleDelete(event) {
  const target = event.target.parentElement;
  target.remove();
}

function handleClickImage(event) {
  const target = event.target;

  const card = target.closest(".card");

  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__description-title");

  picturePopup.classList.toggle("popup_opened");

  const popupImage = document.querySelector(".picture-popup__image");
  const popupTitle = document.querySelector(".picture-popup__description");

  const link = cardImage.src;
  const title = cardTitle.textContent;

  popupImage.setAttribute("src", link);
  popupImage.setAttribute("alt", title);

  popupTitle.textContent = title;
  picturePopupButtonClose.addEventListener("click", () =>
    closePopup(picturePopup)
  );
}

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

  const likeButton = element.querySelector(".card__like-button");
  const deleteButton = element.querySelector(".card__trash-button");
  likeButton.addEventListener("click", handleLikeButton);
  deleteButton.addEventListener("click", handleDelete);
  image.addEventListener("click", handleClickImage);

  return element;
}

//функция создания карточек
function renderCards() {
  // цикл для прохождения по элементам массива карточек
  initialCards.forEach((item) => {
    // на каждом шаге цикла создаем элемент
    const element = createCard(item);
    // добавляем элемент в лист
    list.appendChild(element);
  });
}

// функция редактирования карточки
function formSubmitHandler(evt) {
  evt.preventDefault();
  const titleValue = inputTitle.value;
  const subTitleValue = inputSubTitle.value;

  title.textContent = titleValue;
  subTitle.textContent = subTitleValue;
  closePopup(editPopup);
}

// функция добавления карты
function addCard(event) {
  event.preventDefault();
  // получаем значения из инпутов
  const name = inputAddTitle.value;
  const link = inputAddImage.value;

  // создаем карточку, передавая в нее объект с именем и ссылкой
  const card = createCard({
    name,
    link,
  });

  // добавляем в начало листа (при помощи prepend)
  list.prepend(card);

  // закрываем модальное окно
  closePopup(addPopup);
  // очищаем инпуты
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
