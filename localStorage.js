export function getParsedItemOrDefault(name, defaultValue) {
  return typeof window !== 'undefined'
    ? JSON.parse(
        // This is the same as:
        // window.localStorage.lastUsersVisited
        window.localStorage.getItem(name),
      ) || defaultValue
    : defaultValue;
}

export function setStringifiedItem(name, value) {
  if (typeof window === 'undefined') {
    throw new Error('Cannot set localStorage (window is undefined)');
  }

  return window.localStorage.setItem(name, JSON.stringify(value));
}
