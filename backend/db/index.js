const mongoose = require("mongoose")
const connectDB = async() => {
    try{
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}`, {
            useNewUrlParser: true
        })
        console.log(`Mongodb connected ${conn.connection.host}`);
    }
    catch(err){
        console.log(err.message);
        process.exit(1)
    }
}

module.exports = connectDB