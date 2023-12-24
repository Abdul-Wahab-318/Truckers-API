const shipmentSchema = require("../schema/shipmentSchema")
const mongoose = require("mongoose")

//GET ALL shipmentS
exports.getAllShipments = async (req,resp)=>{
    let allShipments = await shipmentSchema.find()
    resp.status(200).json({
        message:"success",
        data : allShipments
    })
}

//GET ALL pending shipments
exports.getAllPendingShipments = async (req,resp)=>{
    let allShipments = await shipmentSchema.find({ status : { $eq : 'pending'}})
    resp.status(200).json({
        message:"success",
        data : allShipments
    })
}

//GET SINGLE shipment
exports.getShipment = async (req, res)=>{
    try{
        let shipment = await shipmentSchema.findById(req.params.id)
        res.status(200).json({
            shipment
        })
    }
    catch(e){
        res.status(400).json({
            error: e.errors,
            message: "failed"
        })
    }
}

// cancel A shipment
exports.cancelShipment = async (req,res)=>{

    try{
        const shipment = await shipmentSchema.updateOne( { _id : req.params.id } , 
            { $set : { status : "cancelled" , date_updated : Date.now() } 
        })

        return res.status(200).json({
            "message": `shipment cancelled` ,
            data : shipment
        })

    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            error
        })
    }
}

// mark shipment as delivered
exports.deliverShipment = async (req,res)=>{

    try{
        const shipment = await shipmentSchema.updateOne( { _id : req.params.id } , 
            { $set : { status : "delivered" , date_updated : Date.now() } 
        })

        return res.status(200).json({
            "message": `OK` ,
            data : shipment
        })

    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            error
        })
    }
}

// CREATE A shipment
exports.createShipment = async (req,res)=>{
    try{

        let shipment = await shipmentSchema.create(req.body)
        
        res.status(201).json({
            "message": `shipment created`
        })
    }
    catch(e){
        console.log(e)
        res.status(400).json({
            message:"bhai time bou shart hai",
            error: e.errors
        })
    }
}
