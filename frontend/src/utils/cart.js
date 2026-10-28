export const calculateCartCount = (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0);

export const calculateCartTotal = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);
