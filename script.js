const MAX_CHARS = 150;
const BASE_API_URL = "https://bytegrad.com/course-assets/js/1/api";

const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");
const feebackListEl = document.querySelector(".feedbacks");
const submitBtnEl = document.querySelector(".submit-btn");
const spinnerEl = document.querySelector(".spinner");
const hashtagListEl = document.querySelector(".hashtags");

const renderFeedbackItem = (feedbackItem) => {
  // new feeback item html
  const feebackItemHTML = `
  <li class="feedback">
    <button class="upvote">
      <i class="fa-solid fa-caret-up upvote__icon"></i>
      <span class="upvote__count">${feedbackItem.upvoteCount}</span>
    </button>
    <section class="feedback__badge">
      <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
    </section>
    <div class="feedback__content">
      <p class="feedback__company">${feedbackItem.company}</p>
      <p class="feedback__text">${feedbackItem.text}</p>
    </div>
    <p class="feedback__date">${
      feedbackItem.daysAgo === 0 ? "NEW" : `${feedbackItem.daysAgo}d`
    }</p>
  </li>
  `;

  //insert new feedback item in list
  feebackListEl.insertAdjacentHTML("beforeend", feebackItemHTML);
};

// -- Counter Component --
const inputHandler = () => {
  // Determine maximum number of charaters

  // determin number of charaters currently typed
  const nrCharsTyped = textareaEl.value.length;

  // calculate number of charaters left(max minus currently typed)
  const charsLeft = MAX_CHARS - nrCharsTyped;

  // show number of charaters left
  counterEl.textContent = charsLeft;
};

textareaEl.addEventListener("input", inputHandler);

// -- Form Component --
const showVisualIndicator = (textCheck) => {
  const className = textCheck === "valid" ? "form--valid" : "form--invalid";

  //show  indicator
  formEl.classList.add(className);
  //remove indicator
  setTimeout(() => formEl.classList.remove(className), 2000);
};

const submitHandler = (event) => {
  // preven default broser action submit
  event.preventDefault();

  // get text from textarea
  const text = textareaEl.value;

  //validate text (ex. check if is #hastag i present and text is long enoiugh)
  if (text.includes("#") && text.length >= 5) {
    showVisualIndicator("valid");
  } else {
    showVisualIndicator("invalid");
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

  // render feeback and list
  const feedbackItem = {
    upvoteCount: upvoteCount,
    company: company,
    badgeLetter: badgeLetter,
    daysAgo: daysAgo,
    text: text,
  };
  renderFeedbackItem(feedbackItem);

  //send feedback item to server
  fetch(`${BASE_API_URL}/feedbacks`, {
    method: "POST",
    body: JSON.stringify(feedbackItem),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Something Went Wrong");
        return;
      }
      console.log("Succesfully Submitted");
    })
    .catch((error) => console.log(error.message));

  //clear textare
  textareaEl.value = "";

  //blur submit button
  submitBtnEl.blur();

  //reset counter
  counterEl.textContent = MAX_CHARS;
};

formEl.addEventListener("submit", submitHandler);

// feeback list component
const clickhandler = (event) => {
  const clickedEl = event.target;

  const upvoteIntention = clickedEl.className.includes("upvote");

  if (upvoteIntention) {
    const upvoteBtnEl = clickedEl.closest(".upvote");

    upvoteBtnEl.disabled = true;

    const upvoteCountEl = upvoteBtnEl.querySelector(".upvote__count");

    let upvoteCounts = +upvoteCountEl.textContent;
    upvoteCounts = upvoteCounts + 1;

    upvoteCountEl.textContent = upvoteCounts++;
  } else {
    clickedEl.closest(".feedback").classList.toggle("feedback--expand");
  }
};

feebackListEl.addEventListener("click", clickhandler);

fetch(`${BASE_API_URL}/feedbacks`)
  .then((response) => response.json())
  .then((data) => {
    spinnerEl.remove();
    data.feedbacks.map((feedbackItem) => {
      renderFeedbackItem(feedbackItem);
    });
  })
  .catch((error) => {
    feebackListEl.textContent = `Failed to fetch feedback list element ${error.message}`;
  });

// hashtah list component
const clickHandler2 = (event) => {
  //get the click element
  const clickedEl = event.target;

  if (clickedEl.className === "hashtags") return;

  const companyNameFromHashtag = clickedEl.textContent
    .substring(1)
    .toLowerCase()
    .trim();

  feebackListEl.childNodes.forEach((childNode) => {
    if (childNode.nodeType === 3) return;

    const companyNameFromFeedbackItem = childNode
      .querySelector(".feedback__company")
      .textContent.toLowerCase()
      .trim();

    if (companyNameFromHashtag !== companyNameFromFeedbackItem) {
      childNode.remove();
    }
  });
};

hashtagListEl.addEventListener("click", clickHandler2);
