module.exports = function validateIP(value) {
  // Regex pattern to match IP addresses
  const pattern = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
  return pattern.test(value);
};
