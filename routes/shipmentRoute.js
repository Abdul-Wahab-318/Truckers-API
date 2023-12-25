const express = require("express")
const { createShipment, deleteShipment, getAllShipments, getShipment, getAllPendingShipments, deliverShipment, cancelShipment, getsShipmentStats } = require("../controllers/shipmentController")
const { isAuthenticated } = require("../middleware/auth")
let router = express.Router()

router.route("/create").post(createShipment)

router.route("/shipments").get(getAllShipments)

router.route("/shipment-stats").get(getsShipmentStats)

router.route("/shipments/pending").get(getAllPendingShipments)

router.route("/deliver/:id").put(deliverShipment)

router.route("/cancel/:id").put(cancelShipment)

router.route("/:id").get(getShipment)

module.exports = router



