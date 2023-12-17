const express = require("express")
const { createShipment, deleteShipment, getAllShipments, getShipment, getAllPendingShipments, ApproveShipment } = require("../controllers/shipmentController")
let router = express.Router()

router.route("/create").post(createShipment)

router.route("/delete").delete(deleteShipment)

router.route("/shipments").get(getAllShipments)

router.route("/shipments/pending").get(getAllPendingShipments)

router.route("/approve/:id").put(ApproveShipment)

router.route("/:id").get(getShipment)

module.exports = router



