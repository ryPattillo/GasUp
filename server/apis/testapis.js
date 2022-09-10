const axios = require('axios');

module.exports = {

  // APIs
  apis: function (app, admin) {
    // test APIs
    app.post("/api/test", async (req, res, next) => 
    {
      admin.firestore()
      .collection("users")
      .doc(`${Math.floor(Math.random() * 10000000)}`)
      .set({"username" : "fakeuser"});

      res.status(200).json({info: "working2!"});
    });

    app.get("/api/carInfo", async (req, res, next) => 
    {
      var vehicle_id;
      axios.get('https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=2012&make=Honda&model=Fit').then((resp)=>{
        vehicle_id = resp.data["info"]["menuItem"][0]["value"];
      }); 

      axios.get('https://www.fueleconomy.gov/ws/rest/ympg/shared/ympgVehicle/' + vehicle_id).then((resp)=>{
        res.status(200).json({info: resp.data});
      });

    });

  },
};