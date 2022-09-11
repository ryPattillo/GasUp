const axios = require("axios");

module.exports = {
  // APIs
  apis: function (app, admin) {
    /**
     * Endpoint for getting a list of available trims of a make,model, and year
     */
    app.post("/api/findCar", async (req, res, next) => {
      if (req && req.body) {
        // Get year,make, and model from the request
        let make = req.body["make"];
        let year = req.body["year"];
        let model = req.body["model"];

        try {
          // Get the trim data for the requested car
          const resp = await axios.get(
            `https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=${year}&make=${make}&model=${model}`,
            {
              headers: {
                accept: "application/json",
              },
            }
          );
          // ensure that the request was sucessful
          if (resp && resp.data) {
            let vehicle_data = resp.data;
            res.status(200).json(vehicle_data["menuItem"][0]["value"]);
          } else {
            res
              .status(400)
              .json({ error: "Bad Response From Fueleconomy Api" });
          }
        } catch (error) {
          res.status(404).json({ error: "Error from fueleconomy api" });
        }
      } else {
        res.status(404).json({ error: "No Request Body specified" });
      }
    });

    /**
     * Endpoint for getting info about a certain car given an id
     */
    app.post("/api/carInfo", async (req, res, next) => {
      // Get the car id for the request
      if (req && req.body) {
        let car_id = req.body["car_id"];
        try {
          const resp = await axios.get(
            `https://www.fueleconomy.gov/ws/rest/ympg/shared/ympgVehicle/${car_id}`,
            {
              headers: {
                accept: "application/json",
              },
            }
          );
          // Ensure that respose was retrieved
          if (resp && resp.data) {
            let vehicle_data = resp.data;
            res.status(200).json(vehicle_data["avgMpg"]);
          } else {
            res
              .status(400)
              .json({ error: "Bad response from FuelEconomy Api" });
          }
        } catch (error) {
          res.status(404).json({ error: "Error from fueleconomy api" });
        }
      } else {
        res.status(204).json({ error: "No Request Body specified" });
      }
    });
  },
};
