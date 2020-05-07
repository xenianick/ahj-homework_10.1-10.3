import checkCoords from '../../checkCoords.js';

test.each([
  ['coords without changes', '51.50851, −0.12572', '51.50851, −0.12572'],
  ['coords with space', '51.50851,−0.12572', '51.50851, −0.12572'],
  ['coords without square brackets', '[51.50851, −0.12572]', '51.50851, −0.12572'],
  ['null if wrong input value', '51.50678851,−012572', null],
])(('should return %s'), (_, input, expected) => {
  const received = checkCoords(input);
  expect(received).toBe(expected);
});
