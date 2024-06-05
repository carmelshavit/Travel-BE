const Ajv = require("ajv").default;
const ajv = new Ajv();

function validate(schema) {
  const validate = ajv.compile(schema.valueOf());
  return function (req, res, next) {
    const valid = validate(req.body);
    if (!valid) {
      res.status(400).send(validate.errors);
    } else {
      next();
    }
  };
}
module.exports = validate;
