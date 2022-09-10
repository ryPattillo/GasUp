const axios = require("axios");

module.exports = {
  // APIs
  apis: function (app, admin) {
    app.post("/api/startDrive", async (req, res, next) => {
      var ride = {
        driver: "Luis",
        riders: [
          {
            username: "Ryan",
            entry_point: 20,
            pickup_coordinates: { lat: 12, long: 12 },
            dropoff_coordinates: { lat: None, long: None },
          },
          {
            username: "Time",
            entry_point: 20,
            pickup_coordinates: { lat: 12, long: 12 },
            dropoff_coordinates: { lat: None, long: None },
          },
          {
            username: "Ryan",
            entry_point: 30,
            pickup_coordinates: { lat: 12, long: 12 },
            dropoff: { lat: None, long: None },
          },
        ],
      };
      admin
        .firestore()
        .collection("sessions")
        .doc(`${Math.floor(Math.random() * 10000000)}`)
        .set(ride);
      res.status(200).json({ info: "working2!" });
    });

    app.post("/api/endDrive", async (req, res, next) => {
      var session = await admin
        .firestore()
        .collection("sessions")
        .doc("5928525")
        .get();

      admin
        .firestore()
        .collection("transactions")
        .doc("5928525")
        .set(session.data());

      res.status(200).json({ info: "working2!" });
    });
  },
};
