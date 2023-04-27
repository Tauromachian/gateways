const Gateway = require("../models/gateway");

// GET all gateways
exports.getGateways = async (req, res, next) => {
  try {
    const gateways = await Gateway.find().populate("peripheralDevices");
    res.json(gateways);
  } catch (err) {
    next(err);
  }
};

// GET a single gateway by ID
exports.getGatewayById = async (req, res, next) => {
  try {
    const gateway = await Gateway.findById(req.params.id).populate(
      "peripheralDevices"
    );
    if (!gateway) {
      return res.status(404).json({ message: "Gateway not found" });
    }
    res.json(gateway);
  } catch (err) {
    next(err);
  }
};

// CREATE a new gateway
exports.createGateway = async (req, res, next) => {
  try {
    const gateway = new Gateway(req.body);
    await gateway.save();
    res.status(201).json(gateway);
  } catch (err) {
    next(err);
  }
};

// UPDATE a gateway by ID
exports.updateGateway = async (req, res, next) => {
  try {
    const gateway = await Gateway.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("peripheralDevices");
    if (!gateway) {
      return res.status(404).json({ message: "Gateway not found" });
    }
    res.json(gateway);
  } catch (err) {
    next(err);
  }
};

// DELETE a gateway by ID
exports.deleteGateway = async (req, res, next) => {
  try {
    const gateway = await Gateway.findByIdAndDelete(req.params.id).populate(
      "peripheralDevices"
    );
    if (!gateway) {
      return res.status(404).json({ message: "Gateway not found" });
    }
    res.json({ message: "Gateway deleted successfully" });
  } catch (err) {
    next(err);
  }
};
