const axios = require("axios");

module.exports = {
  // APIs
  apis: function (app, admin) {
    // test APIs
    app.post("/api/test", async (req, res, next) => {
      admin
        .firestore()
        .collection("users")
        .doc(`${Math.floor(Math.random() * 10000000)}`)
        .set({ username: "fakeuser" });

      res.status(200).json({ info: "working2!" });
    });

    /**
     * Endpoint for getting a list of available trims of a make,model, and year
     */
    app.get("/api/findCar", async (req, res, next) => {
      try {
        const resp = await axios.get(
          "https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=2012&make=Honda&model=Fit",
          {
            headers: {
              accept: "application/json",
            },
          }
        );
        if (resp && resp.data) {
          let vehicle_data = resp.data;
          console.log(vehicle_data);

          res.status(200).json({ response: "Success" });
        } else {
          res.status(400).json({ error: "Bad response from fueleconomy api" });
        }
      } catch (error) {
        res.status(400).json({ error: "Error from fueleconomy api" });
      }
    });

    /**
     * Endpoint for getting info about a certain car based on ID
     */
    app.get("/api/carInfo", async (req, res, next) => {
      try {
        const resp = await axios.get(
          "https://www.fueleconomy.gov/ws/rest/ympg/shared/ympgVehicle/26425",
          {
            headers: {
              accept: "application/json",
            },
          }
        );
        if (resp && resp.data) {
          let vehicle_data = resp.data;
          console.log(vehicle_data);

          res.status(200).json({ response: "Success" });
        } else {
          res.status(400).json({ error: "Bad response from fueleconomy api" });
        }
      } catch (error) {
        res.status(400).json({ error: "Error from fuel economy api" });
      }
    });

    /**
     * Endpoint for using MapBox matching API with a list of coordinates
     */
    app.get("/api/mapBox", async (req, res, next) => {
      coordinates = [
        { lat: -122.397484, long: 37.792809 },
        { lat: -122.39746, long: 37.792693 },
        { lat: -122.39745, long: 37.792645 },
      ];
      var coordinate_string = "";

      // Get string list of coordinate for request
      coordinates.map((element) => {
        coordinate_string += element.lat + "," + element.long + ";";
      });

      // Ensure that last ; is not in request
      coordinate_string = coordinate_string.substring(
        0,
        coordinate_string.length - 1
      );

      try {
        const resp = await axios.get(
          `https://api.mapbox.com/matching/v5/mapbox/driving/${coordinate_string}?access_token=${process.env.mapbox_key}`,
          {
            headers: {
              accept: "application/json",
            },
          }
        );
        if (resp && resp.data) {
          let map_data = resp.data;
          console.log(
            "Total Miles " + map_data["matchings"][0]["distance"] * 0.000621371
          );

          res.status(200).json({ response: "Success" });
        } else {
          res.status(400).json({ error: "Bad response from MapBox api" });
        }
      } catch (error) {
        res.status(400).json({ error: "Error with MapBox api" });
      }
    });
  },
};