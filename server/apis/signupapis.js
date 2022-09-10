const axios = require("axios");

module.exports = {
  // APIs
  apis: function (app, admin) {
    app.post("/api/signUp", async (req, res, next) => {
      admin
        .firestore()
        .collection("users")
        .doc(4493237)
        .set("User info json goes here");
      res.status(200).json({ info: "working2!" });
    });
  },
};
