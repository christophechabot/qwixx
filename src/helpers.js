export const getNbTicked = (boxes) => {
  return boxes
    .filter(box => box.ticked)
    .length;
}

export const getTotal = (boxes) => {
  const nbTicked = getNbTicked(boxes);
  return nbTicked * (nbTicked + 1) / 2;
};