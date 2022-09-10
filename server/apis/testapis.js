async function handleTestAPI(req, res, next)
{
  res.status(200).json({info: "working!"});
}

module.exports = {
  handleTestAPI: handleTestAPI,

  // APIs
  apis: function (app) {
    // test APIs
    app.post("/api/test", handleTestAPI);
  },
};