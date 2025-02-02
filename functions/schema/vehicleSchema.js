let mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    
    id : {
        type : String ,
        required : true
    },
    
    from : {
        type : String ,
        required : true
    },

    to : {
        type : String ,
        required : true
    },

    maxCapacity : {
        type : Number,
        default : 1000
    }  

})

module.exports = mongoose.model("vehicle" , vehicleSchema)