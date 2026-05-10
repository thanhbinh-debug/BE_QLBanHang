// Cài thêm: npm install dayjs
const dayjs = require("dayjs");

const today = () => dayjs().format("YYYY-MM-DD");
const startOfDay = (date) => dayjs(date).startOf("day").toDate();
const endOfDay = (date) => dayjs(date).endOf("day").toDate();
const startOfMonth = (date) => dayjs(date).startOf("month").toDate();
const endOfMonth = (date) => dayjs(date).endOf("month").toDate();
const format = (date, fmt = "DD/MM/YYYY HH:mm") => dayjs(date).format(fmt);
const generateImportCode = () => {
  return `PNK-${dayjs().format("YYYYMMDD")}-${Math.floor(1000 + Math.random() * 9000)}`;
};

module.exports = {
  today,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  format,
  generateImportCode,
};
