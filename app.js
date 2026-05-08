require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { sequelize } = require("./src/models");
const routes = require("./src/routes");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/v1", routes);

// Error handler
app.use(errorHandler);

// Khởi động
const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Database connected");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
