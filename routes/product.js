const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Product, validate } = require('../models/product');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find().sort('name');
  res.send(products);
});

// Create a new product (Admin only)
router.post('/', [auth, admin], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let product = new Product({ 
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    stock: req.body.stock,
  });
  product = await product.save();
  
  res.send(product);
});

// Update an existing product (Admin only)
router.put('/:id', [auth, admin, validateObjectId], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const product = await Product.findByIdAndUpdate(
    req.params.id, 
    {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      stock: req.body.stock,
    }, 
    { new: true }
  );

  if (!product) return res.status(404).send('The product with the given ID was not found.');
  
  res.send(product);
});

// Delete a product (Admin only)
router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product) return res.status(404).send('The product with the given ID was not found.');

  res.send(product);
});

// Get a single product by ID
router.get('/:id', validateObjectId, async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) return res.status(404).send('The product with the given ID was not found.');

  res.send(product);
});

module.exports = router;
