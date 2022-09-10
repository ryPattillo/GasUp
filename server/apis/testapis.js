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
      var data;
      Axios.get('https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=2012&make=Honda&model=Fit').then((res)=>{data=res});
      res.status(200).json({info: data});
    });


  },
};