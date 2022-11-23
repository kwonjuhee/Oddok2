export const getRandomDate = (startDate, endDate) => {
  const endTime = endDate.getTime();
  const startTime = startDate.getTime();

  return new Date(startTime + Math.random() * (endTime - startTime));
};
