const axios = require("axios");

module.exports = {
  // APIs
  apis: function (app, admin) {
    app.post("/api/signUp", async (req, res, next) => {
      if (req && req.body) {
        // Get the user information to add to the account
        let user_email = req.body["email"];
        let first_name = req.body["firstName"];
        let last_name = req.body["lastName"];
        // Add the user to the the databse
        admin.firestore().collection("users").doc(`${user_email}`).set({
          email: user_email.toLowerCase(),
          first: first_name,
          last: last_name,
          friends: [],
        });
        res.status(200).json({ info: `${user_email} created` });
      } else {
        res.status(204).json({ info: "No request body specfied" });
      }
    });

    app.post("/api/addFriend", async (req, res, next) => {
      if (req && req.body) {
        // Get the user and the friend email
        let friend_email = req.body["friend_email"];
        let user_email = req.body["user_email"];
        // Get the current list of friends
        let friends_list = await admin
          .firestore()
          .collection("users")
          .doc(`${user_email}`)
          .get();
        friends_list = friends_list.data()["friends"];

        // Add new friend to the list of friends
        friends_list.push(friend_email);
        admin
          .firestore()
          .collection("users")
          .doc(user_email)
          .update({ friends: friends_list });

        res.status(200).json({ info: `Friend ${friend_email} added` });
      } else {
        res.status(204).json({ info: "No Request Specified" });
      }
    });

    app.post("/api/getFriends", async (req, res, next) => {
      if (req && req.body) {
        // Get the user and the friend email
        let email = req.body["email"];
        // Get the current list of friends
        let friends_list = await admin
          .firestore()
          .collection("users")
          .doc(`${email}`)
          .get();
        friends_list = friends_list.data()["friends"];

        res.status(200).json(friends_list);
      } else {
        res.status(204).json({ info: "No Request Specified" });
      }
    });
  },
};
