const crypto = require("crypto");

module.exports.createSecretToken = () => {
  return crypto
    .randomBytes(20)
    .toString("hex");
};