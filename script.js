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

  console.log(charsLeft);
};

textareaEl.addEventListener("input", inputHandler);
