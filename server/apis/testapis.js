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
      try {
        const resp = await axios.get('https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=2012&make=Honda&model=Fit',
        {headers: {
          'accept': 'application/json'
      },});
        if (resp && resp.data)
        {
          let vehicle_data = resp.data;
          console.log(vehicle_data);
          
          // vehicle_data looked like:
          //
          // {
          //   menuItem: [
          //     { text: 'Auto (S5), 4 cyl, 1.5 L', value: '31819' },
          //     { text: 'Auto 5-spd, 4 cyl, 1.5 L', value: '31818' },
          //     { text: 'Man 5-spd, 4 cyl, 1.5 L', value: '31817' }
          //   ]
          // }
          //

          // do something with the vehicle
          //await axios.get ..

          res.status(200).json({response: "should be here"});
        }
        else
        {
          res.status(400).json({error: "Bad response from fueleconomy api"});
        }
        
      } catch (error) {
        res.status(400).json({error: "Error from fuel economy api"});
      }


      // axios.get().then((resp)=>{
      //   vehicle_id = resp.data["info"]["menuItem"][0]["value"];
      // }); 

      // axios.get('https://www.fueleconomy.gov/ws/rest/ympg/shared/ympgVehicle/26425').then((resp)=>{
        
      

    });

  },
};