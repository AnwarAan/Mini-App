import express from 'express';
import products_controller from '../controllers/products/products_controller.js';
import basicAuth from '../helpers/basic_auth.js'

const router = express.Router();

router.get('/', basicAuth, products_controller.getProduct)
router.get('/:productId', basicAuth, products_controller.getProductById)
router.get('/name/:productName', basicAuth, products_controller.getProductByName)
router.post('/', basicAuth, products_controller.postProduct)
router.put('/:productId', basicAuth, products_controller.updateProduct)
router.delete('/:productId', basicAuth, products_controller.deleteProduct)
router.delete('/', basicAuth, products_controller.deleteProducts)

export default router;