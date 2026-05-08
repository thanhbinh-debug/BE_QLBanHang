const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Promotion = sequelize.define("Promotion", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.ENUM("percent", "fixed"), allowNull: false }, // % hoặc số tiền cố định
  value: { type: DataTypes.DECIMAL(15, 2), allowNull: false }, // VD: 10 (10%) hoặc 50000 (50k)
  minOrderAmount: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0 }, // đơn tối thiểu được áp dụng
  maxDiscount: { type: DataTypes.DECIMAL(15, 2) }, // giảm tối đa (áp cho loại %)
  startDate: { type: DataTypes.DATEONLY, allowNull: false },
  endDate: { type: DataTypes.DATEONLY, allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  description: { type: DataTypes.TEXT },
});

module.exports = Promotion;
