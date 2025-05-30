import { readFile } from "../utils/models.js";

const data = readFile("products.json");

const controlId = (req, res, next) => {
  const found = data.find((item) => item.id === req.params.id);

  if (!found) {
    return res.status(404).json({ message: "Product is not found" });
  }

  req.foundProduct = found;

  next();
};

export default controlId;
