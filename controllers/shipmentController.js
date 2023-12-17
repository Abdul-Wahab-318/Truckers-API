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

// DELETE A shipment
exports.deleteShipment = async (req,res)=>{
    const shipment = await shipmentSchema.findById(req.params.id)
    shipment.remove()
    res.status(200).json({
        "message": `rip`
    })
}

exports.ApproveShipment = async (req,res)=>{
    const payload = { ...req.body , status : 'approved'}
    const shipment = await 
    shipmentSchema.findByIdAndUpdate(req.params.id , { ...payload })
    res.status(200).json({
        "message": `rip`
    })
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
