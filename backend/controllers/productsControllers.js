import { readFile, writeFile } from "../utils/models.js";

export const getAllProducts = (req, res) => {
  const data = readFile("products.json");

  let products = [...data];

  if (req.query.category) {
    if (req.query.category.length > 0) {
      products = products.filter((item) =>
        req.query.category.includes(item.category)
      );
    } else {
      products = products.filter(
        (item) => item.category === req.query.category
      );
    }

    if (req.query.subCategory) {
      products = products.filter(
        (item) => item.subCategory === req.query.subCategory
      );
    }

    return res.status(200).json({
      products,
    });
  }

  res.status(200).json({
    products,
  });
};

export const getProductById = (req, res) => {
  res.status(200).json({
    product: req.foundProduct,
  });
};

export const getProductsFromBag = (req, res) => {
  const products = readFile("bag.json");
  res.status(200).json({
    products,
  });
};

export const addProductToBag = (req, res) => {
  const products = readFile("bag.json");
  const found = products.find((item) => item.id === req.body.id);
  if (!found) {
    products.push(req.body);
    writeFile(products);
    res.status(200).json({ product: req.body });
  }
};

export const deleteProductById = (req, res) => {
  const products = readFile("bag.json");
  console.log(req.params.id);
  const foundIndex = products.findIndex((item) => item.id === req.params.id);
  products.splice(foundIndex, 1);
  writeFile(products);
  res.status(201).json({
    products,
  });
};

export const updateProductById = (req, res) => {
  const products = readFile("bag.json");
  const foundIndex = products.findIndex((item) => item.id === req.params.id);
  products.splice(foundIndex, 1, req.body);
  writeFile(products);
  res.status(200).json({
    product: req.body,
  });
};

export const deleteAllProductsFromBag = (req, res) => {
  writeFile([]);
  res.status(201).json({
    products: [],
  });
};
