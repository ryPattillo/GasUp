const axios = require("axios");

module.exports = {
  // APIs
  apis: function (app, admin) {
    app.post("/api/signUp", async (req, res, next) => {
      console.log(req.body);
      if (req && req.body) {
        admin
          .firestore()
          .collection("users")
          .doc(`${Math.floor(Math.random() * 10000000)}`)
          .set(req.data());
        res.status(200).json({ info: "working2!" });
      } else {
        res.status(404).json({ info: "NOt working" });
      }
    });
  },
};
