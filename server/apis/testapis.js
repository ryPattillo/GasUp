module.exports = {
  // APIs
  apis: function (app, admin) {
    // test APIs
    app.post("/api/test", async (req, res, next) => 
    {
      res.status(200).json({info: "working2!"});
    });
  },
};