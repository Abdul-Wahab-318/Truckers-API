const express = require('express');
const { createVehicle, getAllVehicles , getFilteredVehicles , getShipmentByVehicle, getVehicle} = require('../controllers/VehicleController');
const router = express.Router()

router.post('/create' , createVehicle)

router.get('/vehicles' , getAllVehicles)

router.get('/vehicles/filtered' , getFilteredVehicles )

router.get('/shipment-by-vehicle/:id' , getShipmentByVehicle)

router.get('/:id' , getVehicle)

module.exports = router

