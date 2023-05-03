const mongoose = require("mongoose");

const peripheralSchema = new mongoose.Schema({
  uid: { type: Number, required: true, unique: true },
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
    validate: {
      validator: async (value) => {
        const peripheralDevices = await mongoose.models.Peripheral.find({
          gatewayId: value,
        });

        if (peripheralDevices?.length >= 10) {
          return false;
        }

        return true;
      },

      message: "Only 10 peripherals are allowed",
    },
  },
});

module.exports = mongoose.model("Peripheral", peripheralSchema);
