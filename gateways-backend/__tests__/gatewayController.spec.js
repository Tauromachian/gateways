const request = require("supertest");
const app = require("../app");
const Gateway = require("../models/gateway");

const { MongoClient } = require("mongodb");

describe("Gateway Controller", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  describe("createGateway", () => {
    it("should create a new gateway", async () => {
      const response = await request(app).post("/gateways").send({
        serialNumber: "ABC123",
        name: "Gateway 1",
        ipv4: "192.168.0.1",
        peripheralDevices: [],
      });

      expect(response.statusCode).toBe(201);
      expect(response.body).toMatchObject({
        serialNumber: "ABC123",
        name: "Gateway 1",
        ipv4: "192.168.0.1",
        peripheralDevices: [],
      });
    });

    it("should return a 400 error if the gateway already exists", async () => {
      const gateway = new Gateway({
        serialNumber: "ABC123",
        name: "Gateway 1",
        ipv4: "192.168.0.1",
        peripheralDevices: [],
      });

      await gateway.save();

      const response = await request(app).post("/gateways").send({
        serialNumber: "ABC123",
        name: "Gateway 2",
        ipv4: "192.168.0.2",
        peripheralDevices: [],
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(
        "Gateway with serial number ABC123 already exists"
      );
    });
  });

  describe("getGateways", () => {
    it("should return an array of gateways", async () => {
      const gateway1 = new Gateway({
        serialNumber: "ABC123",
        name: "Gateway 1",
        ipv4: "192.168.0.1",
        peripheralDevices: [],
      });

      const gateway2 = new Gateway({
        serialNumber: "XYZ789",
        name: "Gateway 2",
        ipv4: "192.168.0.2",
        peripheralDevices: [],
      });

      await Gateway.insertMany([gateway1, gateway2]);

      const response = await request(app).get("/gateways");

      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject([
        {
          serialNumber: "ABC123",
          name: "Gateway 1",
          ipv4: "192.168.0.1",
          peripheralDevices: [],
        },
        {
          serialNumber: "XYZ789",
          name: "Gateway 2",
          ipv4: "192.168.0.2",
          peripheralDevices: [],
        },
      ]);
    });
  });
});
