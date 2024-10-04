export let defaultTime = 3000;

export const delayShowTime = (value: number, time: number) => {
  setTimeout(() => {
    console.log("value", value);
  }, time);
};
