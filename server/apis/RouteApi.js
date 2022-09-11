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
      // const coordinatest = [
      //   { lat: -117.17282, long: 32.71204 },
      //   { lat: -117.17288, long: 32.71225 },
      //   { lat: -117.17293, long: 32.71244 },
      //   { lat: -117.17292, long: 32.71256 },
      //   { lat: -117.17298, long: 32.712603 },
      //   { lat: -117.17314, long: 32.71259 },
      //   { lat: -117.17334, long: 32.71254 },
      // ];
      if (req && req.body) {
        //console.log(coordinatest);
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
            // take the map data and compute total miles

            res.status(200).json({
              miles: resp.data["matchings"][0]["distance"] * 0.000621371,
            });
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
