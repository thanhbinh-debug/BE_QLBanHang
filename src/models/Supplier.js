const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Supplier = sequelize.define("Supplier", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  address: { type: DataTypes.TEXT },
  taxCode: { type: DataTypes.STRING }, // mã số thuế
  contactPerson: { type: DataTypes.STRING }, // người liên hệ
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
});

module.exports = Supplier;
