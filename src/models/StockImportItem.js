const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const StockImportItem = sequelize.define("StockImportItem", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  costPrice: { type: DataTypes.DECIMAL(15, 2), allowNull: false }, // giá nhập tại thời điểm
  subtotal: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
  expiredDate: { type: DataTypes.DATEONLY }, // hạn sử dụng
  // FK: stockImportId, productId (khai báo quan hệ trong index.js)
});

module.exports = StockImportItem;
