const editButton = document.querySelector(".profile__button-edit");
const closeButton = document.querySelector(".popup__button-close");
const popup = document.querySelector(".popup");

const formElement = document.querySelector(".popup__form");

const inputTitle = document.querySelector(".popup__input_type_title");
const inputSubTitle = document.querySelector(".popup__input_type_subtitle");

const title = document.querySelector(".profile__title");
const subTitle = document.querySelector(".profile__subtitle");



function closePopup() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  const titleValue = inputTitle.value;
  const subTitleValue = inputSubTitle.value;

  title.textContent = titleValue;
  subTitle.textContent = subTitleValue;
  closePopup();
}

editButton.addEventListener("click", () => {
  popup.classList.add("popup_opened");
  inputTitle.value = title.innerHTML;
  inputSubTitle.value = subTitle.innerHTML;
});

closeButton.addEventListener("click", closePopup);

formElement.addEventListener("submit", formSubmitHandler);


