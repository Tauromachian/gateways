const mongoose = require("mongoose");

const peripheralSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  vendor: { type: String, required: true },
  status: { type: Boolean, required: true },
  dateCreated: {
    type: Date,
    default: new Date(),
  },
  gatewayId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gateway",
    required: true,
  },
});

module.exports = mongoose.model("Peripheral", peripheralSchema);
