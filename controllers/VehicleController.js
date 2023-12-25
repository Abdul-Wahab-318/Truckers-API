const shipmentSchema = require('../schema/shipmentSchema');
const vehicleSchema = require('../schema/vehicleSchema');


exports.createVehicle = async function( req , res ) {

    try{    
        let vehicle = await vehicleSchema.create(req.body)

        return res.status(200).json({
            message : 'Vehicle was created successfully' ,
            vehicle : vehicle
        })


    }
    catch( err ){
        console.error( err )
        res.status(400).json({
            err
        })
    }

}

exports.getVehicle= async function( req , res ) {

    try{    
        let vehicle = await vehicleSchema.findOne({ _id: req.params.id})

        return res.status(200).json({
            message : 'Vehicle fetched successfully' ,
            data : vehicle
        })


    }
    catch( err ){
        console.error( err )
        res.status(400).json({
            err
        })
    }

}


exports.getAllVehicles = async function( req , res ) {

    try{    
        let vehicles = await vehicleSchema.find()

        return res.status(200).json({
            message : 'Vehicles fetched successfully' ,
            data : vehicles
        })


    }
    catch( err ){
        console.error( err )
        res.status(400).json({
            err
        })
    }

}

exports.getFilteredVehicles = async function( req , res ) {

    try{    
        let vehicles = await vehicleSchema.find().select(' _id id from to')

        return res.status(200).json({
            message : 'Vehicles fetched successfully' ,
            data : vehicles
        })


    }
    catch( err ){
        console.error( err )
        res.status(400).json({
            err
        })
    }

}


exports.getShipmentByVehicle = async function( req , res ) {

    try{    
        const id = req.params.id
        let shipments = await shipmentSchema.find({ vehicle :id , status : "pending" })

        return res.status(200).json({
            message : 'shipments fetched successfully' ,
            data : shipments
        })


    }
    catch( err ){
        console.error( err )
        res.status(400).json({
            err
        })
    }

}