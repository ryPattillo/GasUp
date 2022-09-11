const axios = require("axios");

module.exports = {
  // APIs
  apis: function (app, admin) {
    /**
     * Endpoint for using MapBox matching API with a list of coordinates
     *
     * TODO: get this working - MapBox seems to be denying acccess
     */
    app.post("/api/mapBox", async (req, res, next) => {
      if (req && req.body) {
        let coordinate_string = "";
        let coordinates = req.body;
        // Iterate through each coordinate
        coordinates.map((element) => {
          coordinate_string += element["lat"] + "," + element["long"] + ";";
        });
        //Ensure that last is not in request
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
            // take the map data and compute total miles
            let map_data = resp.data;
            console.log(
              "Total Miles " +
                map_data["matchings"][0]["distance"] * 0.000621371
            );

            res.status(200).json({ response: "Success" });
          } else {
            res.status(400).json({ error: "Bad response from MapBox api" });
          }
        } catch (error) {
          res.status(400).json({ error: "Error with MapBox api " });
        }
      } else {
        res.status(204).json({ error: "No Request Body given " });
      }
    });
  },
};
