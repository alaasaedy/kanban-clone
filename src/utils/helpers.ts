const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink',
];

export const pickChakraRandomColor = (variant = '') => {
  const color = colors[Math.floor(Math.random() * colors.length)];
  return color + variant;
};

export const swap = <T>(arr: T[], i: number, j: number): T[] => {
  const newArr = [...arr];
  const currenItemIndex = newArr[i];
  newArr[i] = newArr[j];
  newArr[j] = currenItemIndex;
  return newArr;
};

export const getDate = () => {
  let today: Date | string = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //
  let yyyy = today.getFullYear();
  today = `${mm}/${dd}/${yyyy}`;

  return today;
};
