const mongoose = require("mongoose")
//const URI = 'mongodb://127.0.0.1:27017/truckers'
const URI = "mongodb+srv://wahabmaliq:7UqIVWqB1JIREorr@cluster0.yumptbs.mongodb.net/truckers?retryWrites=true&w=majority"
const connectDB = async ()=>{
    await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(con => console.log("connected to truckers database"))
}


module.exports = connectDB

