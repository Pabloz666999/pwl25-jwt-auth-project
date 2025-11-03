const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const { validateProduct } = require('../middleware/validationMiddleware');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

router.get('/', controller.getAllProducts);
router.get('/:id', controller.getProductById);
router.post('/', authenticateToken, validateProduct, controller.createProduct);
router.put('/:id', authenticateToken, validateProduct, controller.updateProduct);
router.delete('/:id', authenticateToken, authorizeRole('admin'), controller.deleteProduct);

module.exports = router;