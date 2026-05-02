/**
 *
 * date.js
 * this helper formulate date
 */

const today = new Date();

const dateOptions = {
  timeZone: 'UTC',
  weekday: 'long',
  year: 'numeric',
  month: 'short',
  day: 'numeric'
};

const timeOptions = {
  hour: 'numeric',
  minute: 'numeric'
};

export const formatDate = date => {
  const newDate = new Date(date);

  return newDate.toLocaleDateString('en-US', dateOptions);
};

export const formatTime = date => {
  const newDate = new Date(date);
  return newDate.toLocaleTimeString(undefined, timeOptions);
};
