const mongoose = require('mongoose');
const Joi = require('joi');

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1024
  },
  category: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  imageUrl: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

// Validation function for product input
function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().min(10).max(1024).required(),
    category: Joi.string().min(3).max(255).required(),
    stock: Joi.number().min(0).required(),
    imageUrl: Joi.string().uri().optional()
  });

  return schema.validate(product);
}

module.exports = {
  Product,
  validate: validateProduct
};
