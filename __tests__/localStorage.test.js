import { getParsedItemOrDefault, setStringifiedItem } from '../localStorage';

const users = [{ id: 1 }];

test('getParsedItemOrDefault should return the parsed localStorage value set by setStringifiedItem', () => {
  const key = 'users';
  setStringifiedItem(key, users);
  const result = getParsedItemOrDefault(key);
  expect(result).toStrictEqual(users);
});

test('getParsedItemOrDefault should return default for a non-existent value', () => {
  const defaultValue = [];
  const result = getParsedItemOrDefault('non-existent', defaultValue);
  expect(result).toStrictEqual(defaultValue);
});
