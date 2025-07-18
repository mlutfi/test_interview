// RANDOM UNIQUE CODE
const generateUniqueCode = (): string => {
  const maxDate = Date.now();
  const timestamp = Math.floor(Math.random() * maxDate).toString();
  return timestamp;
};

export { generateUniqueCode };
