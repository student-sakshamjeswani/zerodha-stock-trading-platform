const mongoose = require('mongoose');
const uri = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("DB connected!");
    } catch (error) {
        console.log("DB error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;