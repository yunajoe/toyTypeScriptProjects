const convertSeconds = (time: number) => {
  if (time % 10 === 0) {
    const sTime = time / 10;
    const stringStime = sTime.toString().padStart(2, "0");
    return stringStime;
  }
};
