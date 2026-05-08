const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define("Order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  orderCode: { type: DataTypes.STRING, unique: true },
  totalAmount: { type: DataTypes.DECIMAL(15, 2) },
  discount: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0 },
  finalAmount: { type: DataTypes.DECIMAL(15, 2) },
  paymentMethod: {
    type: DataTypes.ENUM("cash", "card", "transfer"),
    defaultValue: "cash",
  },
  status: {
    type: DataTypes.ENUM("pending", "completed", "cancelled"),
    defaultValue: "completed",
  },
  note: { type: DataTypes.TEXT },
});

module.exports = Order;
