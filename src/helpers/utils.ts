export const strToNum = <T>(str: T): number => {
  return typeof str === "string" ? Number(str.replace(/,/g, "")) : Number(str);
};

export const getRandomArbitrary = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const formatNumber = (n: number) => {
  const digits = String(n).split("").reverse();
  let res = "";
  digits.forEach((el, i) => {
    if ((i + 1) < digits.length && (i + 1) % 3 === 0) {
      res += el + ",";
    } else {
      res += el;
    }
  });
  return res.split("").reverse().join("");
};