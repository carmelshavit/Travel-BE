const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const handleServerError = require('../../libs/utility/ErrorHandlers.js')
const auth = require('../../libs/authentication.js')
const userQuerys = require('../../database/userQuerys.js')

router.get('/:email/:password', auth.authenticate, async (req, res) => {
    try {
        const user = await userQuerys.GetUserByEmail(req.params.email)
        if (!user) return res.status(400).send("User doesn't exist")

        const password_valid = await bcrypt.compare(req.params.password, user.password);

        if (!password_valid) {
            res.statusMessage = "Email or password incorrect";
            res.status(400).end();
        } else {
            res.send(user)
        }

    } catch (err) {
        handleServerError(err, res)
    }
})

router.put('/:id', auth.authenticate, async (req, res) => {
    const user_newdata = { ...req.body }
    try {
        const user = await userQuerys.GetUserByID(req.params.id)
        if (!user) return res.status(400).send("User doesn't exist")

        const password_valid = await bcrypt.compare(req.body.password, user.password);

        if (!password_valid) {
            res.statusMessage = "ID or password incorrect";
            res.status(400).end();
        } else {
            if (user_newdata.password) {
                const hash_password = await bcrypt.hash(user_newdata.password, saltRounds);
                user_newdata.password = hash_password
            }
            await userQuerys.UpdateUser(req.params.id, user_newdata)
            const updated_user = await userQuerys.GetUserByID(req.params.id)
            res.send(updated_user)
        }

    } catch (err) {
        handleServerError(err, res)
    }
})

module.exports = router;