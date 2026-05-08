const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const StockImport = sequelize.define("StockImport", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  importCode: { type: DataTypes.STRING, unique: true, allowNull: false }, // mã phiếu nhập
  totalAmount: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
  status: {
    type: DataTypes.ENUM("pending", "completed", "cancelled"),
    defaultValue: "completed",
  },
  note: { type: DataTypes.TEXT },
  importDate: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
  // FK: supplierId, userId (khai báo quan hệ trong index.js)
});

module.exports = StockImport;
