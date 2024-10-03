import { Item } from "../type";

export const filterData = (keyword: string, data: Item[]) => {
  switch (keyword) {
    case "nicknames":
      return data.filter((item) => item.nickname !== null);
    case "forward":
      return data.filter((item) => item.position === "forward");
    case "midfielder":
      return data.filter((item) => item.position === "midfielder");
    case "defender":
      return data.filter((item) => item.position === "defender");
    case "goalkeeper":
      return data.filter((item) => item.position === "goalkeeper");
    default:
      return data;
  }
};
