const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const OrderItem = sequelize.define("OrderItem", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.DECIMAL(15, 2), allowNull: false }, // giá tại thời điểm bán
  subtotal: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
});

module.exports = OrderItem;
