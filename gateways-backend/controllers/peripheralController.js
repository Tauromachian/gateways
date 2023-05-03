const Gateway = require("../models/gateway");
const Peripheral = require("../models/peripheral");

// GET all peripherals
exports.getPeripherals = async (req, res, next) => {
  try {
    const peripherals = await Peripheral.find();
    res.json(peripherals);
  } catch (err) {
    next(err);
  }
};

// GET a single peripheral by ID
exports.getPeripheralById = async (req, res, next) => {
  try {
    const peripheral = await Peripheral.findById(req.params.id);
    if (!peripheral) {
      return res.status(404).json({ message: "Peripheral not found" });
    }
    res.json(peripheral);
  } catch (err) {
    next(err);
  }
};

// CREATE a new peripheral
exports.createPeripheral = async (req, res, next) => {
  try {
    if (!req.body.gatewayId) {
      return res.status(400).json({ message: "Missing gatewayId" });
    }

    const peripheral = new Peripheral(req.body);
    await peripheral.save();

    await Gateway.findOneAndUpdate(
      { _id: req.body.gatewayId },
      { $push: { peripheralDevices: peripheral._id } }
    );

    res.status(201).json(peripheral);
  } catch (err) {
    next(err);
  }
};

// UPDATE a peripheral by ID
exports.updatePeripheral = async (req, res, next) => {
  try {
    const peripheral = await Peripheral.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!peripheral) {
      return res.status(404).json({ message: "Peripheral not found" });
    }
    res.json(peripheral);
  } catch (err) {
    next(err);
  }
};

// DELETE a peripheral by ID
exports.deletePeripheral = async (req, res, next) => {
  try {
    const peripheral = await Peripheral.findByIdAndDelete(req.params.id);
    if (!peripheral) {
      return res.status(404).json({ message: "Peripheral not found" });
    }
    res.json({ message: "Peripheral deleted successfully" });
  } catch (err) {
    next(err);
  }
};
