const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const handleServerError = require("../../libs/utility/ErrorHandlers.js");
const auth = require("../../libs/authentication.js");
const userQuerys = require("../../database/userQuerys.js");

router.get("/:email/:password", async (req, res) => {
  try {
    const user = await userQuerys.GetUserByEmail(req.params.email);
    if (!user) return res.status(400).send("Email or password incorrect");

    const password_valid = await bcrypt.compare(
      req.params.password,
      user.password
    );

    if (!password_valid) {
      res.statusMessage = "Email or password incorrect";
      res.status(400).end();
    } else {
      const token = auth.sign({ id: user._id, username: user.username });
      res.send({ user, token });
    }
  } catch (err) {
    handleServerError(err, res);
  }
});

module.exports = router;
