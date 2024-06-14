/**
 *
 * @returns - function that takes in a date and returns a formatted date string of the form 'dd-mm-yyyy'
 */
export const useFormatDate = () => {
  const formatDate = (date: Date) => {
    return date
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      .replace(/\//g, '-');
  };

  return formatDate;
};
