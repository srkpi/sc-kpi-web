export const formatProjectIndex = (index: number) => {
  return index < 10 ? `0${index + 1}` : index + 1;
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('uk-UA', { timeZone: 'UTC' });
};

export const formatFileSize = (bytes: number) => {
  const units = ['Б', 'КБ', 'МБ'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toLocaleString('uk-UA', { maximumFractionDigits: unitIndex > 1 ? 1 : 0 })} ${units[unitIndex]}`;
};

export const pluralize = (count: number, [one, few, many]: string[]) => {
  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return `${count} ${many}`;
  if (lastDigit === 1) return `${count} ${one}`;
  if (lastDigit >= 2 && lastDigit <= 4) return `${count} ${few}`;
  return `${count} ${many}`;
};

export const shuffle = <T>(array: T[]): T[] => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};
