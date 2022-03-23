const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MongoURI = process.env.MONGO_URI;
const connectDB = async () => {
    try{
        await mongoose.connect(MongoURI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        );
        console.log('Database connection established');
    } catch(err) {
        console.log(err)
    }
}

module.exports = connectDB;