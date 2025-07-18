import express, { Request, Response } from 'express';
import * as controller from '../modules/products/product.controller';
import { authenticateToken } from '../middlewares/jwt.middleware';
// import validate from '../middlewares/zod-validation.middleware';

const router = express.Router();

router.get(
  '/products',
  controller.getAllProduct
);

router.get(
  '/products/:id',
  controller.getProductById
);

router.post(
  '/products',
  controller.createProduct
);

router.put(
  '/products/:id',
  controller.updateProduct
);

router.delete(
  '/products/:id',
  controller.deleteProduct
);
export default router;