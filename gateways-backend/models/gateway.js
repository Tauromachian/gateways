const mongoose = require("mongoose");

const ipValidator = require("../utils/ipValidator");

const gatewaySchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  ipv4: {
    type: String,
    required: true,
    validate: [ipValidator, "Invalid IP address"],
  },
  peripheralDevices: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Peripheral",
    validate: {
      validator: (peripheralDevices) => {
        return peripheralDevices.length <= 10;
      },
      message: "Only 10 peripherals are allowed",
    },
  },
});

const Gateway = mongoose.model("Gateway", gatewaySchema);

module.exports = Gateway;
