const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define("Product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  barcode: { type: DataTypes.STRING, unique: true },
  name: { type: DataTypes.STRING, allowNull: false },
  unit: { type: DataTypes.STRING }, // cái, hộp, kg...
  costPrice: { type: DataTypes.DECIMAL(15, 2) }, // giá nhập
  sellPrice: { type: DataTypes.DECIMAL(15, 2) }, // giá bán
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  minStock: { type: DataTypes.INTEGER, defaultValue: 5 }, // cảnh báo hết hàng
  image: { type: DataTypes.STRING },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
});

module.exports = Product;
