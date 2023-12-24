const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');
let shipmentSchema = new mongoose.Schema({

    id : {
        type: String,
        default: uuidv4,
    } ,
    from: {
        type : String ,
        required : true
    } ,
    to: {
        type : String ,
        required : true
    } ,
    address : {
        type : String ,
        required : true
    } ,
    vehicle: {
        type : mongoose.Types.ObjectId ,
        required : true
    } ,
    weight :{
        type : Number,
        required : true  
    } ,
    status : {
        type : String ,
        default : 'pending'
    } ,
    date_created : {
        type : Date ,
        default : Date.now
    } ,
    date_updated : {
        type : Date ,
        default : Date.now 
    }

})

module.exports = mongoose.model("shipment" , shipmentSchema)