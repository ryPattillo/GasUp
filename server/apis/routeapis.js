const axios = require("axios");

module.exports = {
  // APIs
  apis: function (app, admin) {
    /**
     * Endpoint for using MapBox matching API with a list of coordinates
     */
    app.post("/api/mapBox", async (req, res, next) => {
      let coordinates = req.body;
      let coordinate_string = "";

      coordinates = JSON.parse(coordinates);

      // Get string list of coordinate for request
      coordinates.map((element) => {
        coordinate_string += element.lat + "," + element.long + ";";
      });

      // Ensure that last ; is not in request
      coordinate_string = coordinate_string.substring(
        0,
        coordinate_string.length - 1
      );

      console.log(coordinate_string);

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
        res.status(400).json({ error: "Error with MapBox api " });
      }
    });
  },
};
