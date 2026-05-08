const sequelize = require("../config/database");

// ── Import tất cả Models ──────────────────────────────────────────
const User = require("./User");
const Category = require("./Category");
const Product = require("./Product");
const Customer = require("./Customer");
const Supplier = require("./Supplier");
const Order = require("./Order");
const OrderItem = require("./OrderItem");
const Inventory = require("./Inventory");
const StockImport = require("./StockImport");
const StockImportItem = require("./StockImportItem");
const Promotion = require("./Promotion");
const Shift = require("./Shift");

// ── Quan hệ: Category ↔ Product ──────────────────────────────────
Category.hasMany(Product, { foreignKey: "categoryId", as: "products" });
Product.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

// ── Quan hệ: Supplier ↔ Product ──────────────────────────────────
Supplier.hasMany(Product, { foreignKey: "supplierId", as: "products" });
Product.belongsTo(Supplier, { foreignKey: "supplierId", as: "supplier" });

// ── Quan hệ: User ↔ Order ─────────────────────────────────────────
User.hasMany(Order, { foreignKey: "userId", as: "orders" });
Order.belongsTo(User, { foreignKey: "userId", as: "cashier" });

// ── Quan hệ: Customer ↔ Order ─────────────────────────────────────
Customer.hasMany(Order, { foreignKey: "customerId", as: "orders" });
Order.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });

// ── Quan hệ: Order ↔ OrderItem ↔ Product ─────────────────────────
Order.hasMany(OrderItem, { foreignKey: "orderId", as: "items" });
OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });

OrderItem.belongsTo(Product, { foreignKey: "productId", as: "product" });
Product.hasMany(OrderItem, { foreignKey: "productId", as: "orderItems" });

// ── Quan hệ: Promotion ↔ Order ────────────────────────────────────
Promotion.hasMany(Order, { foreignKey: "promotionId", as: "orders" });
Order.belongsTo(Promotion, { foreignKey: "promotionId", as: "promotion" });

// ── Quan hệ: User ↔ StockImport ──────────────────────────────────
User.hasMany(StockImport, { foreignKey: "userId", as: "stockImports" });
StockImport.belongsTo(User, { foreignKey: "userId", as: "createdBy" });

// ── Quan hệ: Supplier ↔ StockImport ──────────────────────────────
Supplier.hasMany(StockImport, { foreignKey: "supplierId", as: "stockImports" });
StockImport.belongsTo(Supplier, { foreignKey: "supplierId", as: "supplier" });

// ── Quan hệ: StockImport ↔ StockImportItem ↔ Product ────────────
StockImport.hasMany(StockImportItem, {
  foreignKey: "stockImportId",
  as: "items",
});
StockImportItem.belongsTo(StockImport, {
  foreignKey: "stockImportId",
  as: "stockImport",
});

StockImportItem.belongsTo(Product, { foreignKey: "productId", as: "product" });
Product.hasMany(StockImportItem, {
  foreignKey: "productId",
  as: "importItems",
});

// ── Quan hệ: Product ↔ Inventory ─────────────────────────────────
Product.hasMany(Inventory, { foreignKey: "productId", as: "inventoryLogs" });
Inventory.belongsTo(Product, { foreignKey: "productId", as: "product" });

// ── Quan hệ: User ↔ Inventory ────────────────────────────────────
User.hasMany(Inventory, { foreignKey: "userId", as: "inventoryLogs" });
Inventory.belongsTo(User, { foreignKey: "userId", as: "createdBy" });

// ── Quan hệ: User ↔ Shift ─────────────────────────────────────────
User.hasMany(Shift, { foreignKey: "userId", as: "shifts" });
Shift.belongsTo(User, { foreignKey: "userId", as: "cashier" });

// ── Export ────────────────────────────────────────────────────────
module.exports = {
  sequelize,
  User,
  Category,
  Product,
  Customer,
  Supplier,
  Order,
  OrderItem,
  Inventory,
  StockImport,
  StockImportItem,
  Promotion,
  Shift,
};
