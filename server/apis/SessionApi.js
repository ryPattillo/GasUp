const axios = require("axios");

module.exports = {
  /**
   *
   * Start the
   */
  apis: function (app, admin) {
    app.post("/api/acceptInvite", async (req, res, next) => {
      console.log(req.body);
      if (req && req.body) {
        let email = req.body["email"];
        var invite = await admin
          .firestore()
          .collection("invites")
          .doc(email)
          .get();
        console.log(invite.data());

        var session_riders = await admin
          .firestore()
          .collection("sessions")
          .doc(invite.data()["session"])
          .get();

        session_riders = session_riders.data()["riders"];
        session_riders.push(email);
        await admin
          .firestore()
          .collection("sessions")
          .doc(invite.data()["session"])
          .update({ riders: session_riders });

        await admin.firestore().collection("invites").doc(email).delete();

        res.status(200).json(invite.data());
      } else {
        res.status(204).json({ info: "No session specified" });
      }
    });

    /**
     * Copy session data into transactions
     */
    app.post("/api/endDrive", async (req, res, next) => {
      if (req && req.body) {
        // Get the running session
        let session_id = req.body["session_id"];
        console.log(session_id);

        // Get the driver account for gas mileadge
        let driver_account = await admin
          .firestore()
          .collection("users")
          .doc(session_id)
          .get();

        console.log(driver_account.data());

        // get gas miledage
        let mpg = driver_account.data()["car_data"]["avg_mpg"];

        var session = await admin
          .firestore()
          .collection("sessions")
          .doc(session_id)
          .get();

        // Get the riders, drivers, and cost for the session
        let riders = session.data()["riders"];
        let driver = session.data()["driver"];

        // Create a transaction reciept
        admin
          .firestore()
          .collection("transactions")
          .doc(session_id)
          .set({
            driver: driver,
            riders: riders,
            // Compute total cost based on mpg, miles , and estimated gas price
            cost: (req.body["total_miles"] / mpg) * 3.95,
          });

        // Iterate through each rider in the session and add the new transaction to their account
        for (i = 0; i < riders.length; i++) {
          console.log("rider" + riders[i]);
          let rider = await admin
            .firestore()
            .collection("users")
            .doc(riders[i])
            .get();

          let transactions = rider.data()["transactions"];
          transactions.push(session_id);

          await admin
            .firestore()
            .collection("users")
            .doc(riders[i])
            .update({ transactions: transactions });
        }
        res.status(200).json({ info: "working2!" });
      } else {
        res.status(204).json({ info: "No session specified" });
      }
    });

    /**
     * Copy session data into transactions
     */
    app.post("/api/updateCost", async (req, res, next) => {
      if (req && req.body) {
        // Get a running session
        let driver_email = req.body["session_id"];

        // Create a transaction reciept
        let driver = admin
          .firestore()
          .collection("users")
          .doc(driver_email)
          .get();

        let mpg = driver.data()["car_data"];

        res.status(200).json({ info: "working2!" });
      } else {
        res.status(204).json({ info: "No session specified" });
      }
    });
  },
};
