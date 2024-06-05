const jwt = require("jsonwebtoken");
const handleServerError = require("../libs/utility/ErrorHandlers");
const password = process.env.secret_key;

function sign(data) {
  return jwt.sign(data, password);
}

function authenticate(req, res, next) {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    jwt.verify(token, password, (err, decoded) => {
      if (err) {
        res.status(401).send({ message: "Must authenticate" });
        return;
      }
      req.decoded = decoded;
      next();
    });
  } catch (err) {
    handleServerError(err, res);
  }
}

exports.sign = sign;
exports.authenticate = authenticate;
