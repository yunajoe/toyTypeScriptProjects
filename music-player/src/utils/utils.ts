import { Song } from "../type/types";
/**
 *
 * copy가 아닌 원본으로 param을 주면은, array그 자체는 같고, 그 안에 원소들만 달라지기때문에.. 같다
 * copy를 하면은
 */

// 왜 원본 arr로 하면은 안될까?

export const randomArrayElements = (arr: Song[]) => {
  const arrCopy = [...arr];

  for (let i = arrCopy.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
  }
  return arrCopy;
};
