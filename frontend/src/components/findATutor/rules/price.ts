export default (price: [number, number]) => {
  return price[0] >= 0 && price[1] > 0;
};
