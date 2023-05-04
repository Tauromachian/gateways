const Gateway = require("../models/gateway");

const gatewayController = require("../controllers/gatewayController");

const mongoose = require("mongoose");

describe("Gateway Controller", () => {
  let connection;

  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection = mongoose.connection;
  });

  beforeEach(async () => {
    await Gateway.deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
  });

  describe("createGateway", () => {
    it("should create a new gateway", async () => {
      const req = {
        body: {
          serialNumber: "1234",
          name: "Test Gateway",
          ipv4: "192.168.1.1",
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const next = jest.fn();

      await gatewayController.createGateway(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          serialNumber: "1234",
          name: "Test Gateway",
          ipv4: "192.168.1.1",
        })
      );

      const createdGateway = await Gateway.findOne({ serialNumber: "1234" });
      expect(createdGateway).toBeDefined();
      expect(createdGateway.name).toBe("Test Gateway");
    });

    it("should call next with error if the gateway already exists", async () => {
      const gateway = new Gateway({
        serialNumber: "ABC1234",
        name: "Gateway 1",
        ipv4: "192.168.0.1",
        peripheralDevices: [],
      });
      await gateway.save();

      const req = {
        body: {
          serialNumber: "ABC1234",
          name: "Test Gateway",
          ipv4: "192.168.1.1",
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const next = jest.fn();

      await gatewayController.createGateway(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("getgateway", () => {
    it("should return an array of gateways", async () => {
      const mockGateways = [
        { serialNumber: "1234", name: "Test Gateway 1", ipv4: "192.168.1.1" },
        { serialNumber: "5678", name: "Test Gateway 2", ipv4: "192.168.1.2" },
        { serialNumber: "9012", name: "Test Gateway 3", ipv4: "192.168.1.3" },
      ];
      jest.spyOn(Gateway, "find").mockResolvedValue(mockGateways);

      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const next = jest.fn();

      await gatewayController.getGateways(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockGateways);
    });
  });
});
