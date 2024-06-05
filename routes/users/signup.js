const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const validate = require('../../libs/validation');
const usersSchemas = require('../../libs/schemas/users.js')
const handleServerError = require('../../libs/utility/ErrorHandlers.js')
const auth = require('../../libs/authentication.js')
const userQuerys = require('../../database/userQuerys.js')


router.post('/', validate(usersSchemas.newUserSchema), async (req, res) => {
    try {
        const UserExist = await userQuerys.GetUserByEmail(req.body.email)
        if (UserExist) {
            res.statusMessage = "User with this email already exist";
            res.status(400).end();
        } else {
            const hash_password = await bcrypt.hash(req.body.password, saltRounds);
            const user = {
                username: req.body.username,
                email: req.body.email,
                password: hash_password,
            }
            const response = await CreateNewUser(user)
            res.send(response)
        }

    } catch (err) {
        handleServerError(err, res)
    }
})

async function CreateNewUser(data) {
    await userQuerys.CreateUser(data)
    const user = await userQuerys.GetUserByEmail(data.email)
    const token = auth.sign({ id: user._id, username: user.username });
    return { user, token }
}

module.exports = router;