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

    currentLocation : {
        type : String ,
        default : null 
    }

})

module.exports = mongoose.model("vehicle" , vehicleSchema)