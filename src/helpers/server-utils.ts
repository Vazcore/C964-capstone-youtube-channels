import fs from "fs";
import path from "path";
import CsvReaderStream from "csv-reader";
import { TDataset } from "./dataset";

export const readCSVDataset = async (fname: string): Promise<Array<TDataset>> => {
  const filePath = path.join(__dirname, "..", "..", "..", "..", "..", "datasets", fname);
  const inputStream = fs.createReadStream(filePath, "utf-8");
  
  return new Promise((resolve, reject) => {
    const data: Array<TDataset> = [];
    inputStream.pipe(
      new CsvReaderStream({ parseNumbers: true, parseBooleans: true, trim: true })
    ).on("data", function(row) {
      data.push(row as TDataset);
    }).on("end", function () {
      resolve(data.slice(1));
    });
  });
};

export const writeToFile = (filename: string, data: string) => {
  const filePath = path.join(__dirname, "..", "..", "..", "..", "..", "datasets", filename);
  fs.writeFileSync(filePath, data, "utf-8");
};

export const createCSVFromArray = (csvFileName: string, data: Array<object>) => {
  const csvData = data.map(row => Object.values(row).join(",")).join("\n");
  writeToFile(csvFileName, csvData);
};
