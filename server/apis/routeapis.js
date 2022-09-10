const axios = require("axios");

module.exports = {
  // APIs
  apis: function (app, admin) {
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