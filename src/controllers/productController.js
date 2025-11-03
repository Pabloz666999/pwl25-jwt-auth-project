const Product = require('../models/productModel');

const getAllProducts = async (req, res, next) => {
  try {
    const [products] = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err); 
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [product] = await Product.findById(id);

    if (product.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product[0]);
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const [result] = await Product.create(req.body);
    res.status(201).json({ 
      message: 'Product created successfully', 
      newProductId: result.insertId 
    });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try{
    const { id } = req.params;
    const [result] = await Product.update(id, req.body);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found'});
    }
    res.json({message: 'Product updated successfully'})
  } catch (err) {
    next(err);
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await Product.remove(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};