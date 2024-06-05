const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const NewUser = new Schema({
    username: String,
    email: String,
    password: String,
    age: Number,
});

const User = mongoose.model('User', NewUser)

async function GetAllUsers() {
    try {
        const users = await User.find({})
        return users
    } catch (err) {
        console.error(err)
    }
}

async function GetUserByName(name) {
    try {
        const user = await User.find({ username: name })
        return user
    } catch (err) {
        console.error(err)
    }
}

async function GetUserByEmail(email) {
    try {
        const [user] = await User.find({ email: email })
        return user
    } catch (err) {
        console.error(err)
    }
}

async function GetUserByID(id) {
    try {
        const [user] = await User.find({ _id: id })
        return user
    } catch (err) {
        console.error(err)
    }
}


async function CreateUser(user) {
    try {
        await User.create({
            username: user.username,
            email: user.email,
            password: user.password
        });
        return
    } catch (err) {
        console.error(err)
    }
}

async function UpdateUser(id, data) {
    try {
        const user = await User.updateOne(
            { _id: id },
            {
                email: data.email,
                username: data.username,
                password: data.password,
                age: data.age
            });
        return user
    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    GetAllUsers,
    GetUserByName,
    GetUserByEmail,
    GetUserByID,
    CreateUser,
    UpdateUser,
}