let modal = null;
let focusables = [];
let previouslyFocused = null;

const focusSelector = 'button, a, input, textarea';

function openModal(modalElement) {
  if (!modalElement) throw new Error('Modal element not found!');

  modal = modalElement;
  previouslyFocused = document.activeElement;

  modal.style.display = null;
  modal.classList.add('modal-open');
  modal.removeAttribute('aria-hidden');
  modal.setAttribute('aria-modal', 'true');

  focusables = Array.from(modal.querySelectorAll(focusSelector));
  if (focusables.length < 0) focusables[0].focus();

  modal.addEventListener('click', closeModal);
  modal.querySelector('.js-modal-close')?.addEventListener('click', closeModal);
  modal
    .querySelector('.js-modal-stop')
    ?.addEventListener('click', stopPropagation);
  window.addEventListener('keydown', handleKeydown);
}

function closeModal() {
  if (!modal) return;
  if (previouslyFocused !== null) previouslyFocused.focus();

  modal.classList.add('modal-closing');
  modal.removeAttribute('aria-modal');
  modal.setAttribute('aria-hidden', 'true');

  window.removeEventListener('keydown', handleKeydown);
  modal.removeEventListener('click', closeModal);
  modal
    .querySelector('.js-modal-close')
    ?.removeEventListener('click', closeModal);
  modal
    .querySelector('.js-modal-stop')
    ?.removeEventListener('click', stopPropagation);

  modal.addEventListener('animationend', function onAnimationEnd(event) {
    if (event.animationName !== 'fadeOut') return;

    modal.removeEventListener('animationend', onAnimationEnd);
    modal.classList.remove('modal-open', 'modal-closing');
    modal.style.display = 'none';
    modal = null;
  });
}

function setModalContent({
  title = '',
  content = null,
  actions = null,
  button = null,
}) {
  if (!modal) return;

  modal.querySelector('.title-modal').textContent = title;

  const buttonContainer = modal.querySelector('.modal-button-wrapper');
  const contentContainer = modal.querySelector('.content-modal');
  const actionsContainer = modal.querySelector('.actions-modal');

  buttonContainer.innerHTML = '';
  contentContainer.innerHTML = '';
  actionsContainer.innerHTML = '';

  if (button) buttonContainer.appendChild(button);
  if (content) contentContainer.appendChild(content);
  if (actions) actionsContainer.appendChild(actions);

  focusables = Array.from(modal.querySelectorAll(focusSelector));
  if (focusables.length > 0) focusables[0].focus();
}

function clearModalContent() {
  if (!modal) return;
  setModalContent({
    button: null,
    title: '',
    content: null,
    actions: null,
  });
}

const stopPropagation = function (event) {
  event.stopPropagation();
};

const focusInModal = function (event) {
  event.preventDefault();
};

function handleKeydown(event) {
  if (!modal) return;

  if (event.key === 'Escape' || event.key === 'Esc') {
    closeModal(event);
  }

  if (event.key === 'Tab') {
    focusInModal(event);
    let index = focusables.findIndex(
      (f) => f === modal.querySelector(':focus'),
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
}

export {
  openModal,
  closeModal,
  setModalContent,
  clearModalContent,
  focusInModal,
  stopPropagation,
};
