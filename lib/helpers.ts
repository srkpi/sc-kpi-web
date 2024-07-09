export const formatProjectIndex = (index: number) => {
  return index < 10 ? `0${index + 1}` : index + 1;
};
