const generateOrderCode = () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `HD${date}${rand}`; // VD: HD202501151234
};

module.exports = { generateOrderCode };
