// -- Counter Component --
const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");
const feebackListEl = document.querySelector(".feedbacks");
const submitBtnEl = document.querySelector(".submit-btn");

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

const submitHandler = (event) => {
  // preven default broser action submit
  event.preventDefault();

  // get text from textarea
  const text = textareaEl.value;

  //validate text (ex. check if is #hastag i present and text is long enoiugh)
  if (text.includes("#") && text.length >= 5) {
    //show valid indicator
    formEl.classList.add("form--valid"); //remove visual indicator
    setTimeout(() => formEl.classList.remove("form--valid"), 2000);
  } else {
    //show invalid indicator
    formEl.classList.add("form--invalid");
    //remove visual indicator
    setTimeout(() => formEl.classList.remove("form--invalid"), 2000);

    //focus textarea
    textareaEl.focus();

    // stop function execution
    return;
  }

  // we have text, now extract other info from text
  const hashtag = text.split(" ").find((word) => word.includes("#"));
  const company = hashtag.substring(1);
  const badgeLetter = company.substring(0, 1).toUpperCase();
  const upvoteCount = 0;
  const daysAgo = 0;

  // new feeback item html
  const feebackItemHTML = `
    <li class="feedback">
      <button class="upvote">
          <i class="fa-solid fa-caret-up upvote__icon"></i>
          <span class="upvote__count">${upvoteCount}</span>
      </button>
      <section class="feedback__badge">
          <p class="feedback__letter">${badgeLetter}</p>
      </section>
      <div class="feedback__content">
          <p class="feedback__company">${company}</p>
          <p class="feedback__text">${text}</p>
      </div>
      <p class="feedback__date">${daysAgo === 0 ? "NEW" : `${daysAgo}d`}</p>
  </li>
  `;

  //insert new feedback item in list
  feebackListEl.insertAdjacentHTML("beforeend", feebackItemHTML);

  //clear textare
  textareaEl.value = "";

  //blur submit button
  submitBtnEl.blur();

  //reset counter
  counterEl.textContent = 150;
};

formEl.addEventListener("submit", submitHandler);
