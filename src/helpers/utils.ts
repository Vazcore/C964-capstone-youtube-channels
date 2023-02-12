export const strToNum = <T>(str: T): number => {
  return typeof str === "string" ? Number(str.replace(/,/g, "")) : Number(str);
};
