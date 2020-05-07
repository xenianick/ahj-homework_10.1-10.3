/* eslint-disable no-param-reassign */
import createNewElement from './createNewElement.js';

export default function showPopupMedia(text) {
  const bodyEl = document.querySelector('body');
  const errorMediaPopup = createNewElement('div', 'popup');
  const popupText = createNewElement('div', 'popup-text', `<p>Что-то пошло не так.</p><p>${text}</p>`);
  const popupBtn = createNewElement('button', 'form-btn', 'Понятно');
  errorMediaPopup.appendChild(popupText);
  errorMediaPopup.appendChild(popupBtn);

  popupBtn.addEventListener('click', () => {
    errorMediaPopup.remove();
  });

  bodyEl.appendChild(errorMediaPopup);
}
