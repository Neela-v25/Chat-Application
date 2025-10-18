const addZero = (t) => (t < 10 ? "0" + t : t);

export const FormatTime = (givenTime) => {
  const date = new Date(givenTime);
  const time = `${addZero(date.getHours())} : ${addZero(date.getMinutes())}`;
  const day = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
  return { time, day };
};
