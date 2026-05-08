const authService = require("../services/authService");
const { success, error } = require("../utils/response");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    success(res, result, "Đăng nhập thành công");
  } catch (err) {
    error(res, err.message, 401);
  }
};

const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    success(res, result, "Đăng ký thành công", 201);
  } catch (err) {
    error(res, err.message, 400);
  }
};

module.exports = { login, register };
