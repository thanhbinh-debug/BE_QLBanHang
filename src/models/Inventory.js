const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Inventory = sequelize.define("Inventory", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  type: {
    type: DataTypes.ENUM("import", "export", "adjust"),
    allowNull: false,
  },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  note: { type: DataTypes.TEXT },
});

module.exports = Inventory;
