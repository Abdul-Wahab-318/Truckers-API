const shipmentSchema = require("../schema/shipmentSchema")
const mongoose = require("mongoose")
const io = require("../server")

//GET ALL shipments
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
        const shipment = await shipmentSchema.findOneAndUpdate( { _id : req.params.id } , 
            { $set : { status : "cancelled" , date_updated : Date.now() } 
        } , { new: true })

        io.emit("shipment-cancelled" , { data : shipment , message : `Shipment cancelled`})

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
        const shipment = await shipmentSchema.findOneAndUpdate( { _id : req.params.id } , 
            { $set : { status : "delivered" , date_updated : Date.now() } 
        } , { new: true })

        io.emit("shipment-delivered" , { data : shipment , message : `Shipment delivered`})
        return res.status(200).json({
            "message": `OK` ,
            data : shipment
        })

    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            err
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

exports.getsShipmentStats = async (req,res) => {

    try{
        let pendingShipments = await shipmentSchema.countDocuments({status:"pending"})
        let deliveredShipments = await shipmentSchema.countDocuments({status:"delivered"})

        // find the most popular route
        const result = await shipmentSchema.aggregate([
            {
            $group: {
                _id: { from: '$from', to: '$to' },
                count: { $sum: 1 },
            },
            },
            {
            $sort: { count: -1 }, // Sort in descending order by count
            },
            {
            $limit: 1, // Limit to the top result
            },
        ])

        let mostPopularRoute = "none"

        if (result.length > 0)
            mostPopularRoute = result[0]._id;
        else
            console.log('No shipments found.');

        

        return res.status(200).json({
            message : 'OK' ,
            data : [
                { label : 'Pending Shipments' , data : pendingShipments , img : '../../images/delivery.png'},
                { label : 'Delivered Shipments' , data : deliveredShipments , img : 'deliveredIcon'},
                { label : 'Most Popular Route' , img : 'routeIcon' , data : ( result.length > 0 ) ? `${mostPopularRoute.from} - ${mostPopularRoute.to}` : "none" } 
            ]
        })


    }
    catch(err)
    {
        console.error(err)
        return res.status(400).json({
            message : "failed miserably" ,
            error : err
        })
    }

}