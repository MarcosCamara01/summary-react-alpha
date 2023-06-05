const mongoose = require("mongoose");
require('dotenv').config();

const uri = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

const connection = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log("Correctly connected to the database");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    connection
}