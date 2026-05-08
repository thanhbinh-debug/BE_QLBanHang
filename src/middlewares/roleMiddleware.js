const { error } = require("../utils/response");

module.exports =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return error(res, "Không có quyền truy cập", 403);
    next();
  };
