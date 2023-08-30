const stringToRuDate = (stringDate: string) => {
  const date = new Date(stringDate);
  return date.toLocaleString('ru', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
};

export default stringToRuDate;
