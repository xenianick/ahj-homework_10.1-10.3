/* eslint-disable max-len */
import createNewElement from './createNewElement.js';
import addNewEntry from './addNewEntry.js';
import setTimer from './setTimer.js';
import showPopupMediaError from './showPopupMediaError.js';
import checkGeolocation from './checkGeolocation.js';

const recordContainer = createNewElement('div', 'record-container');
const doneBtn = createNewElement('div', 'done-btn manage-btn', '&#10004;');
const timerEl = createNewElement('div', 'timer', '00:00');
const resetBtn = createNewElement('div', 'reset-btn manage-btn', '&#10008;');

recordContainer.appendChild(doneBtn);
recordContainer.appendChild(timerEl);
recordContainer.appendChild(resetBtn);

let saveRecData;
let removeRecData;

async function doneRec() {
  await this.recorder.stop();
  this.stream.getTracks().forEach((track) => track.stop());
  checkGeolocation((coords) => {
    this.media.controls = true;
    addNewEntry(this.media, coords, this.entriesContainer);
    doneBtn.removeEventListener('click', saveRecData);
  });
}
async function removeRec() {
  await this.recorder.stop();
  this.stream.getTracks().forEach((track) => track.stop());
  if (this.mediaType === 'video') {
    this.media.srcObject = null;
    this.media.classList.remove('preview');
    this.media.remove();
  }
  resetBtn.removeEventListener('click', removeRecData);
}

export default async function recordMedia(mediaType, entriesContainer, entryInputContainer, btnsContainer) {
  const media = createNewElement(`${mediaType}`, `${mediaType}-record`, `Your browser are not supported ${mediaType}`);
  if (!navigator.mediaDevices) {
    showPopupMediaError('Ваш браузер не поддерживает запись аудио и видео');
    return;
  }
  try {
    let permissionAudio = false;
    let permissionVideo = false;
    if (mediaType === 'audio') {
      permissionAudio = true;
    }
    if (mediaType === 'video') {
      permissionVideo = true;
      permissionAudio = true;
    }
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: permissionAudio,
      video: permissionVideo,
    });
    btnsContainer.classList.add('hide');
    entryInputContainer.appendChild(recordContainer);
    const recorder = new MediaRecorder(stream);
    const chunks = [];
    let timerId;
    recorder.addEventListener('start', () => {
      timerId = setTimer(timerEl);
      if (mediaType === 'video') {
        media.muted = true;
        media.classList.add('preview');
        media.srcObject = stream;
        media.play();
        entryInputContainer.appendChild(media);
      }
    });
    recorder.addEventListener('dataavailable', (evt) => {
      if (mediaType === 'video') {
        media.srcObject = null;
        media.muted = false;
        media.classList.remove('preview');
        media.remove();
      }
      chunks.push(evt.data);
    });
    recorder.addEventListener('stop', () => {
      const blob = new Blob(chunks);
      media.src = URL.createObjectURL(blob);
      clearInterval(timerId);
      timerEl.innerHTML = '00:00';
      recordContainer.remove();
      btnsContainer.classList.remove('hide');
    });
    recorder.start();
    saveRecData = {
      handleEvent: doneRec, recorder, stream, media, entriesContainer,
    };
    removeRecData = {
      handleEvent: removeRec, recorder, stream, media, mediaType,
    };
    doneBtn.addEventListener('click', saveRecData);
    resetBtn.addEventListener('click', removeRecData);
  } catch (err) {
    let device;
    if (mediaType === 'audio') {
      device = 'микрофону';
    }
    if (mediaType === 'video') {
      device = 'камере';
    }
    showPopupMediaError(`Доступ к ${device} запрещен. Пожалуйста, измените настройки или дайте разрешение.`);
  }
}
