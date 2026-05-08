const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Shift = sequelize.define("Shift", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  openTime: { type: DataTypes.DATE, allowNull: false }, // thời điểm mở ca
  closeTime: { type: DataTypes.DATE }, // thời điểm đóng ca
  openingCash: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0 }, // tiền đầu ca
  closingCash: { type: DataTypes.DECIMAL(15, 2) }, // tiền cuối ca (thực tế)
  expectedCash: { type: DataTypes.DECIMAL(15, 2) }, // tiền cuối ca (lý thuyết)
  totalOrders: { type: DataTypes.INTEGER, defaultValue: 0 }, // số đơn trong ca
  totalRevenue: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0 }, // doanh thu trong ca
  note: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM("open", "closed"), defaultValue: "open" },
  // FK: userId (khai báo quan hệ trong index.js)
});

module.exports = Shift;
