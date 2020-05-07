import createNewElement from './createNewElement.js';

export default function createEntry(date, content, coords) {
  const entryContainer = createNewElement('div', 'entry-container');
  const entryDate = createNewElement('div', 'entry-date', date);
  const entryContent = createNewElement('div', 'entry-content');
  entryContent.append(content);
  const entryLocation = createNewElement('div', 'entry-location', `[${coords}] &#128065;`);
  entryContainer.appendChild(entryDate);
  entryContainer.appendChild(entryContent);
  entryContainer.appendChild(entryLocation);

  return entryContainer;
}
