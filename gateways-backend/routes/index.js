var express = require("express");
var router = express.Router();

const gatewayController = require("../controllers/gatewayController.js");
const peripheralController = require("../controllers/peripheralController.js");

module.exports = router;

// Gateway Routes
router
  .route("/gateway")
  .get(gatewayController.getGateways)
  .post(gatewayController.createGateway);

router
  .route("/gateway/:id")
  .get(gatewayController.getGatewayById)
  .put(gatewayController.updateGateway)
  .delete(gatewayController.deleteGateway);

// Peripheral Routes
router
  .route("/peripheral")
  .get(peripheralController.getPeripherals)
  .post(peripheralController.createPeripheral);

router
  .route("/peripheral/:id")
  .get(peripheralController.getPeripheralById)
  .put(peripheralController.updatePeripheral)
  .delete(peripheralController.deletePeripheral);
