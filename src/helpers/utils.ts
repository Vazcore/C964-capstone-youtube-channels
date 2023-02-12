export const strToNum = <T>(str: T): number => {
  return typeof str === "string" ? Number(str.replace(/,/g, "")) : Number(str);
};

export const getRandomArbitrary = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
