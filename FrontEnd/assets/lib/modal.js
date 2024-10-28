let modal = null;
let focusables = [];
let previouslyFocusedElement = null;
const focusableSelector = "button, a, input, textarea";

const openModal = async function (modalId) {
  modal = document.querySelector(modalId);

  if (!modal) throw new Error('Modal "' + modalId + '" not found!');

  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  previouslyFocusedElement = document.querySelector(":focus");
  modal.style.display = null;
  focusables[0].focus();
  modal.classList.add("modal-open");
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

const closeModal = function () {
  if (modal === null) return;
  if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();

  modal.classList.add("modal-closing");
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);

  modal.addEventListener("animationend", function onAnimationEnd(event) {
    if (event.animationName !== "fadeOut") return;

    modal.removeEventListener("animationend", onAnimationEnd);
    modal.classList.remove("modal-open", "modal-closing");
    clearModal();
    modal = null;
  });
};

const editTitleModal = function (title) {
  modal.querySelector(".title-modal").textContent = title;
};

const editContentModal = function (content) {
  modal.querySelector(".content-modal").appendChild(content);
};

const editActionsModal = function (actions) {
  modal.querySelector(".actions-modal").appendChild(actions);
};

const clearModal = function () {
  editTitleModal("");
  modal.querySelector(".content-modal").innerHTML = "";
  modal.querySelector(".actions-modal").innerHTML = "";
};

const stopPropagation = function (event) {
  event.stopPropagation();
};

const focusInModal = function (event) {
  event.preventDefault();
};

window.addEventListener("keydown", function (event) {
  if (modal === null) return;

  if (event.key === "Escape" || event.key === "Esc") {
    closeModal(event);
  }

  if (event.key === "Tab") {
    focusInModal(event);
    let index = focusables.findIndex(
      (f) => f === modal.querySelector(":focus")
    );
    if (event.shiftKey === true) {
      index--;
    } else {
      index++;
    }
    if (index >= focusables.length) {
      index = 0;
    }
    if (index < 0) {
      index = focusables.length - 1;
    }
    focusables[index].focus();
  }
});

export {
  openModal,
  closeModal,
  editTitleModal,
  editContentModal,
  editActionsModal,
};
