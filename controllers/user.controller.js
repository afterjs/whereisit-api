const configFirebase = require("../firebase");

function getAllUsers(req, res) {
  res.status(200).json("In development");
  /*try {
    var users = []
    const listAllUsers = (nextPageToken) => {
      configFirebase.admin
        .auth()
        .listUsers(1000, nextPageToken)
        .then((listUsersResult) => {
          listUsersResult.users.forEach((userRecord) => {
            users.push(userRecord.toJSON())
          });
          if (listUsersResult.pageToken) {
            listAllUsers(listUsersResult.pageToken);
          }
          res.status(200).json(users);
        })
        .catch((error) => {
          console.log("Error listing users:", error);
        });
    };
   
    listAllUsers()
  } catch (error) {
    res.status(500).send(error);
  }*/
}

module.exports = {
  getAllUsers,
};
