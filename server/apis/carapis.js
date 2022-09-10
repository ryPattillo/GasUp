const axios = require("axios");

module.exports = {
  // APIs
  apis: function (app, admin) {

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
  },
};
