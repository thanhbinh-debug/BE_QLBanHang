// Dùng morgan để log request ra terminal
// GET /api/v1/products 200 12ms
const morgan = require("morgan");

const devFormat = ":method :url :status :response-time ms";
const prodFormat = ":remote-addr - :method :url :status - :response-time ms";

module.exports = morgan(
  process.env.NODE_ENV === "production" ? prodFormat : devFormat,
);
