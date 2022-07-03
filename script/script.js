// массив изображений
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

// кнопка редактирования карточки
const editButton = document.querySelector(".profile__button-edit");
// кнопка добавления карточки
const addButton = document.querySelector(".profile__button-add");

const closeButtons = document.querySelectorAll(".popup__button-close");

// модальное окно редактирования
const editPopup = document.querySelector(".popup_edit");
// модальное окно добавления
const addPopup = document.querySelector(".popup_add");

// элемент формы модального окна редактирования
const profileForm = document.getElementById("profile_form");
// элемент формы модального окна добавления
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

// получаем template
const cardTemplate = document.querySelector(".template").content;

// получаем элемент изображения модального окна изображения
const popupImage = document.querySelector(".picture-popup__image");
// получаем элемент описания модального окна изображения
const popupTitle = document.querySelector(".picture-popup__description");

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
  const target = event.target.closest(".card");
  target.remove();
}

function handleClickImage(item) {
  // открываем модальное окно карточки
  openPopup(picturePopup);

  // получаем ссылку картинки из карточки
  const link = item.link;
  // получаем заголовок карточки
  const title = item.name;

  // устанавливаем атрибуты alt/src в изображение модального окна
  popupImage.setAttribute("src", link);
  popupImage.setAttribute("alt", title);

  // добавляем текст из карточки в описание модального окна
  popupTitle.textContent = title;
}

function createCard(item) {
  // клонируем элемент
  const element = cardTemplate.querySelector(".card").cloneNode(true);

  // получаем img
  const image = element.querySelector(".card__image");
  // получаем заголовок
  const descriptionTitle = element.querySelector(".card__description-title");

  // тегу img добавляем значение элемента массива link в src
  image.setAttribute("src", item.link);
  // тегу img добавляем значение элемента массива name в link
  image.setAttribute("alt", item.name);

  // вставляем текст в заголовок, текст из элемента массива
  descriptionTitle.textContent = item.name;

  const likeButton = element.querySelector(".card__like-button");
  const deleteButton = element.querySelector(".card__trash-button");
  likeButton.addEventListener("click", handleLikeButton);
  deleteButton.addEventListener("click", handleDelete);
  image.addEventListener("click", () => handleClickImage(item));

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

// функция редактирования профиля
function handleProfileFormSubmit(event) {
  event.preventDefault();
  const titleValue = inputTitle.value;
  const subTitleValue = inputSubTitle.value;

  title.textContent = titleValue;
  subTitle.textContent = subTitleValue;
  closePopup(editPopup);
}

// функция добавления карточки
function handleAddCard(event) {
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
  event.target.reset();
}

editButton.addEventListener("click", () => {
  openPopup(editPopup);
  inputTitle.value = title.textContent;
  inputSubTitle.value = subTitle.textContent;
});

addButton.addEventListener("click", () => {
  openPopup(addPopup);
});

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest(".popup");
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener("click", () => closePopup(popup));
});

// слушатель события отправки формы редактирования
profileForm.addEventListener("submit", handleProfileFormSubmit);
// слушатель события отправки формы добавления
addForm.addEventListener("submit", handleAddCard);

// отрисовываем карточки
renderCards();
