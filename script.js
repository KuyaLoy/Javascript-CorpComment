// -- Counter Component --
const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");

const inputHandler = () => {
  // Determine maximum number of charaters
  const maxNrChars = 150;

  // determin number of charaters currently typed
  const nrCharsTyped = textareaEl.value.length;

  // calculate number of charaters left(max minus currently typed)
  const charsLeft = maxNrChars - nrCharsTyped;

  // show number of charaters left
  counterEl.textContent = charsLeft;
};

textareaEl.addEventListener("input", inputHandler);

// -- Submit Component --
const formEl = document.querySelector(".form");

const submitHandler = (event) => {
  // preven default broser action submit
  event.preventDefault();

  // get text from textarea
  const text = textareaEl.value;

  //validate text (ex. check if is #hastag i present and text is long enoiugh)

  if (text.includes("#") && text.length >= 5) {
    formEl.classList.add("form--valid");
    setTimeout(() => formEl.classList.remove("form--valid"), 2000);
  } else {
    formEl.classList.add("form--invalid");
    setTimeout(() => formEl.classList.remove("form--invalid"), 2000);
  }
};

formEl.addEventListener("submit", submitHandler);
