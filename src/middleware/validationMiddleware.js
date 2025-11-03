const validateProduct = (req, res, next) => {
  const { name, price, stock } = req.body;

  if (!name || !price || !stock) {
    return res.status(400).json({ 
      message: 'Error: Name, price, and stock are required fields.' 
    });
  }

  if (typeof price !== 'number' || typeof stock !== 'number') {
     return res.status(400).json({ 
       message: 'Error: Price and stock must be numbers.' 
     });
  }

  if (price < 0 || stock < 0) {
    return res.status(400).json({ 
      message: 'Error: Price and stock cannot be negative.' 
    });
  }

  next();
};

module.exports = { validateProduct };