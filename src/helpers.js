export const getNbChecked = (boxes) => {
  return boxes
    .filter(box => box.checked)
    .length;
}

export const getTotal = (boxes) => {
  const nbChecked = getNbChecked(boxes);
  return nbChecked * (nbChecked + 1) / 2;
};