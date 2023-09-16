export const capitalizeFirstLetter = (string) => {
  return string.charAt(1).toUpperCase() + string.slice(2);
};

export const generateUniqueID = () => {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  return dateString + randomness;
};
