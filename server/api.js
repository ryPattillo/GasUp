const { response } = require("express");

exports.setApp = function (app, admin) {
  app.post("/api/test", async (req, res, next) => {
    ret = { info: "working!" };
    res.status(200).json(ret);
  });
}