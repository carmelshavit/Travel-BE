const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const handleServerError = require('../../libs/utility/ErrorHandlers.js')
const auth = require('../../libs/authentication.js')
const userQuerys = require('../../database/userQuerys.js')

router.get('/:id/:password', auth.authenticate, async (req, res) => {
    try {
        const user = await userQuerys.GetUserByID(req.params.id)
        if (!user) return res.status(400).send("User doesn't exist")

        const password_valid = await bcrypt.compare(req.params.password, user.password);

        if (!password_valid) {
            res.statusMessage = "ID or password incorrect";
            res.status(400).end();
        } else {
            res.send(user)
        }

    } catch (err) {
        handleServerError(err, res)
    }
})

module.exports = router;