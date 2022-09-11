const axios = require("axios");

module.exports = {
  /**
   *
   * Start the
   */
  apis: function (app, admin) {
    /**
     * Copy session data into transactions
     */
    app.post("/api/endDrive", async (req, res, next) => {
      if (req && req.body) {
        let session_id = req.body["session_id"];

        var session = await admin
          .firestore()
          .collection("sessions")
          .doc(session_id)
          .get();

        admin
          .firestore()
          .collection("transactions")
          .doc()
          .set(session.data());

        res.status(200).json({ info: "working2!" });
      } else {
        res.status(204).json({ info: "No session specified" });
      }
    });
  },
};
