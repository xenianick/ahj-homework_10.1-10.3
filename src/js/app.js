import createNewElement from './createNewElement.js';
import addNewEntry from './addNewEntry.js';
import checkGeolocation from './checkGeolocation.js';
import recordMedia from './recordMedia.js';

const bodyEl = document.querySelector('body');
const mainContainer = createNewElement('div', 'main-container');
const allEntriesContainer = createNewElement('div', 'all-entries-container');
mainContainer.appendChild(allEntriesContainer);
bodyEl.appendChild(mainContainer);

const entryInputContainer = createNewElement('div', 'entry-input-container');
const entryInput = createNewElement('textarea', 'entry-input');
const btnsContainer = createNewElement('div', 'btns-container');
const addVoiceBtn = createNewElement('div', 'add-voice-btn manage-btn', '&#127897;');
const addVideoBtn = createNewElement('div', 'add-video-btn manage-btn', '&#128249;');

entryInputContainer.appendChild(entryInput);
btnsContainer.appendChild(addVoiceBtn);
btnsContainer.appendChild(addVideoBtn);
entryInputContainer.appendChild(btnsContainer);
mainContainer.appendChild(entryInputContainer);

const error = createNewElement('div', 'error-msg-text', 'Нужно что-то написать');

entryInput.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    entryInput.addEventListener('focus', () => {
      error.remove();
    });
    if (entryInput.value === '') {
      entryInput.after(error);
      entryInput.blur();
      return;
    }
    const text = createNewElement('p', 'entry-text', entryInput.value);
    checkGeolocation((coords) => {
      addNewEntry(text, coords, allEntriesContainer);
      entryInput.value = '';
      entryInput.blur();
    });
  }
});

addVoiceBtn.addEventListener('click', () => {
  recordMedia('audio', allEntriesContainer, entryInputContainer, btnsContainer);
});

addVideoBtn.addEventListener('click', () => {
  recordMedia('video', allEntriesContainer, entryInputContainer, btnsContainer);
});
