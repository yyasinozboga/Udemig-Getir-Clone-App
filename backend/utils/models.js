import fs from "fs";

export const readFile = (path) => {
  try {
    const text = fs.readFileSync(`./data/${path}`, "utf-8");
    const data = JSON.parse(text);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const writeFile = (data) => {
  fs.writeFileSync("./data/bag.json", JSON.stringify(data));
};
