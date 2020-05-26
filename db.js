const products = [
  { id: '1', name: 'T-Shirt' },
  { id: '2', name: 'Coffee Cup' },
  { id: '3', name: 'Screen Cleaner' },
  { id: '4', name: 'Umbrella' },
];

const users = [
  { id: '1', name: 'Hamed', role: 'admin' },
  { id: '2', name: 'Kriz', role: 'user' },
  { id: '3', name: 'Alena', role: 'admin' },
  { id: '4', name: 'Gaby', role: 'user' },
];

export function getProducts() {
  return products;
}

export function getUsers() {
  return users;
}

export function getUserById(id) {
  return users.find((user) => user.id === id);
}
