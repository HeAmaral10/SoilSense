const sum = require('./math');

test('soma 1 + 2 para ser 3', () => {
  expect(sum(1, 2)).toBe(3);
});