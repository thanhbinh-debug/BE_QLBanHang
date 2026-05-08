const { Product } = require("../models");

const decreaseStock = async (productId, quantity) => {
  const product = await Product.findByPk(productId);
  await product.update({ stock: product.stock - quantity });
};

const increaseStock = async (productId, quantity) => {
  const product = await Product.findByPk(productId);
  await product.update({ stock: product.stock + quantity });
};

module.exports = { decreaseStock, increaseStock };
