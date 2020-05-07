/* eslint-disable no-param-reassign */
import createNewElement from './createNewElement.js';
import checkCoords from './checkCoords.js';

export default function showPopupCoordsError(callback) {
  const bodyEl = document.querySelector('body');
  const errorLocationPopup = createNewElement('div', 'popup');
  const popupText = createNewElement('div', 'popup-text', '<p>Что-то пошло не так.</p><p>Нам не удалось определить ваше местоположение. Пожалуйста, дайте разрешение на использование геолокации или введите координаты вручную.</p><p>Широта и долгота через запятую:</p>');
  const popupForm = createNewElement('form', 'popup-form');
  const popupInput = createNewElement('input', 'popup-input');
  const popupSaveBtn = createNewElement('button', 'save-btn form-btn', 'Сохранить');
  const popupRejectBtn = createNewElement('button', 'reject-btn form-btn', 'Отмена');
  popupRejectBtn.type = 'reset';
  popupForm.appendChild(popupInput);
  popupForm.appendChild(popupSaveBtn);
  popupForm.appendChild(popupRejectBtn);
  errorLocationPopup.appendChild(popupText);
  errorLocationPopup.appendChild(popupForm);

  const error = createNewElement('div', 'error-msg-coords', 'Координаты должны соответствовать формату 51.50851 или −0.12572');

  popupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (popupInput.value === '') {
      popupInput.after(error);
    } else {
      const coords = checkCoords(popupInput.value);
      if (!coords) {
        popupInput.after(error);
      } else {
        callback(coords);
        errorLocationPopup.remove();
      }
    }
  });
  popupInput.addEventListener('focus', () => {
    error.remove();
  });
  popupRejectBtn.addEventListener('click', () => {
    errorLocationPopup.remove();
  });

  bodyEl.appendChild(errorLocationPopup);
}
