const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Customer = sequelize.define("Customer", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, unique: true },
  email: { type: DataTypes.STRING },
  point: { type: DataTypes.INTEGER, defaultValue: 0 }, // điểm tích lũy
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
});

module.exports = Customer;
