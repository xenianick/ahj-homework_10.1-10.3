import showPopupCoordsError from './showPopupCoordsError.js';

export default function checkGeolocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      callback(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
    }, () => {
      showPopupCoordsError(callback);
    });
  } else {
    showPopupCoordsError(callback);
  }
}
