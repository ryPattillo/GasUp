const axios = require("axios");

module.exports = {
  // APIs
  apis: function (app, admin) {
    /**
     * Get transaction data for a user
     */
    app.post("/api/getTransaction", async (req, res, next) => {
      // Ensure that a request body was provided
      if (req && req.body) {
        var transaction_id;
        // Keep a list of transactions
        let transactions_list = [];
        // Getting user id dock id
        let email = req.body["email"];
        // Get the document in the database for the specified user
        let doc = await admin
          .firestore()
          .collection("users")
          .doc(`${email}`)
          .get();
        // Get the user transaction list
        let transactions = doc.data()["transactions"];
        // ensure that transactions exist
        if (transactions) {
          // Need to get teach transaction from the user
          for (i = 0; i < transactions.length; i++) {
            // Get rid of white spaces
            transaction_id = transactions[i].replace(/\s/g, "");
            // Get transcation form database
            let transaction = await admin
              .firestore()
              .collection("transactions")
              .doc(transaction_id)
              .get();
            // Build the list of transactions
            transactions_list.push({
              driver: transaction.data()["driver"],
              cost: transaction.data()["cost"],
            });
          }
        }
        // Return 200 code (succesful) and the lsit of transactions
        res.status(200).json(transactions_list);
      } else {
        res.status(205).json({ message: "Request Body Not Provided" });
      }
    });

    app.post("/api/getBalance", async (req, res, next) => {
      if (req && req.body) {
        email = req.body["email"];

        let doc = await admin
          .firestore()
          .collection("users")
          .doc(`${email}`)
          .get();

        res.status(200).json({ balance: doc.data()["balance"] });
      } else {
        res.status(205).json({ message: "Request Body Not Provided" });
      }
    });
  },
};
