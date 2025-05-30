import express from "express";

import {
  getAllProducts,
  getProductById,
  getProductsFromBag,
  deleteProductById,
  addProductToBag,
  updateProductById,
  deleteAllProductsFromBag,
} from "../controllers/productsControllers.js";
import controlId from "../middleware/controlId.js";

const router = express.Router();

router.get("/products", getAllProducts);

router
  .route("/bag")
  .get(getProductsFromBag)
  .post(addProductToBag)
  .delete(deleteAllProductsFromBag);

router
  .route("/bag/:id")
  .delete(controlId, deleteProductById)
  .patch(controlId, updateProductById);

router.route("/products/:id").get(controlId, getProductById);

export default router;
