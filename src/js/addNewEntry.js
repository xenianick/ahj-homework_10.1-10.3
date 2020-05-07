/* eslint-disable no-param-reassign */
import createEntry from './createEntry.js';
import readDate from './readDate.js';

const entriesArray = [];

export default function addNewEntry(value, coords, entriesContainer) {
  const date = readDate(+new Date());
  const entry = createEntry(date, value, `${coords}`);
  entriesArray.push(entry);
  entriesContainer.appendChild(entry);
}

export { entriesArray };
