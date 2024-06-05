const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.db_user}:${process.env.db_password}@${process.env.db_host}`, {
            dbName: `${process.env.db_name}`
        });
        console.log(`connected`);

    } catch (err) {
        console.log(err)
    }
}
module.exports = {
    connect,
}

