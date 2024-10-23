export const removeItemsLocalStorage = (id: string) => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const updatedCart = cart.filter((item: { id: string }) => item.id !== id);
  console.log(updatedCart);
//   localStorage.setItem("cart");
};
